import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Max Pharma's assistant — how can I help today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scroller = useRef();
  const inputRef = useRef();

  useEffect(() => {
    scroller.current?.scrollIntoView({ behavior: "smooth" });
    if (open) inputRef.current?.focus();
  }, [messages, open]);

  // Configure this via .env or use full URL for dev:
  // For dev with proxy: leave as "/api/chat"
  // To call backend directly: set REACT_APP_BACKEND_URL=http://localhost:8080 in .env and use it.
  const backendUrl = process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL.replace(/\/$/, "")}/api/chat`
    : "http://localhost:8080/api/chat";

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Add user message immediately (optimistic)
    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Chat API returned error:", resp.status, txt);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry — I couldn't reach the chat service." },
        ]);
        return;
      }

      const data = await resp.json();
      const reply = data.reply ?? "No reply.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Network or parsing error calling /api/chat:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "There was an error connecting to the chat service." },
      ]);
    } finally {
      setLoading(false);
    }
  } // sendMessage

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg"
          aria-label="Open chat"
        >
          {open ? "Close" : "Chat with us"}
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-blue-600 text-white font-semibold">Max Pharma Assistant</div>

          <div className="p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={scroller}></div>
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              className="flex-1 border rounded-full px-3 py-2 text-sm"
              placeholder="Ask about medicines, opening hours, delivery..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-2 rounded-full"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
