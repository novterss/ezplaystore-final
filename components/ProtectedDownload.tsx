'use client';

import { useSession, signIn } from 'next-auth/react';
import { Download, Lock } from 'lucide-react';
import Image from 'next/image';
import { useUnlock } from '../contexts/UnlockContext'; // Keeping import although unused in this logic for now
import ClickSpark from './ClickSpark';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedDownloadProps {
  fileUrl: string;
  fileName: string;
}

const ProtectedDownload = ({ fileUrl, fileName }: ProtectedDownloadProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/YMZXUhuMcV', '_blank');
  };

  const handleDownload = async () => {
    // 1. Open Download Link immediately
    window.open(fileUrl, '_blank');

    // 2. Track in Background
    if (session) {
      try {
        await fetch('/api/user/increment-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName })
        });
      } catch (e) {
        console.error("Failed to track download", e);
      }
    }
  };

  // 1. Not Logged In
  if (!session) {
    return (
      <ClickSpark className="w-full">
        <button
          onClick={() => signIn('discord')}
          className="mt-6 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#5865F2]/40 active:scale-95 text-sm cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          Login to Download
        </button>
      </ClickSpark>
    );
  }

  // 2. Logged In BUT Not in Discord (isMember = false)
  if (!(session.user as any).isMember) {
    return (
      <div className="space-y-3 mt-6">
        <ClickSpark className="w-full">
          <button
            onClick={handleJoinDiscord}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/40 active:scale-95 text-sm animate-pulse cursor-pointer"
          >
            <Image src="/images/discord.jpg" alt="Discord" width={20} height={20} className="rounded-full" />
            Join Discord to Unlock
          </button>
        </ClickSpark>
      </div>
    );
  }

  // 3. Unlocked (Logged in + In Discord)
  return (
    <ClickSpark className="w-full">
      <button
        onClick={handleDownload}
        className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/40 active:scale-95 text-sm cursor-pointer"
      >
        <Download className="w-5 h-5" />
        Download File
      </button>
    </ClickSpark>
  );
};

export default ProtectedDownload;