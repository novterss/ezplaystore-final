'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        category: 'Safety & System',
        items: [
            {
                question: 'ทำไมตัวเกมถึงขึ้นแจ้งเตือนไวรัส?',
                answer: 'เป็นเรื่องปกติของโปรแกรมที่ไม่มี Digital Certificate จาก Microsoft เนื่องจากมีค่าใช้จ่ายสูงครับ ตัวระบบ Windows จึงแจ้งเตือนว่าเป็นไฟล์ที่ไม่รู้จัก (False Positive) แต่ไม่ใช่ไวรัสแต่อย่างใดครับ'
            },
            {
                question: 'ไม่มีไวรัส 100% จริงไหม?',
                answer: 'การันตีความปลอดภัย 100% ครับ ไฟล์ทุกไฟล์ผ่านการตรวจสอบจากทางร้านแล้ว สบายใจได้เลย'
            },
            {
                question: 'สามารถเล่นกับเพื่อนที่มีเกมแท้ได้ไหม?',
                answer: 'เล่นได้ตามปกติครับ ระบบออนไลน์เชื่อมต่อกันได้ไม่มีปัญหา'
            },
            {
                question: 'เกมใหม่ๆ ต้องรอนานแค่ไหน?',
                answer: 'โดยปกติจะใช้เวลาประมาณ 3 - 4 อาทิตย์ หลังจากเกมเปิดตัวครับ'
            }
        ]
    },
    {
        category: 'Service & Payment',
        items: [
            {
                question: 'ถ้าลงไม่เป็น ทางร้านทำให้ได้ไหม?',
                answer: 'เกมของร้าน: รีโมทติดตั้งให้ ฟรี!\nโปรแกรมทั่วไป (Adobe/Office): มีค่าบริการ 50 บาทครับ\n*(กรุณาโหลดโปรแกรม Parsec และ Login รอไว้ก่อนติดต่อทีมงานนะครับ)*'
            },
            {
                question: 'ลง Mods (มอด) เสริมได้ไหม?',
                answer: 'ลงได้ครับ ตราบใดที่เป็นการ "เพิ่มไฟล์" (Add-on) เข้าไป แต่หากเป็นมอดที่ต้อง "เขียนทับไฟล์เดิม" (Replace) อาจจะทำให้เกิดปัญหาได้ครับ'
            },
            {
                question: 'Spoofer แก้แบนได้ทุกเกมไหม?',
                answer: 'Spoofer ของเราเป็นระดับ Kernel Mode (EFI) ช่วยปลดแบน Hardware ID (HWID) ได้ครอบคลุมเกมส่วนใหญ่ เช่น Valorant, Apex, FiveM ครับ ปลอดภัยและได้ผลจริง'
            },
            {
                question: 'ชำระเงินช่องทางไหนได้บ้าง?',
                answer: 'รองรับการโอนผ่านธนาคารทุกธนาคาร และ TrueMoney Wallet ครับ (ติดต่อขอเลขบัญชีได้ใน Discord Ticket)'
            }
        ]
    }
];

const FAQ = () => {
    // Track open state for each column independently or globally uniquely?
    // User requested "Accordion Style", usually implies one open at a time, or independent.
    // Given the grid, independent per card is best.
    const [openState, setOpenState] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        setOpenState(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Flatten data for the grid or keep categories?
    // User requested "Organize these into a 2-column grid layout".
    // I will render items directly in a grid.

    // Let's merge them into a single list for the grid display
    const allQuestions = [...faqData[0].items, ...faqData[1].items];

    return (
        <section className="container mx-auto px-4 py-24 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    คำถามที่พบบ่อย <span className="text-gray-500 text-3xl block md:inline mt-2 md:mt-0">(FAQ)</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {allQuestions.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden self-start hover:border-primary/30 transition-colors"
                    >
                        <button
                            onClick={() => toggle(`faq-${index}`)}
                            className="w-full p-6 flex items-start justify-between text-left hover:bg-white/5 transition-colors gap-4"
                        >
                            <span className="text-lg font-bold text-white leading-tight">{item.question}</span>
                            <span className={`flex-shrink-0 p-1.5 rounded-full transition-all duration-300 ${openState[`faq-${index}`] ? 'bg-primary text-white rotate-180' : 'bg-white/10 text-gray-400 rotate-0'}`}>
                                {openState[`faq-${index}`] ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            </span>
                        </button>

                        <AnimatePresence>
                            {openState[`faq-${index}`] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 text-gray-300 leading-relaxed border-t border-white/5 pt-4 whitespace-pre-line">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
