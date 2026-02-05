'use client';

import { motion } from 'framer-motion';

const FloatingDiscord = () => {
    return (
        <div className="fixed bottom-8 right-8 z-[100] group">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 right-0 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white text-sm font-bold shadow-xl">
                    Need Help? ทักแชทเลย
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white/10 border-r border-b border-white/20 transform rotate-45 backdrop-blur-md"></div>
                </div>
            </div>

            {/* Ripple Effect Layers */}
            <div className="absolute inset-0 bg-[#5865F2] rounded-full animate-ping opacity-20 duration-1000" />
            <div className="absolute inset-0 bg-[#5865F2] rounded-full animate-pulse opacity-40 delay-75" />

            <a
                href="https://discord.gg/YMZXUhuMcV"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-16 h-16 bg-[#5865F2] hover:bg-[#4752C4] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(88,101,242,0.6)] hover:shadow-[0_0_30px_rgba(88,101,242,0.8)] transition-all transform group-hover:scale-110 active:scale-95"
            >
                <img
                    src="/images/discord.jpg"
                    alt="Join Discord"
                    className="w-10 h-10 rounded-full"
                />
            </a>
        </div>
    );
};

export default FloatingDiscord;
