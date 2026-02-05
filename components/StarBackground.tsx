'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    angle: number;
    delay: number;
}

const StarBackground = () => {
    // เก็บค่าดาวไว้ใน State
    const [starStyles, setStarStyles] = useState({
        small: '',
        medium: '',
        large: ''
    });

    const [mounted, setMounted] = useState(false);
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

    // Mouse motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Parallax transforms for different layers
    // Background moves very slowly
    const bgX = useTransform(springX, [-1000, 1000], [20, -20]);
    const bgY = useTransform(springY, [-1000, 1000], [20, -20]);

    // Stars move at different speeds based on "depth"
    const smallStarsX = useTransform(springX, [-1000, 1000], [30, -30]);
    const smallStarsY = useTransform(springY, [-1000, 1000], [30, -30]);

    const mediumStarsX = useTransform(springX, [-1000, 1000], [60, -60]);
    const mediumStarsY = useTransform(springY, [-1000, 1000], [60, -60]);

    const largeStarsX = useTransform(springX, [-1000, 1000], [90, -90]);
    const largeStarsY = useTransform(springY, [-1000, 1000], [90, -90]);

    // ฟังก์ชันสุ่มดาว
    const generateStars = (count: number) => {
        let value = '';
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            value += `${x}px ${y}px rgb(255, 255, 255)`;
            if (i < count - 1) value += ', ';
        }
        return value;
    };

    useEffect(() => {
        setMounted(true);
        setStarStyles({
            small: generateStars(700),
            medium: generateStars(200),
            large: generateStars(100)
        });

        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrameId) return;

            animationFrameId = requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const centerX = innerWidth / 2;
                const centerY = innerHeight / 2;

                mouseX.set(clientX - centerX);
                mouseY.set(clientY - centerY);
                animationFrameId = 0;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Shooting Star Spawner
        const interval = setInterval(() => {
            const newStar: ShootingStar = {
                id: Date.now(),
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight / 2 : 500), // Start mostly in top half
                angle: 45, // Fixed 45 degree angle for consistency
                delay: Math.random() * 0.5
            };
            setShootingStars(prev => [...prev.slice(-4), newStar]); // Keep last 5
        }, 3000); // New star every 3 seconds

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            clearInterval(interval);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 w-full h-full -z-50 bg-[#050505] overflow-hidden">
            {/* Background Image Layer */}
            <motion.div
                className="absolute inset-[-50px] z-0 opacity-40 select-none pointer-events-none"
                style={{ x: bgX, y: bgY }}
            >
                <Image
                    src="/images/bg.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Dark Overlay to fade the background */}
                <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            {/* Nebula Glow Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-gradient-to-br from-purple-900/40 via-blue-900/20 to-transparent blur-3xl" />

            {/* Small Stars */}
            <motion.div
                className="star-layer w-[1px] h-[1px] opacity-70 absolute inset-[-100px] z-10"
                style={{
                    boxShadow: starStyles.small,
                    animationDuration: '100s',
                    x: smallStarsX,
                    y: smallStarsY
                }}
            />
            {/* Medium Stars */}
            <motion.div
                className="star-layer w-[2px] h-[2px] opacity-90 absolute inset-[-100px] z-10"
                style={{
                    boxShadow: starStyles.medium,
                    animationDuration: '150s',
                    x: mediumStarsX,
                    y: mediumStarsY
                }}
            />
            {/* Large Stars */}
            <motion.div
                className="star-layer w-[3px] h-[3px] absolute inset-[-100px] z-10"
                style={{
                    boxShadow: starStyles.large,
                    animationDuration: '200s',
                    x: largeStarsX,
                    y: largeStarsY
                }}
            />

            {/* Shooting Stars */}
            <AnimatePresence>
                {shootingStars.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 1, x: star.x, y: star.y, scale: 0.5 }}
                        animate={{
                            opacity: 0,
                            x: star.x + 300,
                            y: star.y + 300,
                            scale: 1.5
                        }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: star.delay }}
                        onAnimationComplete={() => {
                            setShootingStars(prev => prev.filter(s => s.id !== star.id));
                        }}
                        className="absolute z-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45"
                        style={{
                            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.4)'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default StarBackground;