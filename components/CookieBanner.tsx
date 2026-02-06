'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookieBanner() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if cookie consent is already given
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay slightly for effect
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        // Optional: save 'declined' state or just close
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl max-w-lg w-full pointer-events-auto flex flex-col md:flex-row gap-6 items-center">
                        <div className="bg-primary/20 p-3 rounded-full">
                            <Cookie className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-sm text-gray-300">
                                {t.cookie.message}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {t.cookie.decline}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-95"
                            >
                                {t.cookie.accept}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
