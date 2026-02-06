'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AnnouncementModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    // Safe access to the new key
    const modalData = t.announcementModal || {
        title: "Special Announcement",
        desc: "Welcome to EzplaystoreTh!",
        close: "Close"
    };

    const title = typeof modalData.title === 'string' ? modalData.title : "Special Announcement";
    const desc = typeof modalData.desc === 'string' ? modalData.desc : "Welcome to EzplaystoreTh!";
    const close = typeof modalData.close === 'string' ? modalData.close : "Close";
    const shopNow = (t.hero && typeof t.hero.shopNow === 'string') ? t.hero.shopNow : "Shop Now";

    useEffect(() => {
        // Check if already seen
        const hasSeen = localStorage.getItem('hasSeenAnnouncement');
        if (hasSeen) return;

        // Delay opening slightly for better UX
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Set seen flag in localStorage
        localStorage.setItem('hasSeenAnnouncement', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                    >
                        {/* Header Background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 to-purple-900/10" />

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative p-8 text-center pt-12">
                            {/* Icon */}
                            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                <Megaphone className="w-10 h-10 text-primary animate-pulse" />
                            </div>

                            {/* Text */}
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                {title}
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                {desc}
                            </p>

                            {/* Action Button */}
                            <button
                                onClick={() => {
                                    handleClose();
                                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-1"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {shopNow}
                            </button>

                            <button
                                onClick={handleClose}
                                className="mt-4 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {close}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
