import quizData from "@/data/quizzes.json";
import QuizClient from "./QuizClient";

export function generateStaticParams() {
  return quizData.quizzes.map((quiz) => ({
    id: quiz.quiz_id,
  }));
}

export default function QuizPage({ params }) {
  return <QuizClient quizId={params.id} />;
}
