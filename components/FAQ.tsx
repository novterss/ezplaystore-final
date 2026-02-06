'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ = () => {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const questions = t.faq.questions || [];

    const filtered = questions.filter(item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] -z-10" />

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <HelpCircle className="w-8 h-8 text-primary" />
                        {t.faq.title}
                    </h2>

                    {/* Search Bar */}
                    <div className="relative max-w-lg mx-auto mt-8 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder={t.faq.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-lg placeholder:text-gray-600"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence>
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden hover:border-white/20 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                    >
                                        <span className="font-bold text-lg text-gray-200">{item.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                                    {item.a.split('\n').map((line, i) => (
                                                        <p key={i} className="mb-1">{line}</p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-gray-500"
                            >
                                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>{t.faq.noResults}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
