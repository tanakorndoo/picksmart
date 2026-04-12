"use client";

import HomeScreen from "@/components/HomeScreen";
import quizData from "@/data/quizzes.json";

export default function Home() {
  return (
    <HomeScreen
      quizzes={quizData.quizzes}
      appSettings={quizData.app_settings}
    />
  );
}
