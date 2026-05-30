import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import StarterPrompts from "./StarterPrompts";

export default function ChatWindow({ messages, loading, error, onSend }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    onSend(msg);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800/60 bg-[#080f1a]/80 backdrop-blur-md">
        <span className="text-2xl">🎓</span>
        <div>
          <h1 className="font-display text-xl text-amber-400 leading-none">Scholar</h1>
          <p className="text-slate-500 text-xs font-body">AI Research Assistant</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-500 text-xs font-body">Gemini 2.0</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 ? (
          <StarterPrompts onSelect={handleSend} />
        ) : (
          messages.map((msg, i) => <Message key={i} msg={msg} />)
        )}
        {loading && <TypingIndicator />}
        {error && (
          <div className="text-center text-red-400 text-sm font-body bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-slate-800/60 bg-[#080f1a]/80 backdrop-blur-md">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything about your studies..."
            rows={1}
            className="flex-1 bg-white/5 border border-slate-700 focus:border-amber-500/50 outline-none rounded-xl px-4 py-3 text-slate-200 text-sm font-body placeholder-slate-600 resize-none transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-body font-medium px-5 py-3 rounded-xl transition-colors duration-200 flex-shrink-0"
          >
            Send
          </button>
        </div>
        <p className="text-slate-600 text-xs font-body text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}