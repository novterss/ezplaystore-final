'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClickSparkProps {
    children: React.ReactNode;
    className?: string;
    sparkColor?: string;
    onClick?: () => void;
}

interface Spark {
    id: number;
    x: number;
    y: number;
}

const ClickSpark = ({ children, className = "", sparkColor = "#FFE45E", onClick }: ClickSparkProps) => {
    const [sparks, setSparks] = useState<Spark[]>([]);

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newSpark = { id: Date.now(), x, y };
        setSparks(prev => [...prev, newSpark]);

        if (onClick) onClick();
    };

    // Clean up sparks animations
    useEffect(() => {
        if (sparks.length > 0) {
            const timer = setTimeout(() => {
                setSparks(prev => prev.slice(1));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [sparks]);

    return (
        <div className={`relative ${className}`} onClick={handleClick}>
            {children}
            <AnimatePresence>
                {sparks.map(spark => (
                    <SparkBurst key={spark.id} x={spark.x} y={spark.y} color={sparkColor} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const SparkBurst = ({ x, y, color }: { x: number; y: number; color: string }) => {
    return (
        <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                        x: Math.cos(i * (Math.PI * 2) / 8) * 30,
                        y: Math.sin(i * (Math.PI * 2) / 8) * 30,
                        opacity: 0,
                        scale: [1, 0]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
};

export default ClickSpark;
