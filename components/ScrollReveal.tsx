'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    once?: boolean;
}

const ScrollReveal = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.5,
    once = true
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const getInitialPosition = () => {
        switch (direction) {
            case 'up': return { y: 50, opacity: 0 };
            case 'down': return { y: -50, opacity: 0 };
            case 'left': return { x: 50, opacity: 0 };
            case 'right': return { x: -50, opacity: 0 };
            case 'none': return { opacity: 0 };
            default: return { y: 50, opacity: 0 };
        }
    };

    const getFinalPosition = () => {
        switch (direction) {
            case 'up':
            case 'down': return { y: 0, opacity: 1 };
            case 'left':
            case 'right': return { x: 0, opacity: 1 };
            case 'none': return { opacity: 1 };
            default: return { y: 0, opacity: 1 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={getInitialPosition()}
            animate={isInView ? getFinalPosition() : getInitialPosition()}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1] // Smooth cubic bezier
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
