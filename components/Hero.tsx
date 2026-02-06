'use client';

import { ArrowRight, ShoppingCart, MessageCircle, Shield, Zap, Info, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import GlitchText from './GlitchText';
import TypewriterText from './TypewriterText';

const Hero = () => {
    const { t } = useLanguage();

    const scrollToShop = () => {
        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative flex flex-col items-center justify-center min-h-[95vh] text-center px-4 overflow-hidden pt-20">
            {/* Ambient Background */}
            {/* Ambient Background with Depth */}
            <div className="absolute inset-0 z-0 select-none">
                {/* Darker Image with Blur */}
                <div className="absolute inset-0 bg-[url('/images/websitebg.jpg')] bg-cover bg-center opacity-15 blur-[3px]" />

                {/* Gradient Overlay for Vignette/Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            </div>
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10"
            />

            {/* Trusted Badge */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
            >
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {t.hero.status}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {t.hero.guarantee}
                </span>
            </motion.div>

            {/* Logo Image with 3D Float Effect */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6 relative w-48 h-48 md:w-[250px] md:h-[250px] z-10"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-full blur-[60px] animate-pulse" />
                <Image
                    src="/images/ezhome.png"
                    alt="EzplaystoreTh Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-transform duration-500"
                    priority
                />
            </motion.div>

            {/* Typography */}
            {/* Main Title - Typewriter Effect */}
            <div className="text-5xl md:text-8xl font-black mb-6 tracking-tighter relative z-20 flex justify-center items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500 drop-shadow-lg">
                    <TypewriterText text="EZPLAYSTORE" className="" cursorColor="transparent" />
                </span>
                <span className="text-primary">
                    <TypewriterText text="TH" className="" cursorColor="#a855f7" />
                </span>
            </div>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light leading-relaxed z-10"
            >
                {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col md:flex-row gap-4 z-10"
            >
                <button
                    onClick={scrollToShop}
                    className="group flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                >
                    {t.hero.shopNow}
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
                <a
                    href="https://discord.gg/YMZXUhuMcV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2] hover:text-white border border-[#5865F2]/50 px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 backdrop-blur-md"
                >
                    <Image src="/images/discord.jpg" alt="Discord" width={24} height={24} className="rounded-full" />
                    {t.hero.discord}
                </a>
            </motion.div>

            {/* Live Stats Widget */}
            {/* Removed as it is already in page.tsx */}
        </section>
    );
};

export default Hero;
