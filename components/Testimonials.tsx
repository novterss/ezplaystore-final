'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';



const Testimonials = () => {
    const { t } = useLanguage();

    const testimonials = t.testimonials.reviews || [];

    return (
        <section className="container mx-auto px-4 py-24 relative z-10">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center p-3 mb-6 bg-white/5 rounded-2xl backdrop-blur-md border border-white/5">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-700 overflow-hidden">
                                <Image src={`/images/reze${i === 1 ? '' : i === 2 ? '2' : '3'}.jpg`} alt="User" width={32} height={32} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-300">Trusted by 10,000+ Users</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    {t.testimonials.title} <span className="text-gray-500 text-3xl block md:inline mt-2 md:mt-0 font-light">{t.testimonials.subtitle}</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/30 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative hover:bg-white/5 transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 group"
                    >
                        {/* Quote Icon Background */}
                        <div className="absolute top-6 right-6 text-7xl text-white/5 font-serif leading-none select-none pointer-events-none group-hover:text-purple-500/10 transition-colors">
                            "
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-lg group-hover:border-purple-500 transition-colors">
                                <Image
                                    src={item.image}
                                    alt={item.user}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{item.user}</h3>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed italic relative z-10 group-hover:text-white transition-colors">
                            "{item.comment}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
