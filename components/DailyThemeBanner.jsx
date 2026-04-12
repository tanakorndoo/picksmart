"use client";

export default function DailyThemeBanner({ theme }) {
  if (!theme) return null;
  return (
    <div className="mx-4 mt-3 px-4 py-3 rounded-2xl bg-primary-light text-primary text-center">
      <p className="text-xs text-muted mb-0.5">วันนี้:</p>
      <p className="text-sm font-semibold">{theme.label}</p>
    </div>
  );
}
