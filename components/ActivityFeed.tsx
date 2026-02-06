'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FAKE_NAMES = [
    // lnwZa Style
    'lnwZa007', 'lnwTrue', 'X_Killer_X', 'SlayerKung', 'DarkDragonTH',
    'SniperGod', 'InwKhing', 'PRO_PlayerTH', 'NoobMaster69', 'KakMakKub',
    'TepMak', 'YoodKeng', 'lnwPuen', 'ZaaSudSoi', 'DekVanBKK',
    'PikachuTH', 'ShadowMon', 'RockerTH', 'IndyZa', 'KrianJung',

    // Foodie Style
    'MhooGroob', 'KaPraoKai', 'KaiDaoMaiSook', 'ChaYen', 'MooPing',
    'NumTok', 'SomTumPoo', 'KhaoManGai', 'RotiSaiMai', 'LookChinPing',
    'PingYang', 'ShabuLover', 'MhooKata', 'SalmonDong', 'KolaMarch',
    'PepsiThai', 'LodeChong', 'FoiThong', 'KaNomJeeb', 'SaLaPao',

    // Minimal
    'Boss', 'Fluke', 'Nine', 'Tent', 'Bank', 'Golf', 'Game', 'Guy', 'Gun', 'Ohm',
    'Jay', 'Beam', 'Boat', 'Bas', 'Ball', 'Big', 'Benz', 'Best', 'Book', 'Beer',

    // Royal/Mystic
    'Payak', 'Singha', 'Krating', 'Mungkorn', 'Plerng', 'Wayu', 'Mork', 'Hin',
    'Kla', 'Chana', 'SiamWarrior', 'BangRajan', 'Hanuman', 'Tosakan',
    'SueaDam', 'FahKamRam', 'Assawin', 'JomMarn', 'NakRop', 'PhuPha',

    // Meme/Troll
    'LungTu', 'SomchaiMaiDee', 'SomsakVer', 'EieiZa', 'JubJub',
    'UngUng', 'NgungNgung', 'TumMaiTongChueNi', 'MaiMeeChue', 'User1234',
    'TestSystem', 'HelloWorld', 'Error404', 'Ping999', 'LagSudSud',
    'NetTot', 'WifiMhor', 'MhorMai', 'PaiNonNa', 'SudYodKrupPe'
];

const PURCHASE_ITEMS = [
    { name: 'Steam Library Unlocker', type: 'purchase' },
    { name: 'EzSpoofer HWID', type: 'purchase' }
];

const DOWNLOAD_ITEMS = [
    { name: 'After Effects 2026', type: 'download' },
    { name: 'Premiere Pro 2026', type: 'download' },
    { name: 'Photoshop 2026', type: 'download' },
    { name: 'Windows 11 Pro', type: 'download' },
    { name: 'Microsoft 365', type: 'download' },
    { name: 'Sapphire Plugin', type: 'download' },
    { name: 'Twixtor Pro', type: 'download' },
    { name: 'Deep Glow', type: 'download' },
    { name: 'Flow Plugin', type: 'download' },
    { name: 'GifGun Script', type: 'download' },
    { name: 'RSMB Pro', type: 'download' },
    { name: 'Magic Bullet Looks', type: 'download' }
];

export default function ActivityFeed() {
    const { t } = useLanguage();
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random();

            // Logic: 
            // 0.00 - 0.35 = Download (35% chance)
            // 0.35 - 0.40 = Purchase (5% chance) => Very rare as requested
            // 0.40 - 1.00 = Nothing

            if (rand < 0.35) {
                // Spawn Download
                const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
                const item = DOWNLOAD_ITEMS[Math.floor(Math.random() * DOWNLOAD_ITEMS.length)];
                const id = Date.now();
                setActivities(prev => [{ id, name, item: { ...item, type: 'download' } }, ...prev].slice(0, 3));
            } else if (rand < 0.40) {
                // Spawn Purchase
                const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
                const item = PURCHASE_ITEMS[Math.floor(Math.random() * PURCHASE_ITEMS.length)];
                const id = Date.now();
                setActivities(prev => [{ id, name, item: { ...item, type: 'purchase' } }, ...prev].slice(0, 3));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-24 left-6 z-40 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {activities.map((activity) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg flex items-center gap-3 w-64 pointer-events-auto"
                    >
                        <div className={`p-2 rounded-full ${activity.item.type === 'purchase' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'}`}>
                            {activity.item.type === 'purchase' ? <ShoppingBag className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-white truncate">
                                <span className="font-bold text-primary">{activity.name}</span>
                            </p>
                            <p className="text-[10px] text-gray-400 truncate">
                                {activity.item.type === 'purchase' ? t.activity.purchased : t.activity.downloaded} <span className="text-white">{activity.item.name}</span>
                            </p>
                        </div>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{t.activity.justNow}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
