'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
}

const GlitchText = ({ text, className = "", as: Component = "span" }: GlitchTextProps) => {
    return (
        <Component className={`relative inline-block group ${className}`}>
            {/* Main Text */}
            <span className="relative z-10">{text}</span>

            {/* Red Glitch Layer */}
            <span
                className="absolute top-0 left-0 -z-10 translate-x-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1 text-red-500 overflow-hidden"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Blue Glitch Layer */}
            <span
                className="absolute top-0 left-0 -z-10 translate-x-[-2px] opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2 text-cyan-500 overflow-hidden"
                aria-hidden="true"
            >
                {text}
            </span>

            <style jsx>{`
                @keyframes glitch-1 {
                    0% { clip-path: inset(20% 0 80% 0); }
                    20% { clip-path: inset(60% 0 10% 0); }
                    40% { clip-path: inset(40% 0 50% 0); }
                    60% { clip-path: inset(80% 0 5% 0); }
                    80% { clip-path: inset(10% 0 70% 0); }
                    100% { clip-path: inset(30% 0 20% 0); }
                }
                @keyframes glitch-2 {
                    0% { clip-path: inset(10% 0 60% 0); }
                    20% { clip-path: inset(30% 0 20% 0); }
                    40% { clip-path: inset(70% 0 10% 0); }
                    60% { clip-path: inset(20% 0 50% 0); }
                    80% { clip-path: inset(60% 0 30% 0); }
                    100% { clip-path: inset(50% 0 10% 0); }
                }
                .animate-glitch-1 {
                    animation: glitch-1 2s infinite linear alternate-reverse;
                }
                .animate-glitch-2 {
                    animation: glitch-2 2s infinite linear alternate-reverse;
                }
            `}</style>
        </Component>
    );
};

export default GlitchText;
