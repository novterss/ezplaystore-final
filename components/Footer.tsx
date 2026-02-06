'use client';

import { Facebook, Youtube, MessageCircle, MapPin, Mail, Shield, CheckCircle, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <footer className="relative pt-20 pb-10 overflow-hidden">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Terms Modal */}
            <Modal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
                title={t.footer.policy}
            >
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        1. <span className="text-red-400 font-bold">สินค้าประเภท Digital Product ซื้อแล้วไม่รับคืนเงินทุกกรณี</span> (No Refunds). กรุณาเช็คสเปคก่อนสั่งซื้อ
                    </p>
                    <p className="text-sm leading-relaxed">
                        2. หากสินค้ามีปัญหา ทีมงานพร้อมแก้ไขให้ผ่าน TeamViewer/AnyDesk จนกว่าจะใช้งานได้
                    </p>
                    <p className="text-sm leading-relaxed">
                        3. การใช้งานซอฟต์แวร์ช่วยเล่นมีความเสี่ยง ผู้ใช้งานต้องยอมรับความเสี่ยงด้วยตนเอง ทางร้านไม่รับผิดชอบกรณี ID ถูกแบน
                    </p>
                </div>
            </Modal>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                <Image
                                    src="/images/logo.png"
                                    alt="EzplaystoreTh Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">EzplaystoreTh</h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-xs text-primary font-bold tracking-widest uppercase">{t.footer.madeIn}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.footer.brandDescription}
                        </p>

                        <div className="flex gap-4 pt-2">
                            <SocialLink href="https://discord.gg/YMZXUhuMcV" icon={<Image src="/images/discord.jpg" alt="Discord" width={20} height={20} className="rounded-full" />} color="bg-[#5865F2]" />
                            <SocialLink href="https://www.facebook.com/profile.php?id=61578707159949" icon={<Facebook className="w-5 h-5" />} color="bg-[#1877F2]" />
                            <SocialLink href="https://youtube.com/@novterss" icon={<Youtube className="w-5 h-5" />} color="bg-[#FF0000]" />
                        </div>
                    </div>

                    {/* Sitemap */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            {t.footer.sitemap}
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> {t.navbar.home}</Link></li>
                            <li><Link href="#shop" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> {t.navbar.shop}</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> {t.footer.blogLink}</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> {t.footer.contactLink}</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> {t.footer.termsLink}</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> {t.footer.privacyLink}</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                            {t.footer.help}
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400 mb-8">
                            <li>
                                <button onClick={() => setIsTermsOpen(true)} className="hover:text-purple-400 transition-colors flex items-center gap-2 text-left">
                                    <Shield className="w-4 h-4" /> {t.footer.policy}
                                </button>
                            </li>
                            <li>
                                <Link href="https://discord.gg/YMZXUhuMcV" target="_blank" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> {t.footer.contact}
                                </Link>
                            </li>
                            <li>
                                <a href="https://discord.gg/YMZXUhuMcV" target="_blank" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> {t.footer.adminContact}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" /> {t.footer.safe}
                            </li>
                        </ul>

                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                            {t.footer.paymentMethods}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-white/5 border border-white/10 p-2 rounded-lg flex items-center justify-center w-12 h-12" title={t.footer.truemoney}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/images/truemoney.jpg"
                                        alt="TrueMoney"
                                        fill
                                        className="object-contain rounded"
                                    />
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-2 rounded-lg flex items-center justify-center w-12 h-12" title={t.footer.promptpay}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/images/promptpay.png"
                                        alt="PromptPay"
                                        fill
                                        className="object-contain rounded"
                                    />
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-2 rounded-lg flex items-center justify-center w-12 h-12" title={t.footer.creditcard}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/images/creditcard.png"
                                        alt="Credit Card"
                                        fill
                                        className="object-contain rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                            {t.footer.contact}
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium">{t.footer.emailSupport}</span>
                                    <span className="text-xs break-all">meliodazzzzeiei@gmail.com</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-indigo-400">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium">{t.footer.location}</span>
                                    <span className="text-xs">{t.footer.bangkok}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} <span className="text-white font-medium">EzplaystoreTh</span>. {t.footer.rights}
                    </p>
                    <div className="flex gap-6 text-xs text-gray-600 font-medium tracking-widest uppercase">
                        <span>{t.footer.secure}</span>
                        <span>{t.footer.delivery}</span>
                        <span>{t.footer.support}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon, color }: any) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${color} hover:scale-110 transition-transform shadow-lg overflow-hidden`}
    >
        {icon}
    </a>
);

export default Footer;
