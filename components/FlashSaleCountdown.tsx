'use client';

import { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FlashSaleCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Generate a random end time between 2 to 12 hours from now on mount
        // To keep it consistent across re-renders during session, we could store in localStorage,
        // but for "random numbers" per refresh/session as requested, we'll generate fresh.
        const randomHours = Math.floor(Math.random() * 10) + 2;
        const randomMinutes = Math.floor(Math.random() * 60);
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + randomHours);
        targetDate.setMinutes(targetDate.getMinutes() + randomMinutes);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                // Reset or stay at 0
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 px-6 py-3 rounded-full border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-md"
            >
                <Zap className="w-5 h-5 text-red-500 animate-pulse fill-red-500" />
                <span className="text-red-400 font-bold uppercase tracking-wider text-sm mr-2">Flash Sale Ends In:</span>

                <div className="flex items-center gap-2 font-mono text-xl font-bold text-white">
                    <div className="bg-black/40 px-2 py-1 rounded text-red-100 min-w-[2ch] text-center">
                        {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <span className="text-red-500 animate-pulse">:</span>
                    <div className="bg-black/40 px-2 py-1 rounded text-red-100 min-w-[2ch] text-center">
                        {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <span className="text-red-500 animate-pulse">:</span>
                    <div className="bg-black/40 px-2 py-1 rounded text-red-100 min-w-[2ch] text-center">
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FlashSaleCountdown;
