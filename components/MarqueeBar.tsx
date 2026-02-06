'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MarqueeBar() {
    const { t } = useLanguage();

    return (
        <div className="w-full bg-[#050505] border-b border-primary/20 overflow-hidden py-2 relative z-50">
            {/* Neon Glow Overlay */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            <div className="flex select-none gap-8">
                <motion.div
                    className="flex shrink-0 gap-8 items-center whitespace-nowrap"
                    animate={{ x: '-100%' }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 30, // Adjust speed here
                        ease: 'linear'
                    }}
                >
                    {/* Repeat items twice for smooth loop */}
                    {[...t.marquee.items, ...t.marquee.items, ...t.marquee.items].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                            <span className="text-sm font-mono text-gray-300 tracking-wide">
                                {item}
                            </span>
                            <span className="text-primary/30 mx-4">|</span>
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate for specific loop handling if needed, but the array mapping above handles basic seamless loop */}
            </div>
        </div>
    );
}
