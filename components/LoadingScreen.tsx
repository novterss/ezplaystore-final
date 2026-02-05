'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Increased slightly to let users see the cool loading screen

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 bg-[#050505] z-[200] flex flex-col items-center justify-center p-4"
                >
                    {/* Pulsating Logo Image */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mb-8 relative w-56 h-56"
                    >
                        <Image
                            src="/images/loading2.png"
                            alt="Loading"
                            fill
                            className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                        />
                    </motion.div>

                    {/* Typing Text Effect */}
                    <div className="font-mono text-purple-400 text-lg md:text-xl flex items-center gap-3">
                        <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                        <TypewriterText key="loading-text" text="S tarting....." />
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                        className="w-64 h-1.5 bg-gray-900 rounded-full mt-6 overflow-hidden border border-white/5"
                    >
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Simple Typewriter component
const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 150); // Slower typing for "....." effect
        return () => clearInterval(timer);
    }, [text]);

    return <span className="tracking-widest">{displayText}</span>;
}

export default LoadingScreen;
