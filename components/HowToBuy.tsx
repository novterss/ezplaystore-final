'use client';

import { motion } from 'framer-motion';
import { UserPlus, Ticket, CreditCard } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'เข้าสู่ Discord',
        titleEn: 'Join Community',
        description: 'กดปุ่ม Join Discord เพื่อเข้าสู่คอมมูนิตี้ของเรา',
        icon: UserPlus,
        color: 'from-blue-500 to-indigo-500'
    },
    {
        id: 2,
        title: 'เปิด Ticket',
        titleEn: 'Open Ticket',
        description: 'เลือกห้องสั่งซื้อสินค้าและกดเปิด Ticket เพื่อคุยกับทีมงาน',
        icon: Ticket,
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 3,
        title: 'ชำระเงิน & รับของ',
        titleEn: 'Pay & Receive',
        description: 'ชำระเงินผ่านช่องทางที่สะดวกและรับสินค้าทันที',
        icon: CreditCard,
        color: 'from-green-500 to-emerald-500'
    }
];

const HowToBuy = () => {
    return (
        <section className="container mx-auto px-4 py-24 mb-16 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    ขั้นตอนการสั่งซื้อ <span className="text-gray-500 text-3xl block md:inline mt-2 md:mt-0">(How to Buy)</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {steps.map((step, idx) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        {/* Number Watermark */}
                        <div className="absolute -right-4 -bottom-4 text-[120px] font-bold text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">
                            {step.id}
                        </div>

                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                            <step.icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{step.titleEn}</p>
                        <p className="text-gray-400 leading-relaxed relative z-10">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowToBuy;
