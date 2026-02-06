'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
    id: number;
    title: { TH: string; EN: string; CN: string; JP: string };
    excerpt: { TH: string; EN: string; CN: string; JP: string };
    date: string;
    readTime: string;
    category: string;
    featured?: boolean;
}

// Blog posts with all 4 language translations
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: {
            TH: 'อัพเดทใหม่! โปรแกรม Adobe เวอร์ชั่นล่าสุด 2025',
            EN: 'New Update! Latest Adobe Software 2025 Version',
            CN: '新更新！最新 Adobe 软件 2025 版本',
            JP: '新アップデート！最新の Adobe ソフトウェア 2025 バージョン'
        },
        excerpt: {
            TH: 'เราได้อัพเดท Adobe Creative Cloud เวอร์ชั่นใหม่ทั้งหมด รวมถึง Premiere Pro, After Effects, Photoshop และอื่นๆ อีกมากมาย',
            EN: 'We have updated all Adobe Creative Cloud latest versions including Premiere Pro, After Effects, Photoshop and more.',
            CN: '我们已更新所有 Adobe Creative Cloud 最新版本，包括 Premiere Pro、After Effects、Photoshop 等等。',
            JP: 'Premiere Pro、After Effects、Photoshop などを含む Adobe Creative Cloud の最新バージョンをすべて更新しました。'
        },
        date: '2026-02-07',
        category: 'updates',
        readTime: '3',
        featured: true
    },
    {
        id: 2,
        title: {
            TH: 'วิธีติดตั้งโปรแกรม Adobe อย่างถูกต้อง',
            EN: 'How to Install Adobe Software Correctly',
            CN: '如何正确安装 Adobe 软件',
            JP: 'Adobe ソフトウェアを正しくインストールする方法'
        },
        excerpt: {
            TH: 'คู่มือการติดตั้งโปรแกรม Adobe ทั้งหมด ตั้งแต่ขั้นตอนแรกจนเสร็จสมบูรณ์ พร้อมวิธีแก้ปัญหาที่พบบ่อย',
            EN: 'Complete guide to install all Adobe programs from first step to completion, with common troubleshooting tips.',
            CN: '从第一步到完成的完整 Adobe 程序安装指南，附常见问题解决技巧。',
            JP: '最初のステップから完了までの Adobe プログラムの完全なインストールガイドと、よくあるトラブルシューティングのヒント。'
        },
        date: '2026-02-05',
        category: 'tutorials',
        readTime: '5'
    },
    {
        id: 3,
        title: {
            TH: 'โปรโมชั่นพิเศษ! ลด 20% ทุกสินค้า',
            EN: 'Special Promotion! 20% Off All Products',
            CN: '特别促销！所有产品八折优惠',
            JP: '特別プロモーション！全商品 20% オフ'
        },
        excerpt: {
            TH: 'ฉลองครบรอบ 1 ปี EzplaystoreTH ลดราคาพิเศษทุกสินค้า 20% ตั้งแต่วันนี้ถึงสิ้นเดือน',
            EN: 'Celebrating 1 year anniversary of EzplaystoreTH with 20% off all products from today until end of month.',
            CN: '庆祝 EzplaystoreTH 成立一周年，从今天起到月底所有产品八折优惠。',
            JP: 'EzplaystoreTH の 1 周年を記念して、今日から月末まで全商品 20% オフ。'
        },
        date: '2026-02-01',
        category: 'promotions',
        readTime: '2'
    },
    {
        id: 4,
        title: {
            TH: 'Free Zone เปิดให้ดาวน์โหลดแล้ว!',
            EN: 'Free Zone Now Available for Download!',
            CN: '免费区现已开放下载！',
            JP: 'フリーゾーンがダウンロード可能になりました！'
        },
        excerpt: {
            TH: 'ใหม่! โซนดาวน์โหลดฟรีสำหรับสมาชิก Discord เราเพิ่มปลั๊กอินและเอฟเฟ็คฟรีมากกว่า 50 รายการ',
            EN: 'New! Free download zone for Discord members. We added more than 50 free plugins and effects.',
            CN: '新功能！Discord 会员免费下载区。我们添加了 50 多个免费插件和特效。',
            JP: '新機能！Discord メンバー向け無料ダウンロードゾーン。50 以上の無料プラグインとエフェクトを追加しました。'
        },
        date: '2026-01-28',
        category: 'announcements',
        readTime: '2'
    },
    {
        id: 5,
        title: {
            TH: 'Tips & Tricks: เทคนิคตัดต่อวิดีโอให้เร็วขึ้น',
            EN: 'Tips & Tricks: Speed Up Your Video Editing',
            CN: '技巧与窍门：加快视频编辑速度',
            JP: 'ヒントとコツ：動画編集を高速化する方法'
        },
        excerpt: {
            TH: 'เทคนิคการตัดต่อวิดีโอใน Premiere Pro ให้เร็วขึ้น 2 เท่า พร้อมปลั๊กอินที่แนะนำ',
            EN: 'Speed up your video editing in Premiere Pro by 2x with recommended plugins and shortcuts.',
            CN: '使用推荐的插件和快捷键，在 Premiere Pro 中将视频编辑速度提高 2 倍。',
            JP: 'おすすめのプラグインとショートカットで、Premiere Pro での動画編集速度を 2 倍に。'
        },
        date: '2026-01-25',
        category: 'tutorials',
        readTime: '4'
    }
];

