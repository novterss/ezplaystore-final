'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TiltCard from './TiltCard';
import GlitchText from './GlitchText';
import { Lock, FileCode2, Scroll, Zap, Monitor, PenTool, Puzzle } from 'lucide-react';
import { freeCategories } from '../data/freeZoneData';
import ProtectedDownload from './ProtectedDownload';
import { useLanguage } from '../contexts/LanguageContext';

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Lite Video Player Component (Click-to-Load)
const LiteVideoPlayer = ({ src, poster, title }: { src: string; poster?: string; title?: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const youtubeId = getYouTubeId(src);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    // YouTube Thumbnail Fallback
    const thumbnail = youtubeId
        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        : poster;

    if (!isLoaded) {
        return (
            <div
                className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10 group-hover:border-purple-500/50 transition-all mb-4 cursor-pointer group/player"
                onClick={handleLoad}
            >
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt={title || "Video Preview"}
                        fill
                        className="object-cover opacity-80 group-hover/player:opacity-100 transition-opacity"
                    />
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg transform group-hover/player:scale-110 transition-transform">
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-xs text-white font-medium">
                    Click to Play
                </div>
            </div>
        );
    }

    // Loaded State
    if (youtubeId) {
        return (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 mb-4">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                    title={title || "YouTube video player"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 mb-4">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                controls
            />
        </div>
    );
};

// Interface for type safety
interface FreeItem {
    name: string;
    url: string;
    description?: string;
    tag?: string;
    image?: string;
    videoPreview?: string;
    originalPreviewUrl?: string;
    previewLink?: string;
    plugins?: string[];
    dateAdded?: string;
    isHot?: boolean;
}

const TabbedFreeZone = () => {
    const [activeTab, setActiveTab] = useState(freeCategories[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlugin, setSelectedPlugin] = useState('All');
    const { t } = useLanguage();

    // Auto-switch to assets tab for dev/testing or stick effectively
    // useEffect(() => { setActiveTab('assets'); }, []); 

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
            case 'assets':
                return <div className="text-4xl animate-pulse">🎨</div>;
            default:
                return <Puzzle className="w-12 h-12 text-gray-400" />;
        }
    };

    // Helper to extract unique plugins from the 'assets' category
    const getUniquePlugins = (items: FreeItem[]) => {
        const allPlugins = items.flatMap(item => item.plugins || []);
        return ['All', ...Array.from(new Set(allPlugins))];
    };

    // Helper to check if item is NEW (within 7 days)
    const isNewItem = (dateString?: string) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        {t.tabbed.title}
                    </span>
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
                        onClick={() => {
                            setActiveTab(cat.id);
                            setSelectedPlugin('All'); // Reset filter on tab change
                        }}
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
                        {(t.tabbed.categories as any)[cat.id] || cat.name}
                    </button>
                ))}
            </div>

            {/* Dynamic Plugin Filters (Only for Assets Tab) */}
            {activeTab === 'assets' && (
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mr-4 text-purple-400 font-bold uppercase tracking-wider text-xs">
                            <Zap className="w-4 h-4" /> Filter By:
                        </div>
                        {getUniquePlugins(freeCategories.find(c => c.id === 'assets')?.items as FreeItem[] || []).map((plugin) => (
                            <button
                                key={plugin}
                                onClick={() => setSelectedPlugin(plugin)}
                                className={`
                                    px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                                    ${selectedPlugin === plugin
                                        ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]'
                                        : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10'}
                                `}
                            >
                                {plugin}
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
            <div className="max-w-7xl mx-auto min-h-[400px]">
                <AnimatePresence mode="wait">
                    {freeCategories.map((cat) => {
                        if (cat.id !== activeTab) return null;

                        let filteredItems = cat.items.filter(item =>
                            item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        // Apply Plugin Filter
                        if (activeTab === 'assets' && selectedPlugin !== 'All') {
                            filteredItems = filteredItems.filter(item =>
                                (item as FreeItem).plugins?.includes(selectedPlugin)
                            );
                        }

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
                                        <h3 className="text-4xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">{(t.tabbed.categories as any)[cat.id] || cat.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-green-400 font-mono text-xs uppercase tracking-[0.2em]">Available Now</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Grid */}
                                {filteredItems.length > 0 ? (
                                    <div className={`${activeTab === 'assets' ? 'grid grid-cols-1 gap-8 max-w-3xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                                        {filteredItems.map((item: FreeItem, idx) => (
                                            <TiltCard key={idx} className="h-full">
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                                    className={`
                                                        bg-white/5 border border-white/10 rounded-3xl 
                                                        hover:bg-white/10 transition-all group backdrop-blur-sm 
                                                        flex flex-col justify-between h-full hover:shadow-2xl overflow-hidden relative
                                                        ${activeTab === 'assets' ? 'p-0 hover:border-purple-500/50 hover:shadow-purple-500/20' : 'p-5 hover:border-green-500/30'}
                                                    `}
                                                >
                                                    {/* NEW & HOT BADGES */}
                                                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                                        {item.isHot && (
                                                            <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg shadow-red-500/40 animate-pulse flex items-center gap-1">
                                                                🔥 HOT
                                                            </div>
                                                        )}
                                                        {isNewItem(item.dateAdded) && (
                                                            <div className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg shadow-blue-500/40 flex items-center gap-1 border border-blue-400">
                                                                ✨ NEW
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className={`${activeTab === 'assets' ? 'p-0' : ''}`}>
                                                        {/* Video Preview or Image for Assets */}
                                                        {item.videoPreview ? (
                                                            <div className={activeTab === 'assets' ? 'mb-0' : ''}>
                                                                <LiteVideoPlayer
                                                                    src={item.videoPreview}
                                                                    poster={item.image || (cat as any).itemFallbackImage}
                                                                    title={item.name}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className={`${activeTab === 'assets' ? 'p-6 pb-0' : 'flex items-start gap-4 mb-4'}`}>
                                                                {(item.image || (cat as any)?.itemFallbackImage) && activeTab !== 'assets' && (
                                                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/20 shrink-0 border border-white/10 group-hover:border-green-500/50 transition-colors">
                                                                        <Image
                                                                            src={item.image || (cat as any)?.itemFallbackImage}
                                                                            alt={item.name}
                                                                            fill
                                                                            className="object-cover group-hover:scale-110 transition-transform"
                                                                        />
                                                                    </div>
                                                                )}
                                                                {/* Asset Image Fallback if no video but is asset tab */}
                                                                {activeTab === 'assets' && item.image && !item.videoPreview && (
                                                                    <div className="relative w-full aspect-video overflow-hidden bg-black/20 mb-4 border-b border-white/10 group-hover:border-purple-500/50 transition-all">
                                                                        <Image
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            fill
                                                                            className="object-cover transition-transform group-hover:scale-105"
                                                                        />
                                                                    </div>
                                                                )}

                                                                {/* Content Container (Title/Desc usually) */}
                                                                {activeTab !== 'assets' && (
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
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Specific Layout for Assets Tab */}
                                                        {activeTab === 'assets' ? (
                                                            <div className="p-6">
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <h4 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
                                                                        {item.name}
                                                                    </h4>
                                                                    {item.tag && (
                                                                        <span className="ml-2 bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-purple-500/30 shrink-0">
                                                                            {item.tag}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {item.description && (
                                                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                                                        {item.description}
                                                                    </p>
                                                                )}

                                                                {item.plugins && (
                                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                                        {item.plugins.map((plugin, pIdx) => (
                                                                            <span key={pIdx} className="flex items-center gap-1 text-[11px] bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/10">
                                                                                <Zap className="w-3 h-3 text-purple-400" />
                                                                                {plugin}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                <div className="flex gap-3">
                                                                    <ProtectedDownload
                                                                        fileUrl={item.url}
                                                                        fileName={item.name}
                                                                    />
                                                                    {item.originalPreviewUrl && (
                                                                        <a
                                                                            href={item.originalPreviewUrl}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-colors flex items-center gap-2"
                                                                        >
                                                                            <span>📺</span> Watch
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    {activeTab !== 'assets' && (
                                                        <div className="mt-4 pt-4 border-t border-white/5">
                                                            <ProtectedDownload
                                                                fileUrl={item.url}
                                                                fileName={item.name}
                                                            />
                                                        </div>
                                                    )}
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
