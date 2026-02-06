'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DiscordStatus = () => {
    const { t } = useLanguage();
    const [memberCount, setMemberCount] = useState<number | null>(null);

    useEffect(() => {
        // Simulated fetch
        setMemberCount(Math.floor(Math.random() * (500 - 100) + 100)); // Mock for demo
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-40 hidden md:block" // Changed to bottom-6 for better positioning
        >
            <a
                href="https://discord.gg/YMZXUhuMcV"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative"
            >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

                <div className="relative bg-[#1a1c24]/90 hover:bg-[#20222a] transition-all rounded-xl p-4 w-72 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {/* Online Indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#1a1c24]"></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                            <img src="/images/discord.jpg" className="w-full h-full rounded-xl object-cover" alt="Discord" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-md shadow-black drop-shadow-md">EzPlayStore</h4>
                            <p className="text-gray-400 text-xs flex items-center gap-1">
                                <span className="font-bold text-white">{memberCount ? memberCount : '467'}</span> {t.discord.online}
                            </p>
                        </div>
                    </div>

                    {/* Join Button Visual */}
                    <div className="mt-4 flex items-center justify-between text-xs font-medium bg-white/5 rounded-lg p-2 group-hover:bg-[#5865F2] group-hover:text-white transition-colors duration-300">
                        <span className="text-gray-300 group-hover:text-white/90">{t.discord.join}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default DiscordStatus;
