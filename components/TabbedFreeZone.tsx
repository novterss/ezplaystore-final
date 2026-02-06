'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TiltCard from './TiltCard';
import GlitchText from './GlitchText';
import { Lock, FileCode2, Scroll, Zap, Monitor, PenTool, Puzzle } from 'lucide-react';
import { freeCategories } from '../data/freeZoneData';
import ProtectedDownload from './ProtectedDownload';
import { useLanguage } from '../contexts/LanguageContext';

const TabbedFreeZone = () => {
    const [activeTab, setActiveTab] = useState(freeCategories[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const { t } = useLanguage();

    const getCategoryIcon = (categoryId: string) => {
        switch (categoryId) {
            case 'scripts':
                return <FileCode2 className="w-12 h-12 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />;
            case 'extensions':
                return <Scroll className="w-12 h-12 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />;
            case 'plugins':
                return <Zap className="w-12 h-12 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />;
            case 'windows':
                return <Monitor className="w-12 h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />;
            case 'adobe':
                return <PenTool className="w-12 h-12 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" />;
            default:
                return <Puzzle className="w-12 h-12 text-gray-400" />;
        }
    };

    return (
        <section id="free-zone" className="container mx-auto px-4 py-24 scroll-mt-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-medium text-green-400 tracking-wider uppercase">Free Resources</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                    <GlitchText text={t.tabbed.title} className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]" />
                </h2>
                <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto rounded-full mb-6 opacity-80" />
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{t.tabbed.subtitle}</p>
            </motion.div>

            {/* Warning Banner */}
            <div className="max-w-4xl mx-auto mb-12 p-1 rounded-xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-red-500/30 animate-gradient-xy">
                <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 flex items-center justify-center gap-3 text-white font-bold h-full">
                    <Lock className="w-5 h-5 text-purple-300 animate-bounce" />
                    <span>{t.tabbed.warning}</span>
                </div>
            </div>

            {/* Search Input */}
            <div className="max-w-xl mx-auto mb-12 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Puzzle className="w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder={t.tabbed.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all backdrop-blur-sm shadow-xl focus:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {freeCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all relative overflow-hidden text-sm uppercase tracking-wide ${activeTab === cat.id
                            ? 'text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105'
                            : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                            }`}
                    >
                        {activeTab === cat.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Service Banner */}
            <div className="max-w-4xl mx-auto mb-16 relative group cursor-pointer">
                <div className="absolute inset-0 bg-yellow-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <a
                    href="https://discord.gg/YMZXUhuMcV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block bg-gradient-to-r from-yellow-900/40 via-yellow-600/10 to-yellow-900/40 border border-yellow-500/30 hover:border-yellow-500/60 p-6 rounded-2xl text-center overflow-hidden hover:scale-[1.01] transition-all"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50 text-2xl animate-pulse">
                            🛠️
                        </div>
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-yellow-500 mb-1">{t.service.title}</h3>
                            <p className="text-gray-300 text-sm">
                                {t.service.price} <span className="text-white font-bold text-lg mx-1">50 {t.service.unit}</span> {t.service.desc}
                            </p>
                        </div>
                        <span className="md:ml-auto bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-1 transition-all">
                            {t.service.button}
                        </span>
                    </div>
                </a>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto min-h-[400px]">
                <AnimatePresence mode="wait">
                    {freeCategories.map((cat) => {
                        if (cat.id !== activeTab) return null;

                        const filteredItems = cat.items.filter(item =>
                            item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                {/* Category Header */}
                                <div className="relative w-full h-48 md:h-60 rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl group bg-black/40 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent z-10" />

                                    {cat.image ? (
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                                        />
                                    ) : (
                                        <div className="scale-150 group-hover:scale-125 transition-transform duration-500 opacity-50">
                                            {getCategoryIcon(cat.id)}
                                        </div>
                                    )}

                                    <div className="absolute bottom-8 left-8 z-20">
                                        <h3 className="text-4xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">{cat.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-green-400 font-mono text-xs uppercase tracking-[0.2em]">Available Now</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Grid */}
                                {filteredItems.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredItems.map((item, idx) => (
                                            <TiltCard key={idx} className="h-full">
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                                    className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 hover:border-green-500/30 transition-all group backdrop-blur-sm flex flex-col justify-between h-full hover:shadow-xl"
                                                >
                                                    <div>
                                                        <div className="flex items-start gap-4 mb-4">
                                                            {((item as any).image || (cat as any)?.itemFallbackImage) && (
                                                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/20 shrink-0 border border-white/10 group-hover:border-green-500/50 transition-colors">
                                                                    <Image
                                                                        src={(item as any).image || (cat as any)?.itemFallbackImage}
                                                                        alt={item.name}
                                                                        fill
                                                                        className="object-cover group-hover:scale-110 transition-transform"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start">
                                                                    <h4 className="text-base font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
                                                                        {item.name}
                                                                    </h4>
                                                                    {item.tag && (
                                                                        <span className="ml-2 bg-red-500/20 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-red-500/30 shrink-0">
                                                                            {item.tag}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-white/5">
                                                        <ProtectedDownload
                                                            fileUrl={item.url}
                                                            fileName={item.name}
                                                        />
                                                    </div>
                                                </motion.div>
                                            </TiltCard>
                                        ))}

                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-gray-500 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center">
                                        <Puzzle className="w-16 h-16 mb-4 text-gray-600" />
                                        <p className="text-xl font-medium text-gray-400">{t.tabbed.noResults}</p>
                                        <p className="text-sm mt-2 text-gray-600">{t.tabbed.tryAgain}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TabbedFreeZone;
