"use client";

export default function GamificationBar({ coins, streak, loggedIn }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-border">
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold text-primary">PickSmart</span>
      </div>
      {loggedIn && (
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-semibold text-gold" title="เหรียญสะสม">
            🪙 <span className="text-[10px] text-gray-400 font-normal mr-0.5">เหรียญ</span>{coins}
          </span>
          <span className="flex items-center gap-1 font-semibold text-accent" title="เล่นต่อเนื่อง">
            🔥 <span className="text-[10px] text-gray-400 font-normal mr-0.5">Streak</span>{streak}
          </span>
        </div>
      )}
    </div>
  );
}
