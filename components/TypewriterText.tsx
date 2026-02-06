'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    cursorColor?: string;
}

export default function TypewriterText({
    text,
    className = "",
    cursorColor = "#a855f7", // Default primary color
    delay = 0
}: TypewriterTextProps & { delay?: number }) {
    const textIndex = useMotionValue(0);
    const count = useMotionValue(0);
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const controls = animate(count, text.length, {
                type: "tween",
                duration: text.length * 0.1, // Dynamic duration based on length
                ease: "linear",
                onUpdate: (latest) => {
                    setDisplayText(text.slice(0, Math.round(latest)));
                }
            });
            return () => controls.stop();
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [text, count, delay]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="inline-block w-[3px] h-[1em] align-middle ml-1"
                style={{ backgroundColor: cursorColor }}
            />
        </span>
    );
}
