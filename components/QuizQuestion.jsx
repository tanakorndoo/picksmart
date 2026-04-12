"use client";

import { useState } from "react";

export default function QuizQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    setTimeout(() => {
      onAnswer(question.id, optionId);
    }, 500);
  };

  const isImageGrid = question.display === "image_grid";

  return (
    <div className="px-4 py-6 animate-fade-in-up">
      <h2 className="text-base font-bold text-text mb-1">
        {question.question}
      </h2>
      {question.subtitle && (
        <p className="text-xs text-muted mb-1">{question.subtitle}</p>
      )}
      {question.why_we_ask && (
        <p className="text-xs text-primary bg-primary-light px-3 py-1.5 rounded-lg mb-3 inline-block">
          💡 {question.why_we_ask}
        </p>
      )}

      <div className={`mt-4 ${isImageGrid ? "grid grid-cols-2 gap-3" : "flex flex-col gap-2.5"}`}>
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const isOther = selected && !isSelected;

          if (isImageGrid) {
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 min-h-[100px]
                  ${isSelected
                    ? "border-primary bg-primary-light scale-[0.97]"
                    : isOther
                    ? "border-border bg-white opacity-50"
                    : "border-border bg-white active:scale-[0.97]"
                  }`}
              >
                <span className="text-3xl mb-2">{option.image_emoji}</span>
                <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-text"}`}>
                  {option.text}
                </span>
              </button>
            );
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all duration-300
                ${isSelected
                  ? "border-primary bg-primary-light"
                  : isOther
                  ? "border-border bg-white opacity-50"
                  : "border-border bg-white active:scale-[0.97]"
                }`}
            >
              <span className={`text-sm ${isSelected ? "font-semibold text-primary" : "text-text"}`}>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {question.social_proof_hint && (
        <p className="text-xs text-muted text-center mt-4">
          📊 {question.social_proof_hint}
        </p>
      )}
    </div>
  );
}
