'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio('/music/bgm.mp3');
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Update volume dynamically
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => {
                console.error("Audio playback failed:", e);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3 p-2 pr-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg hover:bg-black/60 transition-all group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={toggleMusic}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white active:scale-95"
                aria-label="Toggle Background Music"
            >
                {isPlaying ? (
                    <Volume2 className="w-5 h-5 animate-pulse text-green-400" />
                ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {/* Volume Slider visible on hover or when playing */}
            <AnimatePresence>
                {(isPlaying || isHovered) && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex items-center gap-2 overflow-hidden"
                    >
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-xs font-mono text-gray-400 w-8 text-right">
                            {Math.round(volume * 100)}%
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MusicPlayer;
