'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Download, FileCode2, Scroll, Puzzle, Zap, Monitor, AppWindow, PenTool, Image as ImageIcon } from 'lucide-react';
import { freeCategories } from '../data/freeZoneData';
import Image from 'next/image';
import ProtectedDownload from './ProtectedDownload';

const TabbedFreeZone = () => {
    const [activeTab, setActiveTab] = useState(freeCategories[0].id);
    const [searchQuery, setSearchQuery] = useState('');

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
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        Category Showcase
                    </span>
                </h2>
                <p className="text-xl text-gray-400">คลังแสงสำหรับเกมเมอร์และครีเอเตอร์ แจกฟรีไม่มีกั๊ก</p>
            </motion.div>

            {/* Warning Banner */}
            <div className="max-w-4xl mx-auto mb-12 p-4 rounded-xl bg-gradient-to-r from-purple-900/50 to-red-900/50 border border-purple-500/30 flex items-center justify-center gap-3 text-white font-bold animate-pulse shadow-lg backdrop-blur-sm">
                <Lock className="w-5 h-5 text-purple-300" />
                <span>ลิงก์ดาวน์โหลดและรหัสผ่าน แจกฟรีใน Discord เท่านั้น!</span>
            </div>

            {/* Search Input */}
            <div className="max-w-xl mx-auto mb-12 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Puzzle className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="ค้นหาโปรแกรม... (เช่น After Effects, Twixtor)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {freeCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`px-8 py-3 rounded-full font-bold transition-all relative overflow-hidden ${activeTab === cat.id
                            ? 'text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                            : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
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
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <a
                    href="https://discord.gg/YMZXUhuMcV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block bg-gradient-to-r from-yellow-900/40 via-yellow-600/20 to-yellow-900/40 border border-yellow-500/50 p-6 rounded-2xl text-center overflow-hidden hover:scale-[1.02] transition-transform"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <span className="text-3xl">🛠️</span>
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-yellow-500">ลงไม่เป็น? เรามีบริการรับลงโปรแกรม</h3>
                            <p className="text-gray-300">ราคาเพียง <span className="text-white font-bold text-lg">50 บาท/โปรแกรม</span> ดูแลจนกว่าจะใช้งานได้</p>
                        </div>
                        <span className="md:ml-auto bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors">
                            จ้างลงโปรแกรม
                        </span>
                    </div>
                </a>
            </div>

            {/* Content Area */}
            <div className="max-w-5xl mx-auto min-h-[400px]">
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
                                <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl group bg-black/40 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />

                                    {cat.image ? (
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                                        />
                                    ) : (
                                        <div className="scale-150 group-hover:scale-125 transition-transform duration-500">
                                            {getCategoryIcon(cat.id)}
                                        </div>
                                    )}

                                    <div className="absolute bottom-6 left-8 z-20">
                                        <h3 className="text-3xl font-bold text-white mb-2">{cat.name}</h3>
                                        <p className="text-green-400 font-mono text-sm uppercase tracking-widest">Available Now</p>
                                    </div>
                                </div>

                                {/* Items Grid */}
                                {filteredItems.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredItems.map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-green-500/30 transition-all group backdrop-blur-sm flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        {item.tag && (
                                                            <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-red-500/30">
                                                                {item.tag}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="mt-auto"> {/* Added wrapper to push to bottom */}
                                                    {item.url ? (
                                                        <ProtectedDownload fileUrl={item.url} />
                                                    ) : (
                                                        <a
                                                            href="https://discord.gg/YMZXUhuMcV"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-6 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#5865F2]/40 active:scale-95 text-sm"
                                                        >
                                                            <img src="/images/discord.jpg" className="w-5 h-5 rounded-full" alt="Discord" />
                                                            รับลิ้งค์ใน Discord
                                                        </a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-xl">😭 ไม่พบรายการที่ค้นหา (No items found)</p>
                                        <p className="text-sm mt-2">ลองค้นหาด้วยคำอื่น หรือกดเปิด Ticket เพื่อขอไฟล์</p>
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
