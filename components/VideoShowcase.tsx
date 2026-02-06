'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VideoShowcase = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
                            {t.video.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg">{t.video.subtitle}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)] group"
                >
                    <iframe
                        src="https://www.youtube.com/embed/ikn_p31EkKY?rel=0"
                        title="Reze - Bomb Girl"
                        className="w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </motion.div>

                {/* Stats under video */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-center">
                    {[
                        { label: "Views", value: "70" },
                        { label: "Likes", value: "1" },
                        { label: "Comments", value: "1" },
                        { label: "Rating", value: "5.0/5" }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
