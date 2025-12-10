// backend/index.js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(
  "/api/",
  rateLimit({
    windowMs: 60 * 1000,
    max: 40,
  })
);

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

let SELECTED_MODEL = null; // e.g. "models/gemini-2.5-flash"
let PREFERRED = [
  "models/gemini-2.5-flash",
  "models/gemini-2.5-pro",
  "models/gemini-2.0-flash",
  "models/gemini-flash-latest",
  "models/gemini-pro-latest",
];

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (!resp.ok) {
    console.error("Failed to list models:", data);
    throw new Error("Failed to list models");
  }
  return data.models || [];
}

async function pickModel() {
  const models = await listModels();
  // Try to find any preferred model available
  for (const p of PREFERRED) {
    const found = models.find((m) => m.name === p);
    if (found) {
      SELECTED_MODEL = found.name;
      console.log("Selected preferred model:", SELECTED_MODEL);
      return;
    }
  }
  // Else pick the first non-embedding/generic model
  const candidate = models.find((m) => !/embed|embedding|imagen|veo/i.test(m.name));
  if (candidate) {
    SELECTED_MODEL = candidate.name;
    console.log("Selected fallback model:", SELECTED_MODEL);
    return;
  }
  throw new Error("No usable model found");
}

// --- helper: try generateContent endpoint
async function callGenerateContent(modelName, payload) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${KEY}`;
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  let json;
  try { json = JSON.parse(text); } catch(e) { json = null; }
  return { ok: resp.ok, status: resp.status, text, json };
}

// --- helper: try generateText endpoint (fallback)
async function callGenerateText(modelName, prompt) {
  // Some accounts accept generateText at:
  // https://generativelanguage.googleapis.com/v1beta/{modelName}:generateText?key=KEY
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateText?key=${KEY}`;
  const payload = {
    // conservative payload: minimal fields
    // 'input' or 'prompt' may be expected; experiment with both patterns.
    // We'll send 'input' as the canonical property.
    input: prompt,
    // safe defaults:
    temperature: 0.2,
    maxOutputTokens: 512
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  let json;
  try { json = JSON.parse(text); } catch(e) { json = null; }
  return { ok: resp.ok, status: resp.status, text, json };
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!SELECTED_MODEL) return res.status(500).json({ error: "Model not selected yet" });

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "messages array required" });

    // Create a simple prompt string from chat history
    const system = "You are Max Pharma Assistant. Be helpful, polite. Do not provide diagnoses.";
    const prompt = [system, ...messages.map(m => `${m.role}: ${m.content}`)].join("\n");

    // First attempt: generateContent payload (structured)
    const contentPayload = {
      contents: [
        {
          role: "system",
          parts: [{ text: system }]
        },
        ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
      ]
    };

    // Try generateContent
    let result = await callGenerateContent(SELECTED_MODEL, contentPayload);

    // If 404 or method-not-supported, try fallback generateText
    if (!result.ok && (result.status === 404 || (result.json && result.json.error && result.json.error.message && /not found|not supported|unsupported/i.test(result.json.error.message)))) {
      console.warn("generateContent failed or unsupported. Trying generateText fallback.", result.status, result.text);
      const fallback = await callGenerateText(SELECTED_MODEL, prompt);

      if (!fallback.ok) {
        console.error("generateText fallback also failed:", fallback.status, fallback.text);
        // return the more informative fallback error to the client
        return res.status(502).json({ error: "Model methods unsupported or error", details: { generateContent: result.text, generateText: fallback.text } });
      } else {
        // parse likely locations for text in the response
        const textResp = (fallback.json?.candidates?.[0]?.content?.text) || (fallback.json?.output?.[0]?.content?.text) || (fallback.json?.output?.[0]?.text) || fallback.json?.output?.text || fallback.json?.response || fallback.text;
        return res.json({ reply: String(textResp || "No reply from model") });
      }
    }

    if (!result.ok) {
      // other error from generateContent
      console.error("generateContent failed:", result.status, result.text);
      return res.status(502).json({ error: "generateContent failed", details: result.text });
    }

    // parse generateContent successful response
    const reply =
      result.json?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result.json?.candidates?.[0]?.content?.text ||
      result.text ||
      "No reply";
    return res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error", details: String(err) });
  }
});

app.get("/api/health", (_, res) => res.json({ status: "ok", model: SELECTED_MODEL }));

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    const models = await listModels();
    if (!models || models.length === 0) {
      console.error("No models returned by listModels()");
      process.exit(1);
    }
    // choose a preferred first, else first available non-embedding
    for (const p of PREFERRED) {
      if (models.some(m => m.name === p)) {
        SELECTED_MODEL = p;
        break;
      }
    }
    if (!SELECTED_MODEL) {
      const valid = models.find(m => !/embed|embedding|imagen|veo/i.test(m.name));
      if (valid) SELECTED_MODEL = valid.name;
    }
    console.log("Selected model:", SELECTED_MODEL);
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (e) {
    console.error("Startup error:", e);
    process.exit(1);
  }
})();
