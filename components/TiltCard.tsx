'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glareOpacity?: number;
    tiltMaxAngleX?: number;
    tiltMaxAngleY?: number;
}

const TiltCard = ({
    children,
    className = "",
    glareOpacity = 0.4,
    tiltMaxAngleX = 10,
    tiltMaxAngleY = 10
}: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Smooth rotation
    const rotateXSpring = useSpring(rotateX, { stiffness: 100, damping: 10 });
    const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 10 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXRelative = e.clientX - rect.left;
        const mouseYRelative = e.clientY - rect.top;

        const xPct = mouseXRelative / width - 0.5;
        const yPct = mouseYRelative / height - 0.5;

        x.set(mouseXRelative);
        y.set(mouseYRelative);

        rotateY.set(xPct * tiltMaxAngleY * 2); // Rotate Y based on X position
        rotateX.set(-yPct * tiltMaxAngleX * 2); // Rotate X based on Y position

        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
            }}
            className={`relative transform-gpu ${className}`}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="h-full w-full"
            >
                {children}
            </div>

            {/* Glare Effect */}
            <motion.div
                style={{
                    opacity: isHovered ? glareOpacity : 0,
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.4),
                            transparent 80%
                        )
                    `
                }}
                className="pointer-events-none absolute inset-0 z-50 rounded-xl transition-opacity duration-500 will-change-transform"
            />
        </motion.div>
    );
};

export default TiltCard;
