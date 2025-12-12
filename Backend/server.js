// backend/server.js  (improved diagnostic version - full)
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch"); // node-fetch@2 required for require()
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json({ limit: "200kb" }));
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));

app.use(
  "/api/",
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // reduced during debugging; increase for production
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const KEY = process.env.GEMINI_API_KEY;
console.log("Starting server. GEMINI_API_KEY present?:", !!KEY);

if (!KEY) {
  console.error("Missing GEMINI_API_KEY in .env (GEMINI_API_KEY). Exiting.");
  process.exit(1);
}

let SELECTED_MODEL = null;
let LAST_MODELS_LIST = null;

const PREFERRED = [
  "models/gemini-2.5-flash",
  "models/gemini-2.5-pro",
  "models/gemini-2.0-flash",
  "models/gemini-flash-latest",
  "models/gemini-pro-latest",
];

// Helper: Abort signal with timeout
function buildAbortSignal(timeoutMs = 30000) {
  const AbortControllerImpl = global.AbortController || require("abort-controller");
  const controller = new AbortControllerImpl();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

// Helper: sleep
const WAIT = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * fetchWithRetries
 * - retries on 429 with respect to Retry-After header
 * - exponential backoff + jitter for transient errors
 */
async function fetchWithRetries(url, options = {}, attempts = 4) {
  let attempt = 0;
  while (true) {
    attempt++;
    try {
      const resp = await fetch(url, options);
      const text = await resp.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch (e) {
        json = null;
      }

      // If successful or non-429 error, return
      if (resp.ok || resp.status !== 429) {
        return { resp, text, json, ok: resp.ok, status: resp.status };
      }

      // Handle 429
      const retryAfter = resp.headers && resp.headers.get ? resp.headers.get("retry-after") : null;
      let waitMs = 0;
      if (retryAfter) {
        const secs = Number(retryAfter);
        if (!Number.isNaN(secs)) waitMs = secs * 1000;
        else {
          // try parsing HTTP-date
          const t = Date.parse(retryAfter);
          if (!Number.isNaN(t)) waitMs = Math.max(0, t - Date.now());
        }
      }
      if (!waitMs) {
        const base = 500 * Math.pow(2, attempt - 1); // 500ms, 1s, 2s, ...
        const jitter = Math.floor(Math.random() * 300);
        waitMs = Math.min(base + jitter, 15000); // cap 15s
      }

      if (attempt >= attempts) {
        console.warn(`fetchWithRetries: reached max attempts (${attempts}) for ${url}`);
        return { resp, text, json, ok: resp.ok, status: resp.status };
      }

      console.warn(`fetchWithRetries: got 429 (attempt ${attempt}/${attempts}). Waiting ${waitMs}ms before retry. url=${url}`);
      await WAIT(waitMs);
      continue;
    } catch (err) {
      // network / abort error — retry a few times
      if (attempt >= attempts) {
        console.error(`fetchWithRetries: final failure after ${attempt} attempts for ${url}:`, err && err.toString ? err.toString() : err);
        throw err;
      }
      const waitMs = 500 * Math.pow(2, attempt - 1);
      console.warn(`fetchWithRetries: network/abort error, retrying ${attempt}/${attempts} after ${waitMs}ms:`, err && err.toString ? err.toString() : err);
      await WAIT(waitMs);
    }
  }
}

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${KEY}`;
  console.log("Listing models from", url);
  const { signal, clear } = buildAbortSignal(15000);
  try {
    const { resp, text, json, ok, status } = await fetchWithRetries(url, { method: "GET", signal }, 3);
    if (!ok) {
      console.error("listModels HTTP", status, "body:", text);
      throw new Error(`listModels failed HTTP ${status}`);
    }
    LAST_MODELS_LIST = json;
    return json.models || [];
  } finally {
    clear();
  }
}

async function callGenerateContent(modelName, payload) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${KEY}`;
  console.log("callGenerateContent ->", endpoint);
  const { signal, clear } = buildAbortSignal(30000);
  try {
    const { resp, text, json, ok, status } = await fetchWithRetries(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
      },
      4
    );
    return { ok, status, text, json, resp };
  } finally {
    clear();
  }
}

