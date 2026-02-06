'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, MessageCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="w-full h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                }} />
            </div>

            <div className="text-center relative z-10">
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-900 drop-shadow-[0_0_50px_rgba(239,68,68,0.5)]">
                        404
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
                        <GlitchText text="PAGE NOT FOUND" />
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        ไม่พบหน้าที่คุณต้องการ หรือหน้านี้ถูกลบไปแล้ว
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        กลับหน้าแรก
                    </Link>

                    <Link
                        href="/#shop"
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 hover:border-white/20"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        ไปหน้า Shop
                    </Link>

                    <a
                        href="https://discord.gg/YMZXUhuMcV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)]"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Discord
                    </a>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex items-center justify-center gap-4 text-xs text-gray-600 font-mono"
                >
                    <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        ERROR_CODE: 404
                    </span>
                    <span>|</span>
                    <span>SYSTEM: EZPLAYSTORETH</span>
                </motion.div>
            </div>
        </main>
    );
}
