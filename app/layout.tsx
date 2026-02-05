import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import StarBackground from "../components/StarBackground";
import NewsTicker from "../components/NewsTicker";
import BackToTop from "../components/BackToTop";
import FloatingDiscord from "../components/FloatingDiscord";
import LoadingScreen from "../components/LoadingScreen";


const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "EzplaystoreTh | คลังแสงเกมและโปรแกรมระดับเทพ",
  description: "จำหน่ายโปรเกม Spoofer ปลดแบน และแจกฟรี Software/Plugins/Scripts สำหรับนักตัดต่อและเกมเมอร์ ครบจบในที่เดียว",
  openGraph: {
    title: "EzplaystoreTh | คลังแสงเกมและโปรแกรมระดับเทพ",
    description: "จำหน่ายโปรเกม Spoofer ปลดแบน และแจกฟรี Software/Plugins/Scripts สำหรับนักตัดต่อและเกมเมอร์ ครบจบในที่เดียว",
    images: ["/images/logo.png"], // ✅ แก้ .jpg เป็น .png ให้ตรงไฟล์จริง
    type: "website",
  },
  icons: {
    icon: '/images/logo.png',      // ✅ เปลี่ยนมาใช้รูปเดียวกับ Logo หลัก (ชัวร์กว่า)
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} antialiased text-white font-sans`}>
        <Providers> {/* ✅ ครอบ Providers ไว้ตรงนี้ */}
          <LoadingScreen />
          <StarBackground />
          <NewsTicker />
          {children}
          <BackToTop />
          <FloatingDiscord />
        </Providers> {/* ✅ ปิด Providers ตรงนี้ */}
      </body>
    </html>
  );
}
