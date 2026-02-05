'use client';

import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        user: 'Kittiphong J.',
        rating: 5,
        comment: 'Spoofer ใช้ได้จริงครับ ตอนแรกไม่กล้าซื้อแต่แอดมินสอนดีมาก ปลดแบน FiveM หายขาดเลย',
        color: 'bg-blue-500'
    },
    {
        id: 2,
        user: 'lnwZa007',
        rating: 5,
        comment: 'บริการลงโปรแกรม 50 บาทคุ้มมากครับ ผมลงเองไม่ผ่าน ให้ร้านรีโมทมาทำให้แปปเดียวเสร็จ',
        color: 'bg-green-500'
    },
    {
        id: 3,
        user: 'Nonny Gamer',
        rating: 5,
        comment: 'เว็ปสวยมาก ของแจกฟรีเยอะจริง โหลดง่ายไม่มีโฆษณากวนใจเลยครับ ขอบคุณครับ',
        color: 'bg-purple-500'
    }
];

const Testimonials = () => {
    return (
        <section className="container mx-auto px-4 py-24 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    เสียงตอบรับจากลูกค้า <span className="text-gray-500 text-3xl block md:inline mt-2 md:mt-0">(Happy Customers)</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative hover:bg-white/10 transition-colors shadow-lg"
                    >
                        {/* Quote Icon Background */}
                        <div className="absolute top-6 right-6 text-7xl text-white/5 font-serif leading-none select-none pointer-events-none">
                            "
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg`}>
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{item.user}</h3>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed italic relative z-10">
                            "{item.comment}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
