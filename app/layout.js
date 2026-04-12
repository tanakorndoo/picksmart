import "./globals.css";

export const metadata = {
  title: "PickSmart — ค้นหาสิ่งที่ใช่สำหรับคุณ",
  description: "ทำแบบทดสอบสนุกๆ ค้นหาสินค้าที่เหมาะกับคุณ",
  openGraph: {
    title: "PickSmart Quiz",
    description: "ค้นหา Skin Persona ของคุณ — ตอบ 6 คำถาม รู้ผลทันที",
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
