'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show progress bar after scrolling 100px
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 origin-left shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                style={{ scaleX: scrollYProgress }}
            />
        </motion.div>
    );
};

export default ScrollProgress;
