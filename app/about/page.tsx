'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Users, Star, Medal } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    const team = [
        {
            name: "novterss",
            role: "Developer / Founder",
            image: "/images/novterss.jpg",
            description: t.aboutPage.novterssBio
        },
        {
            name: "only god can judge me",
            role: "Co-Founder / Support",
            image: "/images/nampingz.jpg",
            description: t.aboutPage.dekdeeBio
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-6xl mx-auto space-y-24">

                {/* Hero Section */}
                <section className="text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-56 h-56 mx-auto mb-8 relative animate-float"
                    >
                        <Image src="/images/ezhome.png" alt="Logo" fill className="object-contain" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent"
                    >
                        {t.aboutPage.title}
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl mx-auto space-y-6 text-gray-300 leading-relaxed text-lg"
                    >
                        <p>{t.aboutPage.description}</p>
                        <p>{t.aboutPage.description2}</p>
                    </motion.div>
                </section>

                {/* Team Section */}
                <section>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl font-bold text-center mb-12 text-primary"
                    >
                        {t.aboutPage.teamTitle}
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group hover:bg-white/10"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="relative shrink-0">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-primary transition-colors">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-3 -right-3 bg-black/80 border border-primary/50 rounded-lg px-2 py-1 text-[10px] text-primary font-bold shadow-lg">
                                            {member.name === 'novterss' ? 'DEV' : 'MOD'}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-gray-400 font-mono">
                                                {member.role}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-300 leading-relaxed text-justify">
                                            {member.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Values */}
                {/* <section className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                        <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h3 className="font-bold mb-2">100% Secure</h3>
                        <p className="text-sm text-gray-400">Every tool is tested daily.</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                        <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Instant Delivery</h3>
                        <p className="text-sm text-gray-400">Get your keys immediately.</p>
                    </div>
                    <div className="p-6 bg-black/40 rounded-xl border border-white/5">
                        <Users className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Community Driven</h3>
                        <p className="text-sm text-gray-400">We listen to our users.</p>
                    </div>
                </section> */}

            </div>
        </main>
    );
}
