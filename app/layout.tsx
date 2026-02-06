import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { UnlockProvider } from "../contexts/UnlockContext";
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
      <body className={`${kanit.variable} antialiased text-white font-sans`}>
        <Providers>
          <GlobalErrorBoundary>
            {/* Background is now handled by InteractiveStarBackground which is fixed position */}
            <InteractiveStarBackground />
            <CursorTrail />

            <UnlockProvider>
              <LoadingScreen />
              <Navbar />
              <NewsTicker />
              {children}
              <CookieBanner />
              <BackToTop />
              <ThemeSwitcher />
              <MusicPlayer />
              <Footer />
            </UnlockProvider>
          </GlobalErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
