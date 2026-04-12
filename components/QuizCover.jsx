"use client";

export default function QuizCover({ quiz, onStart }) {
  const { metadata, results } = quiz;
  const resultTypes = Object.values(results);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 animate-fade-in-up"
      style={{ background: `linear-gradient(135deg, #E8F5F0 0%, #F0EEFF 50%, #FFF8E7 100%)` }}
    >
      <span className="text-5xl mb-4">{metadata.cover_emoji}</span>
      <h1 className="text-2xl font-extrabold text-text text-center mb-2">
        {metadata.title}
      </h1>
      <p className="text-sm text-muted text-center mb-6 max-w-[280px]">
        {metadata.subtitle}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted mb-8">
        <span>⏱ {metadata.estimated_time}</span>
        <span>🎯 {metadata.total_questions} คำถาม</span>
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-[280px] py-3.5 bg-primary text-white font-bold rounded-xl text-base active:scale-[0.97] transition-transform shadow-lg shadow-primary/20"
      >
        เริ่มเลย!
      </button>

      {/* Preview result types */}
      <div className="flex items-center gap-3 mt-8">
        {resultTypes.map((r) => (
          <div key={r.id} className="flex items-center gap-1 text-xs text-muted">
            <span>{r.emoji}</span>
            <span>{r.identity_label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
