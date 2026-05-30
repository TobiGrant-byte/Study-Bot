import { useState } from "react";
import { formatMessage } from "../utils/formatMessage";

export default function Message({ msg }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rendered = formatMessage(msg.content);

  return (
    <div
      className={`flex items-start gap-3 animate-fadeSlideIn ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
          isUser
            ? "bg-slate-700 border border-slate-600"
            : "bg-gradient-to-br from-amber-400 to-amber-600"
        }`}
      >
        {isUser ? "👤" : "🎓"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] group relative ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-5 py-4 rounded-2xl text-sm leading-relaxed font-body ${
            isUser
              ? "bg-[#1a3a5c] border border-blue-900/50 text-slate-200 rounded-tr-sm"
              : "bg-white/5 border border-amber-500/10 text-slate-300 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p>{msg.content}</p>
          ) : (
            <div>
              {rendered.map((block) => {
                if (block.type === "h1")
                  return <h2 key={block.key} className="font-display text-xl text-amber-400 mt-3 mb-1">{block.content}</h2>;
                if (block.type === "h2")
                  return <h3 key={block.key} className="font-display text-lg text-amber-300 mt-3 mb-1">{block.content}</h3>;
                if (block.type === "li")
                  return <li key={block.key} className="ml-4 mb-1 list-disc text-slate-300">{block.content}</li>;
                if (block.type === "bold")
                  return <strong key={block.key} className="text-amber-200 block mt-2">{block.content}</strong>;
                if (block.type === "br")
                  return <br key={block.key} />;
                return <p key={block.key} className="mb-1">{block.content}</p>;
              })}
            </div>
          )}
        </div>

        {/* Copy button for assistant */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="mt-1 text-xs text-slate-600 hover:text-amber-400 font-body transition-colors self-end"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}