'use client';

import { useEffect, useState } from 'react';
import { Users, Download, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LiveStats() {
    const { t } = useLanguage();
    const [onlineUsers, setOnlineUsers] = useState(128);
    const [totalDownloads, setTotalDownloads] = useState(0);

    // Simulate online users fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setOnlineUsers(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.max(100, prev + change);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Fetch real downloads
    useEffect(() => {
        const fetchDownloads = async () => {
            // Fake base + Real DB count
            const { count } = await supabase
                .from('download_logs')
                .select('*', { count: 'exact', head: true });

            const baseCount = 1200;
            const realCount = count || 0;
            setTotalDownloads(baseCount + realCount);

            // Slow increment simulation for "running up" effect (fake)
            // Increments every 15-45 seconds randomly
            /* const interval = setInterval(() => {
                if (Math.random() > 0.7) {
                     setTotalDownloads(prev => prev + 1);
                }
            }, 5000); 
            return () => clearInterval(interval); */
            // Actually user said "not rapidly", "rarely". 
            // Let's just do a periodic check or VERY slow fake increment.
        };
        fetchDownloads();

        // Slow increment effect
        const timer = setInterval(() => {
            setTotalDownloads(prev => prev + (Math.random() > 0.5 ? 1 : 0));
        }, 15000 + Math.random() * 10000); // Every 15-25s, 50% chance

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-wrap gap-4 justify-center mt-8">
            {/* Online Users */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-5 py-3 bg-black/40 border border-green-500/20 rounded-2xl backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.1)] group hover:border-green-500/40 transition-all"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                    <div className="relative bg-green-500 rounded-full p-1.5">
                        <Users className="w-4 h-4 text-black" />
                    </div>
                </div>
                <div>
                    <div className="text-xl font-bold text-white font-mono leading-none">
                        {onlineUsers}
                    </div>
                    <div className="text-[10px] text-green-400 uppercase tracking-wider font-bold">
                        {t.statsWidget.online}
                    </div>
                </div>
            </motion.div>

            {/* Total Downloads */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 px-5 py-3 bg-black/40 border border-purple-500/20 rounded-2xl backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.1)] group hover:border-purple-500/40 transition-all"
            >
                <div className="bg-purple-500/20 p-1.5 rounded-full text-purple-400">
                    <Download className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-xl font-bold text-white font-mono leading-none">
                        {totalDownloads.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-purple-400 uppercase tracking-wider font-bold">
                        {t.statsWidget.downloads}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
