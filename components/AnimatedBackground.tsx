'use client';

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#030303]">
            {/* Layer 1: Moving Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                    x: [-50, 50, -50],
                    y: [-30, 30, -30],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen"
            />

            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [30, -30, 30],
                    y: [30, -30, 30],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-green-500/20 blur-[140px] rounded-full mix-blend-screen"
            />

            {/* Layer 2: Subtle Grid / Dust */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Deep overlay to merge everything */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/50 to-[#030303]" />
        </div>
    );
};

export default AnimatedBackground;
