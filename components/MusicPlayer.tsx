'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false); // Default to false, will try to play on mount
    const [volume, setVolume] = useState(0.3);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio('/music/bgm.mp3');
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // Auto-play attempt
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Auto-play prevented by browser policy - silent fail as we have a fallback
                setIsPlaying(false);
            });
        }

        // Global unlocker for browsers that block auto-play
        const handleGlobalClick = () => {
            if (audio.paused) {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Silent fail
                });
            }
            // Remove listeners after first interaction attempt
            document.removeEventListener('click', handleGlobalClick);
            document.removeEventListener('keydown', handleGlobalClick);
            document.removeEventListener('scroll', handleGlobalClick);
            document.removeEventListener('touchstart', handleGlobalClick);
        };

        // Aggressively listen for ANY user interaction
        document.addEventListener('click', handleGlobalClick);
        document.addEventListener('keydown', handleGlobalClick);
        document.addEventListener('scroll', handleGlobalClick);
        document.addEventListener('touchstart', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
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
            className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 p-2 pr-4 rounded-full border shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all group ${isPlaying ? 'bg-black/60 border-primary/50 animate-pulse-slow shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-black/40 border-white/10 hover:bg-black/60'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={toggleMusic}
                className={`p-3 rounded-full transition-all text-white active:scale-95 ${isPlaying ? 'bg-primary/20 hover:bg-primary/30' : 'bg-white/10 hover:bg-white/20'}`}
                aria-label="Toggle Background Music"
            >
                {isPlaying ? (
                    <div className="flex items-center gap-1">
                        <span className="w-1 h-3 bg-green-400 rounded-full animate-[music-bar_1s_ease-in-out_infinite]" />
                        <span className="w-1 h-5 bg-green-400 rounded-full animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]" />
                        <span className="w-1 h-4 bg-green-400 rounded-full animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]" />
                    </div>
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
