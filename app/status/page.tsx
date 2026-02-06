'use client';

import { motion } from 'framer-motion';
import { Shield, Check, AlertTriangle, XCircle, Search, Clock, Server } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';
import GlitchText from '@/components/GlitchText';

// This would ideally come from a database or config file
const initialStatusData = [
    {
        id: 1,
        name: 'Steam Unlocker',
        image: '/images/steam.png',
        status: 'undetected',
        lastUpdated: '1 hour ago',
        version: 'v3.5.0'
    },
    {
        id: 2,
        name: 'EzSpoofer',
        image: '/images/spoofer.png',
        status: 'undetected',
        lastUpdated: 'Just now',
        version: 'v4.2'
    }
];

export default function StatusPage() {
    const { t } = useLanguage();
    const [statusData, setStatusData] = useState(initialStatusData);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshStatus = () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1500);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'undetected': return 'bg-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.4)]';
            case 'maintenance': return 'bg-yellow-500 text-yellow-100 shadow-[0_0_20px_rgba(234,179,8,0.4)]';
            case 'testing': return 'bg-blue-500 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.4)]';
            case 'detected': return 'bg-red-500 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.4)]';
            default: return 'bg-gray-500 text-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'undetected': return <Check className="w-4 h-4" />;
            case 'maintenance': return <Clock className="w-4 h-4" />;
            case 'testing': return <Search className="w-4 h-4" />;
            case 'detected': return <AlertTriangle className="w-4 h-4" />;
            default: return <Server className="w-4 h-4" />;
        }
    };

    const getStatusText = (status: string) => {
        // @ts-ignore
        return t.statusPage[status] || status;
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 bg-transparent overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
                    >
                        <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400'}`} />
                        <span className="text-xs font-mono text-gray-400">
                            {isRefreshing ? 'REFRESHING...' : 'LIVE SYSTEM'}
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-black mb-2"
                    >
                        <GlitchText text={t.statusPage.title} />
                    </motion.div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        {t.statusPage.subtitle}
                    </motion.p>
                </div>

                {/* Status Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {statusData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TiltCard className="h-full">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all group relative overflow-hidden h-full">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0">
                                            {/* Placeholder for images if not exist, reusing Logo or Spoofer */}
                                            <Image
                                                src={item.name.includes('Spoofer') ? '/images/spoofer.png' : item.name.includes('Steam') ? '/images/steam.png' : '/images/logo.png'}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="font-bold text-lg truncate pr-2">{item.name}</h3>
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                                                    {getStatusIcon(item.status)}
                                                    <span>{getStatusText(item.status)}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Server className="w-3 h-3" />
                                                    {item.version}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {t.statusPage.lastUpdated}: {item.lastUpdated}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <button
                        onClick={refreshStatus}
                        disabled={isRefreshing}
                        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
                    >
                        <Clock className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {t.statusPage.clickToRefresh}
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
