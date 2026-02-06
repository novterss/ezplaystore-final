'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw, MessageCircle } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global Error:', error);
    }, [error]);

    return (
        <html>
            <body className="bg-[#0a0a0a] text-white font-sans">
                <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />
                    </div>

                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                        <div className="w-full h-full" style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                        }} />
                    </div>

                    <div className="text-center relative z-10">
                        {/* 500 Number */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-orange-500 via-orange-600 to-red-700 drop-shadow-[0_0_50px_rgba(249,115,22,0.5)]">
                                500
                            </div>
                        </motion.div>

                        {/* Error Icon */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex justify-center mb-4"
                        >
                            <div className="p-4 bg-orange-500/20 rounded-full">
                                <AlertTriangle className="w-10 h-10 text-orange-500" />
                            </div>
                        </motion.div>

                        {/* Error Message */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6"
                        >
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">
                                <GlitchText text="SERVER ERROR" />
                            </h1>
                            <p className="text-gray-400 text-lg max-w-md mx-auto">
                                เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105"
                            >
                                <RefreshCw className="w-5 h-5" />
                                ลองใหม่อีกครั้ง
                            </button>

                            <a
                                href="/"
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 hover:border-white/20"
                            >
                                <Home className="w-5 h-5" />
                                กลับหน้าแรก
                            </a>

                            <a
                                href="https://discord.gg/YMZXUhuMcV"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)]"
                            >
                                <MessageCircle className="w-5 h-5" />
                                แจ้งปัญหา
                            </a>
                        </motion.div>

                        {/* Error Details */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 flex flex-col items-center gap-2 text-xs text-gray-600 font-mono"
                        >
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                    ERROR_CODE: 500
                                </span>
                                <span>|</span>
                                <span>SYSTEM: EZPLAYSTORETH</span>
                            </div>
                            {error.digest && (
                                <span className="text-gray-700">
                                    Digest: {error.digest}
                                </span>
                            )}
                        </motion.div>
                    </div>
                </main>
            </body>
        </html>
    );
}
