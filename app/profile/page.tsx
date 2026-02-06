'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Clock, Download, Star, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dbUser, setDbUser] = useState<any>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }

        if (session?.user) {
            fetchUserData();
        }
    }, [status, session]);

    const fetchUserData = async () => {
        // Fetch extra data from Supabase if needed
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', session?.user?.email)
            .single();

        if (data) {
            // Fetch History separately
            const { data: history } = await supabase
                .from('download_logs')
                .select('*')
                .eq('user_email', session?.user?.email)
                .order('downloaded_at', { ascending: false })
                .limit(5);

            setDbUser({ ...data, download_history: history || [] });
        }
    };

    const { t } = useLanguage();

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
    }

    return (
        <main className="min-h-screen flex flex-col pt-24 pb-12 bg-[#050505]">

            <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />

                    {/* Logout Button */}
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-all border border-white/5 hover:border-red-500/30"
                        title={t.navbar.logout}
                    >
                        <LogOut className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/50 p-1 relative overflow-hidden">
                                {session?.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Profile"
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                                        <User className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-[#050505]" title="Online" />
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {session?.user?.name}
                            </h1>
                            <p className="text-gray-400 mb-4">{session?.user?.email}</p>

                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {/* Member Check Logic */}
                                {dbUser?.is_member ? (
                                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                                        <Shield className="w-3 h-3" /> {t.profile.verified}
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold border border-red-500/30 flex items-center gap-1 animate-pulse">
                                        <User className="w-3 h-3" /> {t.profile.notInServer}
                                    </span>
                                )}

                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-bold border border-yellow-500/30 flex items-center gap-1">
                                    <Star className="w-3 h-3" /> {t.profile.premium}
                                </span>
                            </div>

                            {/* Synced Roles List */}
                            {dbUser?.roles && dbUser.roles.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">{t.profile.roles}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Handle both old string[] and new object[] formats safely */}
                                        {dbUser.roles.map((role: any, index: number) => {
                                            const roleName = typeof role === 'string' ? role : role.name;
                                            const roleColor = typeof role === 'string' ? '#99aab5' : role.color;

                                            // Skip @everyone (usually same ID as Guild ID, or just filter out if needed)
                                            if (roleName === '@everyone') return null;

                                            return (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 rounded text-[10px] font-bold border border-white/10 shadow-sm"
                                                    style={{
                                                        backgroundColor: `${roleColor}20`, // 20% opacity
                                                        color: roleColor,
                                                        borderColor: `${roleColor}40`
                                                    }}
                                                >
                                                    {roleName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                <Download className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                    {dbUser?.downloads || 0}
                                </div>
                                <div className="text-xs text-gray-500">{t.profile.downloads}</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold">Active</div>
                                <div className="text-xs text-gray-500">{t.profile.status}</div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Content (Optional) */}
                    <div className="mt-12 border-t border-white/10 pt-8">
                        <h3 className="text-xl font-bold mb-4">{t.profile.activity}</h3>
                        <div className="space-y-3">
                            {/* Synced Activity Logs */}
                            <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-gray-300">{t.profile.lastLogin}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {dbUser?.last_login ? new Date(dbUser.last_login).toLocaleString() : 'N/A'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                                    <span className="text-gray-300">{t.profile.joined}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {dbUser?.created_at ? new Date(dbUser.created_at).toLocaleDateString() : t.profile.unknown}
                                </span>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        {t.profile.recent}
                    </h3>
                    {/* Download History Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="bg-white/10 p-2 rounded-lg">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            Download History
                        </h2>

                        <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/5">
                                <div className="col-span-6 md:col-span-5">File Name</div>
                                <div className="col-span-4 md:col-span-3">Date</div>
                                <div className="col-span-2 md:col-span-4 text-right">Action</div>
                            </div>

                            {dbUser?.download_history && dbUser.download_history.length > 0 ? (
                                dbUser.download_history.map((log: any, idx: number) => (
                                    <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <Download className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-white truncate">{log.file_name || 'Unknown File'}</span>
                                        </div>
                                        <div className="col-span-4 md:col-span-3 text-gray-400 text-sm">
                                            {new Date(log.downloaded_at).toLocaleDateString()}
                                        </div>
                                        <div className="col-span-2 md:col-span-4 flex justify-end">
                                            <button className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full transition-colors font-bold">
                                                Redownload
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    No download history found.
                                </div>
                            )}
                        </div>
                    </div>

                </motion.div>
            </div>
        </main >
    );
}
