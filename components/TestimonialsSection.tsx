import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TestimonialsSection() {
    const { t } = useLanguage();
    const reviews = t.testimonials?.reviews || [];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                        CUSTOMER <span className="text-primary">REVIEWS</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t.testimonials?.subtitle || "See what our satisfied customers are saying"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-colors group relative"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-primary/20 transition-colors" />

                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed min-h-[80px]">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden relative border border-white/10 group-hover:border-primary/50 transition-colors">
                                    {review.image ? (
                                        <Image
                                            src={review.image}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{review.name}</div>
                                    <div className="text-xs text-primary font-medium">{review.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
