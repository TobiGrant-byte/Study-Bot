export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fadeSlideIn">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-sm flex-shrink-0">
        🎓
      </div>
      <div className="bg-white/5 border border-amber-500/10 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-2 items-center">
        <span className="w-2 h-2 rounded-full bg-amber-400 dot1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-amber-400 dot2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-amber-400 dot3 inline-block" />
      </div>
    </div>
  );
}