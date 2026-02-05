import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com', // อนุญาตให้ดึงรูปโปรไฟล์จาก Discord
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // เผื่อไว้สำหรับรูป Google (อนาคต)
      },
    ],
  },
};

export default nextConfig;