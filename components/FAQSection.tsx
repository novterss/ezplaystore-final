'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQSection() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const questions = t.faq?.questions || [];

    const filteredQuestions = questions.filter((item: any) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-20 relative px-4" id="faq">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="p-2 bg-white/5 rounded-lg text-primary">
                            <HelpCircle className="w-6 h-6" />
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                        FAQ <span className="text-primary">CENTER</span>
                    </h2>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t.faq?.search || "Search questions..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((item: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-bold text-white text-lg pr-8">{item.q}</span>
                                    <div className={`p-2 rounded-full transition-colors ${activeIndex === idx ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}`}>
                                        {activeIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5 mt-2">
                                                <div className="pt-4 whitespace-pre-line">
                                                    {item.a}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            {t.faq?.noResults || "No questions found matching your search."}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
