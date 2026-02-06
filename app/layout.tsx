import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { UnlockProvider } from "../contexts/UnlockContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import InteractiveStarBackground from "../components/InteractiveStarBackground";
import NewsTicker from "../components/NewsTicker";
import BackToTop from "../components/BackToTop";
import LoadingScreen from "../components/LoadingScreen";
import CursorTrail from "../components/CursorTrail";
import ThemeSwitcher from "../components/ThemeSwitcher";
import MusicPlayer from "../components/MusicPlayer";
import CookieBanner from '@/components/CookieBanner';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";
import ScrollProgress from "@/components/ScrollProgress";
import AntiDevTools from "@/components/AntiDevTools";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ezplaystoreth.vercel.app'),
  title: "EzplaystoreTh | ศูนย์รวมโปรแกรมและเครื่องมือระดับเทพ",
  description: "EzplaystoreTh | ศูนย์รวมโปรแกรมและเครื่องมือระดับเทพสำหรับเกมเมอร์และครีเอเตอร์ จำหน่าย Spoofer ปลดแบน HWID คุณภาพสูง และแจกฟรี Plugins, Scripts, Extensions สำหรับ Adobe และ Windows ครบจบในที่เดียว ปลอดภัย เชื่อถือได้ พร้อมซัพพอร์ตตลอด 24 ชม.",
  openGraph: {
    title: "EzplaystoreTh | ศูนย์รวมโปรแกรมและเครื่องมือระดับเทพ",
    description: "EzplaystoreTh | ศูนย์รวมโปรแกรมและเครื่องมือระดับเทพสำหรับเกมเมอร์และครีเอเตอร์ จำหน่าย Spoofer ปลดแบน HWID คุณภาพสูง และแจกฟรี Plugins, Scripts, Extensions สำหรับ Adobe และ Windows ครบจบในที่เดียว ปลอดภัย เชื่อถือได้ พร้อมซัพพอร์ตตลอด 24 ชม.",
    url: 'https://ezplaystoreth.vercel.app',
    siteName: 'EzplaystoreTh',
    images: [
      {
        url: "/images/ezicon3.png",
        width: 800,
        height: 600,
        alt: "EzplaystoreTh Logo",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EzplaystoreTh | ศูนย์รวมโปรแกรมและเครื่องมือระดับเทพ",
    description: "ศูนย์รวมโปรแกรมและเครื่องมือระดับเทพสำหรับเกมเมอร์และครีเอเตอร์ Plguin, Script, Extension ฟรี!",
    images: ["/images/ezicon3.png"],
  },
  icons: {
    icon: '/images/ezicon3.png',
    shortcut: '/images/ezicon3.png',
    apple: '/images/ezicon3.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* จะก็อปหาพ่อมึงเหรอ ไปทำเองไป */}
      {/* กูไม่ได้ดูหรอก แต่มึงดูกูอยู่ */}
      {/* กูไม่ให้ dump หรอก ไปหาที่อื่น */}
      <body className={`${kanit.variable} antialiased text-white font-sans`}>
        {/* ⚠️ WARNING: จะก็อปโค้ด ระวังโดนแช่ง */}
        {/* 🚫 NO COPY ZONE - ทำเองดีกว่า */}
        {/* 👀 กูเห็นมึงอยู่นะ */}
        <Providers>
          {/* 💀 ก็อปไปแล้วพังอย่ามาโวยวาย */}
          <GlobalErrorBoundary>
            {/* 🤡 Ctrl+C แล้วไง ใช้ได้ที่ไหน */}
            <ScrollProgress />
            {/* Background is now handled by InteractiveStarBackground which is fixed position */}
            <InteractiveStarBackground />
            {/* 😂 หาอะไรอยู่ */}
            <CursorTrail />
            {/* 🔥 ไฟร์มันเข้าไป dump มึง */}

            <UnlockProvider>
              {/* 🙈 ไม่เห็นๆ ก็อปไม่ได้หรอก */}
              <WishlistProvider>
                {/* 🎭 สวมหน้ากากมาก็อปเหรอ */}
                <LoadingScreen />
                {/* 🔐 Anti-DevTools Protection */}
                <AntiDevTools />
                {/* 🥷 ลอบมาก็อปใช่ไหม */}
                <Navbar />
                {/* 📰 ข่าวด่วน: มึงก็อปไม่สำเร็จ */}
                <NewsTicker />
                {/* 👶 เด็กก็อป เด็กก็อป */}
                {children}
                {/* 🍪 กินคุกกี้ไป อย่าก็อป */}
                <CookieBanner />
                {/* 🔝 ขึ้นไปข้างบน แล้วออกไป */}
                <BackToTop />
                {/* 🎨 เปลี่ยนธีมได้ แต่ก็อปไม่ได้ */}
                <ThemeSwitcher />
                {/* 🎵 เปิดเพลงให้ฟังตอนพยายามก็อป */}
                <MusicPlayer />
                {/* 👣 Footer ของกู ไม่ใช่ของมึง */}
                <Footer />
              </WishlistProvider>
            </UnlockProvider>
            {/* 💩 ถ้าก็อปไป เว็บมึงจะเหม็น */}
          </GlobalErrorBoundary>
          {/* 🚀 ยิงมึงไปดาวอังคาร */}
        </Providers>
        <Analytics />
        {/* 🏴‍☠️ โจรก็อป = โจรจน */}
        {/* 😎 Made with love, not for copy */}
        {/* 🔒 Anti-Copy System Activated */}
      </body>
    </html>
  );
}
