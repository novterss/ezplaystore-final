'use client';

import React from 'react';

interface GradientBorderProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    borderWidth?: number;
    borderRadius?: string;
}

const GradientBorder = ({
    children,
    className = "",
    colors = ["#a855f7", "#ec4899", "#3b82f6"],
    borderWidth = 2,
    borderRadius = "1.5rem"
}: GradientBorderProps) => {
    return (
        <div className={`relative group ${className}`} style={{ borderRadius }}>
            <div
                className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-[inherit] z-0 opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 animate-tilt"
                style={{
                    background: `linear-gradient(45deg, ${colors.join(', ')}, ${colors[0]})`,
                    backgroundSize: '200% 200%',
                    animation: 'tilt 5s linear infinite',
                    padding: borderWidth
                }}
            />
            <div className="relative z-10 h-full w-full rounded-[inherit] bg-[#0a0a0a]">
                {children}
            </div>

            <style jsx>{`
                @keyframes tilt {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
};

export default GradientBorder;
