'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyButtonProps {
    text: string;
    className?: string;
    label?: string;
    showLabel?: boolean;
}

const CopyButton = ({ text, className = '', label = 'Copy', showLabel = true }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-200 
                ${copied
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 border-white/10'
                }
                border
                ${className}
            `}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        {showLabel && <span>Copied!</span>}
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        {showLabel && <span>{label}</span>}
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default CopyButton;