async function callGenerateText(modelName, prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateText?key=${KEY}`;
  console.log("callGenerateText ->", endpoint);
  const payload = { input: prompt, temperature: 0.2, maxOutputTokens: 512 };
  const { signal, clear } = buildAbortSignal(30000);
  try {
    const { resp, text, json, ok, status } = await fetchWithRetries(
      endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
      },
      4
    );
    return { ok, status, text, json, resp };
  } finally {
    clear();
  }
}

app.get("/api/debug/models", (req, res) => {
  return res.json({ selected: SELECTED_MODEL, lastModelsList: LAST_MODELS_LIST });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!SELECTED_MODEL) return res.status(500).json({ error: "Model not selected yet" });

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "messages array required" });

    const systemText = "You are Max Pharma Assistant. Be helpful, polite. Do not provide diagnoses.";

    // build prompt for generateText fallback
    const prompt = [systemText, ...messages.map((m) => `${m.role}: ${m.content}`)].join("\n");

    // Map roles for generateContent: allowed = 'user' or 'model'
    function mapRoleForGenerateContent(role) {
      if (!role) return "user";
      const r = role.toString().toLowerCase();
      if (r === "user") return "user";
      if (r === "assistant" || r === "model") return "model";
      if (r === "system") return "user";
      console.warn("Unknown role from client:", role, "— mapping to 'user'");
      return "user";
    }

    // Build contents: put system instruction as first 'user' content (generateContent expects 'user' or 'model' only)
    const contentPayload = {
      contents: [
        { role: "user", parts: [{ text: systemText }] },
        ...messages.map((m) => ({
          role: mapRoleForGenerateContent(m.role),
          parts: [{ text: String(m.content || "") }],
        })),
      ],
    };

    // Try generateContent first
    let result = await callGenerateContent(SELECTED_MODEL, contentPayload);

    // If generateContent unsupported or 404, fallback to generateText
    if (
      !result.ok &&
      (result.status === 404 ||
        (result.json && result.json.error && /not found|not supported|unsupported/i.test(result.json.error.message || "")))
    ) {
      console.warn("generateContent failed/unsupported - falling back to generateText:", result.status);
      const fallback = await callGenerateText(SELECTED_MODEL, prompt);
      if (!fallback.ok) {
        console.error("generateText fallback failed:", fallback.status, fallback.text);
        return res.status(502).json({
          error: "Both generateContent and generateText failed",
          details: { generateContent: result.text, generateText: fallback.text },
        });
      }
      const textResp =
        (fallback.json?.candidates?.[0]?.content?.text) ||
        (fallback.json?.output?.[0]?.content?.text) ||
        (fallback.json?.output?.[0]?.text) ||
        fallback.json?.output?.text ||
        fallback.json?.response ||
        fallback.text;
      return res.json({ reply: String(textResp || "No reply from model (fallback)") });
    }

    // If generateContent returned non-OK other than unsupported/404
    if (!result.ok) {
      // If 429, include hint about quota
      if (result.status === 429) {
        console.error("generateContent returned 429 RESOURCE_EXHAUSTED:", result.text);
        return res.status(429).json({
          error: "Quota/Rate limit exceeded (RESOURCE_EXHAUSTED). Check GCP billing/quotas.",
          details: result.text,
        });
      }
      console.error("generateContent failed:", result.status, result.text);
      return res.status(502).json({ error: "generateContent failed", details: result.text });
    }

    // parse generateContent success
    const reply =
      result.json?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result.json?.candidates?.[0]?.content?.text ||
      (Array.isArray(result.json?.candidates?.[0]?.content?.parts)
        ? result.json.candidates[0].content.parts.map((p) => p.text).join("\n")
        : undefined) ||
      result.text ||
      "No reply";

    return res.json({ reply });
  } catch (err) {
    console.error("Server error:", err && err.toString ? err.toString() : err);
    return res.status(500).json({ error: "Server error", details: String(err) });
  }
});

app.get("/api/health", (_, res) => res.json({ status: "ok", model: SELECTED_MODEL }));

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    const models = await listModels();
    if (!models || models.length === 0) {
      console.error("No models returned by listModels() - response was:", LAST_MODELS_LIST);
      // continue running so debug endpoint can show details
    } else {
      // choose a preferred one if available
      for (const p of PREFERRED) {
        if (models.some((m) => m.name === p)) {
          SELECTED_MODEL = p;
          break;
        }
      }
      if (!SELECTED_MODEL) {
        const valid = models.find((m) => !/embed|embedding|imagen|veo/i.test(m.name));
        if (valid) SELECTED_MODEL = valid.name;
      }
    }
    console.log("Selected model:", SELECTED_MODEL);
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (e) {
    console.error("Startup error (listModels):", e);
    process.exit(1);
  }
})();




