'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"; // เรียกใช้ระบบล็อกอิน
import { usePathname } from 'next/navigation';

import { useState } from 'react';
import { Menu, X, Globe, ChevronDown, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import WishlistButton from './WishlistButton';
import { premiumProducts } from '@/data/products';
import { freeCategories } from '@/data/freeZoneData';

const Navbar = () => {
    const { data: session } = useSession(); // ดึงข้อมูลผู้ใช้
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const pathname = usePathname();

    const languages = [
        { code: 'TH', label: 'THAI', flag: '/images/Me.png' }, // Using placeholder or verify flags later if needed, mostly text for now is fine
        { code: 'EN', label: 'ENGLISH', flag: '/images/Au.png' },
        { code: 'CN', label: 'CHINESE', flag: '/images/Me.png' },
        { code: 'JP', label: 'JAPANESE', flag: '/images/Me.png' }
    ] as const;

    const MENU_ICONS: Record<string, React.ReactNode> = {
        Home: <div className="w-4 h-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>,
        ShoppingBag: <div className="w-4 h-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div>,
        Gift: <div className="w-4 h-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"></path></svg></div>,
        Info: <div className="w-4 h-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>,
        Activity: <div className="w-4 h-4"><Activity className="w-4 h-4" /></div>
    };

    const leftMenuItems = [
        { name: t.navbar.home, href: '/', icon: MENU_ICONS.Home },
        { name: t.navbar.status, href: '/status', icon: MENU_ICONS.Activity },
        { name: t.navbar.shop, href: '/#shop', icon: MENU_ICONS.ShoppingBag },
    ];

    const rightMenuItems = [
        { name: t.navbar.freeZone, href: '/free-zone', icon: MENU_ICONS.Gift },
        { name: t.navbar.about, href: '/about', icon: MENU_ICONS.Info }
    ];

    const allMenuItems = [...leftMenuItems, ...rightMenuItems];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
            <div className="backdrop-blur-2xl bg-black/60 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] px-6 py-3 flex items-center justify-between hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all">

                {/* Logo */}
                {/* Logo (Centered) */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 group z-10">
                    <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full border-2 border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform duration-300 animate-pulse-slow">
                        <Image src="/images/ezicon.png" alt="Logo" fill className="object-cover" />
                    </div>
                </Link>

                {/* Mobile Logo (Left) */}
                <Link href="/" className="md:hidden flex items-center gap-2">
                    <div className="relative w-[80px] h-[35px]">
                        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                </Link>

                {/* Left Menu Links */}
                <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-md mr-32">
                    {leftMenuItems.map((link, i) => {
                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href) && link.href !== '/';
                        return (
                            <Link
                                key={i}
                                href={link.href}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] whitespace-nowrap group ${isActive ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                            >
                                <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{link.icon}</span>
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4"> {/* Reduced gap since we have right menu links now */}

                    {/* Right Menu Links */}
                    <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-md mr-2 ml-32">
                        {rightMenuItems.map((link, i) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href) && link.href !== '/';
                            return (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] whitespace-nowrap group ${isActive ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                                >
                                    <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{link.icon}</span>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Search & Wishlist */}
                    <div className="hidden md:flex items-center gap-2">
                        <SearchBar products={[
                            ...premiumProducts.map((p: { id: number; name: string; price: number }) => ({ id: p.id, name: p.name, type: 'premium' as const, price: p.price })),
                            ...freeCategories.flatMap((cat: { items: { name: string }[] }, catIndex: number) =>
                                cat.items.map((p: { name: string }, i: number) => ({ id: catIndex * 100 + i, name: p.name, type: 'free' as const }))
                            )
                        ]} />
                        <WishlistButton />
                    </div>

                    {/* Language Switcher */}
                    <div className="relative hidden md:block">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-bold text-gray-300 hover:text-white"
                        >
                            <Globe className="w-4 h-4" />
                            <span>{lang}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {langMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-2 w-32 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl py-1"
                                >
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => {
                                                setLang(l.code as any);
                                                setLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors flex items-center justify-between ${lang === l.code ? 'text-primary bg-primary/10' : 'text-gray-400'}`}
                                        >
                                            {l.label}
                                            {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Login / Profile Section */}
                    {session ? (
                        <Link href="/profile" className="flex items-center gap-3 bg-purple-900/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-purple-500/50 hover:bg-purple-900/60 transition-colors cursor-pointer group">
                            <div className="flex flex-col text-right mr-1">
                                <span className="text-xs font-bold text-purple-200 group-hover:text-white transition-colors">{session.user?.name}</span>
                                <button onClick={(e) => { e.preventDefault(); signOut(); }} className="text-[10px] text-red-400 hover:text-red-200 text-right transition-colors z-10 relative">{t.navbar.logout}</button>
                            </div>
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] group-hover:scale-105 transition-transform">
                                <Image
                                    src={session.user?.image || "/images/logo.png"}
                                    alt="Profile"
                                    width={36}
                                    height={36}
                                />
                            </div>
                        </Link>
                    ) : (
                        <button
                            onClick={() => signIn('discord')}
                            className="hidden sm:flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] px-5 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(88,101,242,0.4)] hover:shadow-[0_0_25px_rgba(88,101,242,0.6)] hover:scale-105 active:scale-95 text-sm"
                        >
                            {/* Discord Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                            </svg>
                            {t.navbar.login}
                        </button>
                    )}

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center gap-2">
                        <WishlistButton />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full mt-2 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 md:hidden flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2 fade-in">
                    {allMenuItems.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 rounded-xl text-center font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/5 active:scale-95"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Language Switcher Mobile */}
                    <div className="grid grid-cols-4 gap-2 mt-2 p-2 bg-white/5 rounded-xl">
                        {languages.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => setLang(l.code as any)}
                                className={`text-xs py-2 rounded-lg font-bold transition-all ${lang === l.code ? 'bg-primary text-black' : 'text-gray-400 hover:bg-white/5'}`}
                            >
                                {l.code}
                            </button>
                        ))}
                    </div>

                    {!session && (
                        <button
                            onClick={() => signIn('discord')}
                            className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] px-4 py-3 rounded-xl font-bold transition-all text-white mt-2"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                            </svg>
                            {t.navbar.login}
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;