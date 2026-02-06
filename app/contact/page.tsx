'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Instagram, Mail, Send, Check } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate sending (replace with actual webhook)
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');

        setTimeout(() => {
            setStatus('idle');
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <main className="min-h-screen text-white relative">
            <div className="container mx-auto px-4 pt-28 pb-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contactPage.title}</h1>
                    <p className="text-gray-400">{t.contactPage.subtitle}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                    >
                        <h2 className="text-xl font-bold mb-6">{t.contactPage.formTitle}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">{t.contactPage.name}</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">{t.contactPage.email}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">{t.contactPage.message}</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${status === 'success'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-primary hover:bg-primary/80 text-white'
                                    }`}
                            >
                                {status === 'idle' && <><Send className="w-5 h-5" />{t.contactPage.send}</>}
                                {status === 'sending' && t.contactPage.sending}
                                {status === 'success' && <><Check className="w-5 h-5" />{t.contactPage.success}</>}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Methods */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {/* Discord */}
                        <a
                            href="https://discord.gg/YMZXUhuMcV"
                            target="_blank"
                            className="block bg-[#5865F2]/20 border border-[#5865F2]/30 rounded-2xl p-6 hover:border-[#5865F2] transition-all group backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center">
                                    <Image src="/images/discord.jpg" alt="Discord" width={28} height={28} className="rounded" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{t.contactPage.discordTitle}</h3>
                                    <p className="text-sm text-gray-400">{t.contactPage.discordDesc}</p>
                                </div>
                            </div>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/kubkannn"
                            target="_blank"
                            className="block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/30 rounded-2xl p-6 hover:border-pink-500 transition-all group backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <Instagram className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{t.contactPage.instagramTitle}</h3>
                                    <p className="text-sm text-gray-400">{t.contactPage.instagramDesc}</p>
                                    <p className="text-sm text-pink-400 mt-1">@kubkannn</p>
                                </div>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:meliodazzzzeiei@gmail.com"
                            className="block bg-blue-500/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500 transition-all group backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{t.contactPage.emailTitle}</h3>
                                    <p className="text-sm text-gray-400">{t.contactPage.emailDesc}</p>
                                    <p className="text-sm text-blue-400 mt-1">meliodazzzzeiei@gmail.com</p>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
