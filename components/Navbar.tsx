'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"; // เรียกใช้ระบบล็อกอิน

const Navbar = () => {
    const { data: session } = useSession(); // ดึงข้อมูลผู้ใช้

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
            <div className="backdrop-blur-2xl bg-black/60 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] px-6 py-3 flex items-center justify-between hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-[45px] h-[45px] overflow-hidden rounded-full border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300">
                        <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent hidden sm:block group-hover:text-white transition-colors">
                        EzPlayStoreTH
                    </span>
                </Link>

                {/* Menu Links */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
                    {[
                        { name: 'Home', href: '/' },
                        { name: 'Shop', href: '#shop' },
                        { name: 'Free Zone', href: '/free-zone' }
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-6 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Login / Profile Section */}
                <div>
                    {session ? (
                        <div className="flex items-center gap-3 bg-purple-900/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-purple-500/50 hover:bg-purple-900/60 transition-colors cursor-pointer group">
                            <div className="flex flex-col text-right mr-1">
                                <span className="text-xs font-bold text-purple-200 group-hover:text-white transition-colors">{session.user?.name}</span>
                                <button onClick={() => signOut()} className="text-[10px] text-red-400 hover:text-red-200 text-right transition-colors">Logout</button>
                            </div>
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] group-hover:scale-105 transition-transform">
                                <Image
                                    src={session.user?.image || "/images/logo.png"}
                                    alt="Profile"
                                    width={36}
                                    height={36}
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn('discord')}
                            className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] px-5 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(88,101,242,0.4)] hover:shadow-[0_0_25px_rgba(88,101,242,0.6)] hover:scale-105 active:scale-95 text-sm"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                            </svg>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;