export default function BlogPage() {
    const { t, lang } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { key: 'all', label: t.blogPage.categories.all },
        { key: 'updates', label: t.blogPage.categories.updates },
        { key: 'tutorials', label: t.blogPage.categories.tutorials },
        { key: 'promotions', label: t.blogPage.categories.promotions },
        { key: 'announcements', label: t.blogPage.categories.announcements }
    ];

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'updates': return 'bg-blue-500/20 text-blue-400';
            case 'tutorials': return 'bg-green-500/20 text-green-400';
            case 'promotions': return 'bg-yellow-500/20 text-yellow-400';
            case 'announcements': return 'bg-purple-500/20 text-purple-400';
            default: return 'bg-primary/20 text-primary';
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'updates': return t.blogPage.categories.updates;
            case 'tutorials': return t.blogPage.categories.tutorials;
            case 'promotions': return t.blogPage.categories.promotions;
            case 'announcements': return t.blogPage.categories.announcements;
            default: return cat;
        }
    };

    const getTitle = (post: BlogPost) => post.title[lang as keyof typeof post.title] || post.title.EN;
    const getExcerpt = (post: BlogPost) => post.excerpt[lang as keyof typeof post.excerpt] || post.excerpt.EN;
    const getReadTimeText = () => {
        switch (lang) {
            case 'TH': return 'นาที';
            case 'CN': return '分钟';
            case 'JP': return '分';
            default: return 'min';
        }
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t.blogPage.title}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t.blogPage.subtitle}
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.key
                                ? 'bg-primary text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Post */}
                {selectedCategory === 'all' && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">{t.blogPage.featured}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(featuredPost.category)}`}>
                                    {getCategoryLabel(featuredPost.category)}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">{getTitle(featuredPost)}</h2>
                            <p className="text-gray-300 mb-6">{getExcerpt(featuredPost)}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(featuredPost.date).toLocaleDateString('th-TH')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {featuredPost.readTime} {getReadTimeText()}
                                    </span>
                                </div>
                                <button className="flex items-center gap-2 text-primary hover:gap-3 transition-all">
                                    {t.blogPage.readMore} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                                    {getCategoryLabel(post.category)}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {getTitle(post)}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {getExcerpt(post)}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.date).toLocaleDateString('th-TH')}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime} {getReadTimeText()}
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">{t.blogPage.noResults}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
