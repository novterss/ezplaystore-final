'use client';

import { ShieldCheck, BookOpen, Zap, Users, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Features = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: ShieldCheck,
            title: t.features.safe,
            desc: t.features.safeDesc,
            color: 'text-green-400'
        },
        {
            icon: BookOpen,
            title: t.features.teach,
            desc: t.features.teachDesc,
            color: 'text-blue-400'
        },
        {
            icon: Zap,
            title: t.features.fast,
            desc: t.features.fastDesc,
            color: 'text-yellow-400'
        },
        {
            icon: Users,
            title: t.features.community,
            desc: t.features.communityDesc,
            color: 'text-purple-400'
        }
    ];

    return (
        <section className="container mx-auto px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all group backdrop-blur-sm"
                    >
                        <feature.icon className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16 flex flex-wrap justify-center gap-6"
            >
                <a
                    href="https://discord.gg/YMZXUhuMcV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#5865F2]/50 hover:-translate-y-1"
                >
                    <img src="/images/discord.jpg" className="w-6 h-6 rounded-full" alt="Discord" />
                    {t.features.join}
                </a>
                <a
                    href="https://www.facebook.com/profile.php?id=61578707159949"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#1877F2]/50 hover:-translate-y-1"
                >
                    <Facebook className="w-6 h-6" />
                    {t.features.fb}
                </a>
                <a
                    href="https://youtube.com/@novterss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#FF0000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#FF0000]/50 hover:-translate-y-1"
                >
                    <Youtube className="w-6 h-6" />
                    {t.features.yt}
                </a>
            </motion.div>
        </section>
    );
};

export default Features;
