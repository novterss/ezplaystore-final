'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Shield, Download, Users, Clock } from 'lucide-react';

const ADMIN_EMAILS = ['openfivem123@gmail.com', 'admin@example.com', 'ezplaystoreth@gmail.com'];

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({ users: 0, downloads: 0 });
    const [recentUsers, setRecentUsers] = useState<any[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (session?.user?.email && !ADMIN_EMAILS.includes(session.user.email)) {
            router.push('/'); // Kick non-admins
        } else if (session?.user) {
            fetchStats();
        }
    }, [status, session]);

    const fetchStats = async () => {
        // 1. Total Users
        const { count: userCount } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });

        // 2. Total Downloads (Sum of downloads column)
        const { data: allUsers } = await supabase.from('users').select('downloads');
        const downloadCount = allUsers?.reduce((acc, user) => acc + (user.downloads || 0), 0) || 0;

        setStats({ users: userCount || 0, downloads: downloadCount });

        // 3. Recent Users
        const { data: users } = await supabase
            .from('users')
            .select('*')
            .order('last_login', { ascending: false })
            .limit(10);

        setRecentUsers(users || []);
    };

    if (status === 'loading') return <div className="text-white p-10">Loading...</div>;

    if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) return null;

    return (
        <main className="min-h-screen pt-24 pb-12 bg-[#050505] text-white">
            <Navbar />

            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Shield className="text-red-500" /> Admin Dashboard
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{stats.users}</div>
                                <div className="text-gray-400">Total Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                                <Download className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold">{stats.downloads}</div>
                                <div className="text-gray-400">Total Downloads</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-500">
                                <Clock className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">System Status</div>
                                <div className="text-xl font-bold text-green-400">Operational</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Users Table */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Active Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400">
                                <tr>
                                    <th className="p-3 rounded-l-lg">User</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Membership</th>
                                    <th className="p-3">Downloads</th>
                                    <th className="p-3 rounded-r-lg">Last Login</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {recentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 flex items-center gap-3">
                                            {user.image && <img src={user.image} className="w-8 h-8 rounded-full" />}
                                            <span className="font-bold">{user.name}</span>
                                        </td>
                                        <td className="p-3 text-gray-400 text-sm">{user.email}</td>
                                        <td className="p-3">
                                            {user.is_member ? (
                                                <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-bold">Verified</span>
                                            ) : (
                                                <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs">Unverified</span>
                                            )}
                                        </td>
                                        <td className="p-3 font-mono">{user.downloads || 0}</td>
                                        <td className="p-3 text-sm text-gray-500">
                                            {new Date(user.last_login).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
