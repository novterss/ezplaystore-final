'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen text-white relative">
            <div className="container mx-auto px-4 pt-28 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <Lock className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl md:text-4xl font-bold">{t.privacyPage.title}</h1>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                        {t.privacyPage.sections.map((section: { title: string; content: string }, index: number) => (
                            <div key={index} className="space-y-2">
                                <h2 className="text-lg font-bold text-green-400">{section.title}</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
                            </div>
                        ))}

                        <div className="pt-6 border-t border-white/10 text-sm text-gray-500">
                            <p>{t.privacyPage.lastUpdated}: {t.privacyPage.date}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
