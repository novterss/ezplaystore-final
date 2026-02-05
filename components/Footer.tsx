import { Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Modal from './Modal';

const Footer = () => {
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    return (
        <footer className="bg-black/90 text-white py-12 border-t border-white/10 relative z-10 backdrop-blur-md">
            {/* Terms Modal */}
            <Modal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
                title="นโยบายการคืนเงินและข้อตกลง"
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
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                                <span className="font-bold text-primary text-xl">EZ</span>
                            </div>
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                EzplaystoreTh
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                            คลังแสงเกมและโปรแกรมระดับเทพ จบปัญหาเกมแพง
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="#shop" className="hover:text-primary transition-colors">Premium Shop</Link></li>
                            <li><Link href="#free-zone" className="hover:text-primary transition-colors">Free Zone</Link></li>
                            <li>
                                <button
                                    onClick={() => setIsTermsOpen(true)}
                                    className="hover:text-primary transition-colors"
                                >
                                    นโยบายการคืนเงิน
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://discord.gg/YMZXUhuMcV"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-[#5865F2]/10 flex items-center justify-center hover:bg-[#5865F2] text-[#5865F2] hover:text-white transition-all hover:scale-110"
                        >
                            <img src="/images/discord.jpg" alt="Discord" className="w-6 h-6 rounded-full" />
                        </a>
                        <a
                            href="https://facebook.com/EzplaystoreTh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all hover:scale-110"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a
                            href="https://youtube.com/@novterss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center hover:bg-[#FF0000] text-[#FF0000] hover:text-white transition-all hover:scale-110"
                        >
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 mt-8 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} EzplaystoreTh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
