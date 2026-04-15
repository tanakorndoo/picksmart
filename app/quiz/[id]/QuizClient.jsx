"use client";

import { useState, useMemo, useRef } from "react";
import quizData from "@/data/quizzes.json";
import { calculateResult } from "@/lib/quizEngine";
import { getUser, recordQuizResult, isLoggedIn } from "@/lib/store";
import QuizCover from "@/components/QuizCover";
import ProgressBar from "@/components/ProgressBar";
import QuizQuestion from "@/components/QuizQuestion";
import AnticipationScreen from "@/components/AnticipationScreen";
import ResultScreen from "@/components/ResultScreen";

export default function QuizClient({ quizId }) {
  const quiz = useMemo(
    () => quizData.quizzes.find((q) => q.quiz_id === quizId),
    [quizId]
  );

  const [screen, setScreen] = useState("cover");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultData, setResultData] = useState(null);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [newBadge, setNewBadge] = useState(null);
  const startTimeRef = useRef(null);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <p className="text-lg font-bold text-text mb-2">ไม่พบ Quiz นี้</p>
          <a href="/" className="text-primary underline text-sm">กลับหน้าแรก</a>
        </div>
      </div>
    );
  }

  const questions = quiz.questions;
  const totalQ = questions.length;

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers({});
    setResultData(null);
    setCoinsEarned(0);
    setNewBadge(null);
    startTimeRef.current = Date.now();
  };

  const handleAnswer = (questionId, optionId) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      if (quiz.anticipation_screen?.enabled) {
        setScreen("anticipation");
      } else {
        finishQuiz(newAnswers);
      }
    }
  };

  const finishQuiz = (finalAnswers) => {
    const result = calculateResult(questions, finalAnswers, quiz.scoring);

    const durationSec = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : undefined;

    const { user: updatedUser, newBadges: earnedBadges } = recordQuizResult(
      quiz.quiz_id,
      result.winner,
      quiz.results[result.winner]?.identity_label || result.winner,
      result.breakdown,
      { durationSec, quizzes: quizData.quizzes }
    );

    if (earnedBadges && earnedBadges.length > 0) {
      setNewBadge(earnedBadges[0]);
    }

    setCoinsEarned(isLoggedIn() ? (quiz.gamification?.quiz_coins_reward || 10) : 0);
    setResultData({
      result: quiz.results[result.winner],
      breakdown: result.breakdown,
      archetype: result.winner,
    });
    setScreen("result");
  };

  if (screen === "cover") {
    return <QuizCover quiz={quiz} onStart={handleStart} />;
  }

  if (screen === "quiz") {
    return (
      <div className="min-h-screen bg-bg max-w-md mx-auto">
        <ProgressBar
          current={currentQ + 1}
          total={totalQ}
          startAt={quiz.app_config?.progress_bar_start_at || 15}
        />
        <QuizQuestion
          key={questions[currentQ].id}
          question={questions[currentQ]}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }

  if (screen === "anticipation") {
    return (
      <AnticipationScreen
        config={quiz.anticipation_screen}
        onComplete={() => finishQuiz(answers)}
      />
    );
  }

  if (screen === "result" && resultData) {
    return (
      <ResultScreen
        quiz={quiz}
        result={resultData.result}
        breakdown={resultData.breakdown}
        archetype={resultData.archetype}
        coinsEarned={coinsEarned}
        newBadge={newBadge}
        onRetry={handleStart}
      />
    );
  }

  return null;
}
