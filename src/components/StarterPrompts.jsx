const prompts = [
  "Explain the causes of World War II",
  "What is photosynthesis?",
  "Summarise Newton's laws of motion",
  "How does the internet work?",
  "What is the difference between DNA and RNA?",
  "Explain the French Revolution",
];

export default function StarterPrompts({ onSelect }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
      <span className="text-5xl mb-4">🎓</span>
      <h2 className="font-display text-3xl text-amber-400 mb-2">
        Welcome to Scholar
      </h2>
      <p className="text-slate-400 font-body text-sm mb-8 text-center max-w-sm">
        Ask me anything about your studies. I'll break it down clearly for you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className="text-left bg-white/5 hover:bg-amber-500/10 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 font-body text-sm px-4 py-3 rounded-xl transition-all duration-200"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}