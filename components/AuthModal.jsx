"use client";

import { useState } from "react";
import { signInWithEmail } from "@/lib/supabase";

export default function AuthModal({ onClose, onSuccess }) {
  const [step, setStep] = useState("email"); // email | sent
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSendLink(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    const { error: err } = await signInWithEmail(email.trim());
    setLoading(false);

    if (err) {
      setError(err.message);
      return;
    }
    setStep("sent");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[360px] rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "email" ? (
          <>
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">📧</div>
              <h2 className="text-lg font-bold text-gray-800">เข้าสู่ระบบ</h2>
              <p className="text-xs text-gray-500 mt-1">
                ใส่อีเมลเพื่อรับลิงก์เข้าสู่ระบบ
              </p>
            </div>

            <form onSubmit={handleSendLink}>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mb-3"
                autoFocus
                required
              />

              {error && (
                <p className="text-xs text-red-500 mb-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full bg-blue-600 text-white text-sm font-bold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
              >
                {loading ? "กำลังส่ง..." : "ส่งลิงก์เข้าสู่ระบบ"}
              </button>
            </form>

            <button
              onClick={onClose}
              className="w-full text-center text-xs text-gray-400 mt-3 py-2"
            >
              เล่นต่อโดยไม่เข้าสู่ระบบ
            </button>
          </>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">✅</div>
              <h2 className="text-lg font-bold text-gray-800">ส่งลิงก์แล้ว!</h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                เราส่งลิงก์เข้าสู่ระบบไปที่
              </p>
              <p className="text-sm font-bold text-blue-600 mt-1">{email}</p>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                กดลิงก์ในอีเมลเพื่อเข้าสู่ระบบ<br />
                (ตรวจสอบโฟลเดอร์ Spam ด้วยนะ)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={async () => {
                  setLoading(true);
                  setError(null);
                  await signInWithEmail(email.trim());
                  setLoading(false);
                }}
                disabled={loading}
                className="w-full bg-gray-100 text-gray-600 text-sm font-medium py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-50"
              >
                {loading ? "กำลังส่ง..." : "ส่งลิงก์อีกครั้ง"}
              </button>

              <button
                onClick={() => { setStep("email"); setError(null); }}
                className="text-xs text-gray-400 py-2"
              >
                เปลี่ยนอีเมล
              </button>

              <button
                onClick={onClose}
                className="text-xs text-gray-400 py-1"
              >
                ปิด
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
