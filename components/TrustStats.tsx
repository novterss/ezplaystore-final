'use client';

import { motion } from 'framer-motion';

const stats = [
    { label: 'Active Users', value: '238+', sub: 'ลูกค้าที่ใช้งานจริง' },
    { label: 'Undetected', value: '100%', sub: 'ปลอดภัย ไร้การแบน' },
    { label: 'Support', value: '24/7', sub: 'ดูแลตลอด 24 ชม.' },
    { label: 'Reviews', value: '5-Star', sub: 'รีวิวแน่นจาก Discord' },
];

const TrustStats = () => {
    return (
        <section className="py-12 border-y border-white/5 bg-black/20 backdrop-blur-sm relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400"
                >
                    การันตีด้วยผลงาน (Our Numbers)
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-5xl font-black text-primary mb-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-white font-bold text-lg">{stat.label}</div>
                            <div className="text-gray-500 text-sm">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustStats;
