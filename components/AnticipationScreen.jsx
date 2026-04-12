"use client";

import { useState, useEffect } from "react";

export default function AnticipationScreen({ config, onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = config?.messages || [
    "กำลังวิเคราะห์...",
    "จับคู่สินค้า...",
    "เกือบเสร็จ!",
  ];
  const duration = config?.duration_ms || 2500;
  const interval = duration / messages.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, interval);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg animate-fade-in-up">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin-slow mb-6" />

      <p className="text-base font-semibold text-text animate-pulse-slow">
        {messages[messageIndex]}
      </p>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {messages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= messageIndex ? "bg-primary" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
