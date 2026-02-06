'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds loading

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 bg-[#050505] z-[200] flex flex-col items-center justify-center p-4 overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-black pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Logo Image */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 relative w-64 h-64 md:w-80 md:h-80"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                filter: ['drop-shadow(0 0 20px rgba(168,85,247,0.3))', 'drop-shadow(0 0 40px rgba(168,85,247,0.5))', 'drop-shadow(0 0 20px rgba(168,85,247,0.3))']
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src="/images/ezhome.png"
                                alt="Loading"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>



                    {/* Progress Bar */}
                    <motion.div
                        className="w-64 md:w-80 h-1 bg-white/5 rounded-full overflow-hidden"
                    >
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
