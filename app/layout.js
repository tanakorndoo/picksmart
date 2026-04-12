import "./globals.css";

export const metadata = {
  title: "PickSmart — คำตอบบอกทุกอย่าง",
  description: "ทำแบบทดสอบสนุกๆ ค้นพบสิ่งที่ใช่สำหรับคุณ ตอบ 6 ข้อ รู้ผลทันที",
  openGraph: {
    title: "PickSmart — คำตอบบอกทุกอย่าง",
    description: "ทำแบบทดสอบสนุกๆ ค้นพบสิ่งที่ใช่สำหรับคุณ ตอบ 6 ข้อ รู้ผลทันที",
    url: "https://picksmart-th.vercel.app",
    siteName: "PickSmart",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PickSmart — คำตอบบอกทุกอย่าง",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickSmart — คำตอบบอกทุกอย่าง",
    description: "ทำแบบทดสอบสนุกๆ ค้นพบสิ่งที่ใช่สำหรับคุณ",
    images: ["/og-image.svg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="font-prompt antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
