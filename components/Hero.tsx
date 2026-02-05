'use client';

import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

import Image from 'next/image';

const Hero = () => {
    const scrollToShop = () => {
        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 overflow-hidden">
            {/* Background Glow */}
            <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
            />

            {/* Logo Image */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8 relative w-80 h-80 md:w-[500px] md:h-[500px]"
            >
                <Image
                    src="/images/loading2.png"
                    alt="EzplaystoreTh Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                    priority
                />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight"
            >
                <span className="drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">EzplaystoreTh</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#06b6d4]">
                    Made in Bkk
                </span>
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl font-light"
            >
                Premium Games & HWID Unbans on a Budget <br />
                <span className="text-white font-medium">Safe • Fast • Step-by-Step Guide</span>
            </motion.p>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                onClick={scrollToShop}
                className="group flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-full text-xl font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-105"
            >
                Shop Now
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>
        </section>
    );
};

export default Hero;
