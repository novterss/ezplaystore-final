'use client';

import { useState, useEffect } from 'react';
import { Palette, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
    { name: 'Cyber Purple', color: '#8b5cf6', sub: '#a78bfa' },
    { name: 'Matrix Green', color: '#22c55e', sub: '#4ade80' },
    { name: 'Royal Blue', color: '#3b82f6', sub: '#60a5fa' },
    { name: 'Crimson Red', color: '#ef4444', sub: '#f87171' },
];

const ThemeSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(themes[0].name);

    useEffect(() => {
        // Load theme from local storage
        const savedTheme = localStorage.getItem('site-theme');
        if (savedTheme) {
            const theme = themes.find(t => t.name === savedTheme);
            if (theme) applyTheme(theme);
        }
    }, []);

    const applyTheme = (theme: typeof themes[0]) => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', theme.color);
        // You can add more variables here if needed
        setCurrentTheme(theme.name);
        localStorage.setItem('site-theme', theme.name);
    };

    return (
        <div className="fixed top-1/2 right-0 z-50 transform -translate-y-1/2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="bg-black/80 backdrop-blur-md border border-white/10 rounded-l-2xl p-4 shadow-2xl flex flex-col gap-3 mr-12"
                    >
                        <h4 className="text-sm font-bold text-gray-400 mb-1">Select Theme</h4>
                        {themes.map((theme) => (
                            <button
                                key={theme.name}
                                onClick={() => applyTheme(theme)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${currentTheme === theme.name ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: theme.color }}
                                title={theme.name}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute right-0 top-0 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-l-xl border-l border-t border-b border-white/10 transition-all text-white shadow-lg"
            >
                {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Palette className="w-5 h-5 animate-pulse" style={{ color: 'var(--color-primary)' }} />}
            </button>
        </div>
    );
};

export default ThemeSwitcher;
