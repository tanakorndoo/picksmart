"use client";

export default function ProgressBar({ current, total, startAt = 15 }) {
  const progress = startAt + (current / total) * (100 - startAt);

  return (
    <div className="px-4 py-3 bg-white border-b border-border">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-text">
          {current}/{total}
        </span>
        <span className="text-xs text-muted">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
