'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, ShieldCheck, Clock, Star } from 'lucide-react';

const TrustStats = () => {
    const { t } = useLanguage();

    const stats = [
        { label: t.stats.users, value: '238+', sub: t.stats.usersSub, icon: Users, color: 'from-blue-400 to-cyan-400' },
        { label: t.stats.undetected, value: '100%', sub: t.stats.undetectedSub, icon: ShieldCheck, color: 'from-green-400 to-emerald-400' },
        { label: t.stats.support, value: '24/7', sub: t.stats.supportSub, icon: Clock, color: 'from-purple-400 to-pink-400' },
        { label: t.stats.reviews, value: '5-Star', sub: t.stats.reviewsSub, icon: Star, color: 'from-yellow-400 to-orange-400' },
    ];

    return (
        <section className="py-20 border-y border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-3xl font-bold mb-16"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">
                        {t.stats.title}
                    </span>
                    <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, rotateX: -90 }}
                            whileInView={{ opacity: 1, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                            className="relative group p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>

                                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {stat.value}
                                </div>
                                <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
                                <p className="text-gray-400 text-xs font-light">{stat.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustStats;
