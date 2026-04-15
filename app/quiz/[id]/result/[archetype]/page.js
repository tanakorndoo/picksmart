import Link from "next/link";
import quizData from "@/data/quizzes.json";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const params = [];
  for (const quiz of quizData.quizzes) {
    for (const archetype of Object.keys(quiz.results || {})) {
      params.push({ id: quiz.quiz_id, archetype });
    }
  }
  return params;
}

function getData(id, archetype) {
  const quiz = quizData.quizzes.find((q) => q.quiz_id === id);
  if (!quiz) return null;
  const result = quiz.results?.[archetype];
  if (!result) return null;
  return { quiz, result };
}

export async function generateMetadata({ params, searchParams }) {
  const data = getData(params.id, params.archetype);
  if (!data) return {};
  const { quiz, result } = data;
  const from = searchParams?.from ? decodeURIComponent(searchParams.from) : null;
  const share = result.share_card || {};

  const title = from
    ? `${from} เป็น ${share.identity_label || result.identity_label} ${share.emoji || result.emoji}`
    : `${share.identity_label || result.identity_label} ${share.emoji || result.emoji} — ${quiz.metadata.title}`;
  const description = from
    ? `${from} ชวนคุณทำ ${quiz.metadata.title} • ${share.subtitle || ""} • ใช้เวลา 2 นาที รู้ผลเลย`
    : `${share.subtitle || ""} • ทำ Quiz 2 นาที รู้ว่าคุณเป็นแบบไหน`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "th_TH",
      siteName: "PickSmart",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function SharedResultPage({ params, searchParams }) {
  const data = getData(params.id, params.archetype);
  if (!data) notFound();
  const { quiz, result } = data;
  const share = result.share_card || {};
  const from = searchParams?.from ? decodeURIComponent(searchParams.from) : null;

  return (
    <div className="min-h-screen max-w-md mx-auto px-5 py-10 flex flex-col items-center justify-center text-center"
      style={{ background: result.bg_color || "#FFF" }}>
      {from && (
        <div className="mb-6 px-4 py-2 rounded-full bg-white/80 border border-border text-xs text-text">
          🎯 <span className="font-bold">{from}</span> ชวนคุณมาทำ Quiz!
        </div>
      )}

      <p className="text-xs text-muted uppercase tracking-wider mb-2">
        {from ? `${from} ได้ผลลัพธ์` : "ผลลัพธ์"}
      </p>
      <span className="text-7xl block mb-3">{share.emoji || result.emoji}</span>
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: result.color }}>
        {share.identity_label || result.identity_label}
      </h1>
      <p className="text-sm text-muted mb-6">{share.subtitle || result.headline}</p>

      <div className="bg-white/90 rounded-2xl p-5 mb-6 w-full border border-border">
        <p className="text-sm text-text leading-relaxed">
          {from
            ? `แล้วคุณล่ะเป็นแบบไหน? 🤔 ทำ Quiz เดียวกันดู ใช้เวลาแค่ 2 นาที รู้ผลทันที`
            : `ลองทำ Quiz นี้ดู ใช้เวลาแค่ 2 นาที รู้ผลทันที`}
        </p>
      </div>

      <Link
        href={`/quiz/${quiz.quiz_id}`}
        className="w-full py-4 bg-purple text-white font-bold text-base rounded-xl active:scale-[0.97] transition-transform shadow-lg"
      >
        🚀 เริ่มทำ Quiz เลย
      </Link>
      <Link
        href="/"
        className="mt-3 text-xs text-muted underline"
      >
        ดู Quiz อื่นๆ
      </Link>

      <p className="mt-8 text-xs font-semibold text-primary">PickSmart</p>
    </div>
  );
}
