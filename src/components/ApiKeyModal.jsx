import { useState } from "react";

export default function ApiKeyModal({ onSubmit }) {
  const [key, setKey] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d1b2a] border border-amber-500/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-4xl">🎓</span>
          <h1 className="text-3xl text-amber-400 mt-3">Scholar</h1>
          <p className="text-slate-400 text-sm mt-2">
            Your AI-powered research assistant
          </p>
        </div>

        <div className="mb-4">
          <label className="text-slate-300 text-sm block mb-2">
            API Key
          </label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && key.trim()) onSubmit(key.trim());
            }}
            placeholder="Paste your API key here..."
            className="w-full bg-[#080f1a] border border-slate-700 outline-none rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600"
          />
        </div>

        <p className="text-slate-500 text-xs mb-5">
          Get your free key at{" "}
          
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noreferrer"
            className="text-amber-500 hover:underline"
          >
            console.groq.com/keys
          </a>
        </p>

        <button
          onClick={() => key.trim() && onSubmit(key.trim())}
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium py-3 rounded-xl transition-colors duration-200"
        >
          Start Researching →
        </button>
      </div>
    </div>
  );
}