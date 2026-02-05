'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-[#050505]">
            {/* Moving Grid - Cyberpunk/Retro Style */}
            <div
                className="absolute bottom-0 w-full h-[50vh] opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    perspective: '500px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
                    maskImage: 'linear-gradient(to top, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
                }}
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-sm ${i % 2 === 0 ? 'bg-primary/40' : 'bg-green-500/40'}`}
                    style={{
                        width: Math.random() * 6 + 2 + 'px',
                        height: Math.random() * 6 + 2 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10,
                    }}
                />
            ))}

            {/* Ambient Glows handled by globals.css, but adding subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/80" />
        </div>
    );
};

export default Background;
