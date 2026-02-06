'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Shield, Download, Users, Clock, Activity, RefreshCw, TrendingUp, BarChart3 } from 'lucide-react';
import DownloadChart from '@/components/DownloadChart';

const ADMIN_EMAILS = ['openfivem123@gmail.com', 'melodazzzzee@gmail.com', 'ezplaystoreth@gmail.com'];

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({ users: 0, downloads: 0, activeToday: 0, members: 0 });
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [chartData, setChartData] = useState<{ name: string; downloads: number; users: number }[]>([]);

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
        setIsRefreshing(true);
        try {
            // Fetch all users
            const { data: allUsers } = await supabase.from('users').select('*');

            if (allUsers) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const downloadCount = allUsers.reduce((acc, user) => acc + (user.downloads || 0), 0);
                const activeToday = allUsers.filter(u => u.last_login && new Date(u.last_login) >= today).length;
                const memberCount = allUsers.filter(u => u.is_member).length;

                setStats({
                    users: allUsers.length,
                    downloads: downloadCount,
                    activeToday: activeToday,
                    members: memberCount
                });
            }

            // 3. Recent Users
            const { data: users } = await supabase
                .from('users')
                .select('*')
                .order('last_login', { ascending: false })
                .limit(10);

            setRecentUsers(users || []);

            // 4. Generate chart data (last 7 days mock data)
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date().getDay();
            const mockChartData = Array.from({ length: 7 }, (_, i) => {
                const dayIndex = (today - 6 + i + 7) % 7;
                return {
                    name: days[dayIndex],
                    downloads: Math.floor(Math.random() * 50) + 10,
                    users: Math.floor(Math.random() * 20) + 5
                };
            });
            setChartData(mockChartData);
        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (status === 'loading') {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-primary text-xl animate-pulse">Loading Dashboard...</div>
            </main>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">กรุณาเข้าสู่ระบบ</h1>
                    <p className="text-gray-400">คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้านี้</p>
                </div>
            </main>
        );
    }

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-gray-400">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-12 bg-[#050505] text-white">
            <Navbar />

            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Shield className="text-red-500" /> Admin Dashboard
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                <Users className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.users}</div>
                                <div className="text-sm text-gray-400">Total Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                                <Download className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.downloads}</div>
                                <div className="text-sm text-gray-400">Total Downloads</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500">
                                <Activity className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.activeToday}</div>
                                <div className="text-sm text-gray-400">Active Today</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-500">
                                <Shield className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.members}</div>
                                <div className="text-sm text-gray-400">Discord Members</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics Chart */}
                {chartData.length > 0 && (
                    <div className="mb-8">
                        <DownloadChart
                            data={chartData}
                            type="area"
                            height={250}
                            title="📊 Weekly Activity"
                        />
                    </div>
                )}

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
