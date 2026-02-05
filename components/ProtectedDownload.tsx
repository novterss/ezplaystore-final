'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { Download, Lock, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProtectedDownloadProps {
  fileUrl: string;
}

const ProtectedDownload = ({ fileUrl }: ProtectedDownloadProps) => {
  const { data: session } = useSession();
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/bRxWpw4qtz', '_blank');
    setHasJoined(true);
  };

  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  if (!session) {
    return (
      <button
        onClick={() => signIn('discord')}
        className="mt-6 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#5865F2]/40 active:scale-95 text-sm"
      >
        <Lock className="w-4 h-4" />
        Login to Download
      </button>
    );
  }

  if (!hasJoined) {
    return (
      <button
        onClick={handleJoinDiscord}
        className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/40 active:scale-95 text-sm animate-pulse"
      >
        <Image src="/images/discord.jpg" alt="Discord" width={20} height={20} className="rounded-full" />
        Join Discord Server (Required)
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/40 active:scale-95 text-sm"
    >
      <Download className="w-5 h-5" />
      Download File
    </button>
  );
};

export default ProtectedDownload;