'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, User, Send, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';

interface Review {
    id: string;
    user_name: string;
    user_image?: string;
    rating: number;
    comment: string;
    product_id: number;
    created_at: string;
    likes: number;
}

interface ProductReviewsProps {
    productId: number;
    productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', productId)
            .order('created_at', { ascending: false });

        if (data) {
            setReviews(data);
            if (data.length > 0) {
                const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
                setAverageRating(Math.round(avg * 10) / 10);
            }
        }
    };

    const submitReview = async () => {
        if (!session?.user || !comment.trim()) return;

        setSubmitting(true);
        try {
            const { error } = await supabase.from('reviews').insert({
                user_name: session.user.name || 'Anonymous',
                user_image: session.user.image,
                rating,
                comment: comment.trim(),
                product_id: productId,
                likes: 0
            });

            if (!error) {
                setComment('');
                setRating(5);
                setShowForm(false);
                fetchReviews();
            }
        } catch (err) {
            console.error('Error submitting review:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLike = async (reviewId: string, currentLikes: number) => {
        await supabase
            .from('reviews')
            .update({ likes: currentLikes + 1 })
            .eq('id', reviewId);

        setReviews(reviews.map(r =>
            r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
        ));
    };

    const StarRating = ({ rating, editable = false, onChange }: { rating: number; editable?: boolean; onChange?: (r: number) => void }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    onClick={() => editable && onChange?.(star)}
                    className={`${editable ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!editable}
                >
                    <Star
                        className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                </button>
            ))}
        </div>
    );

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Reviews
                    </h3>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={Math.round(averageRating)} />
                            <span className="text-sm text-gray-400">
                                {averageRating} ({reviews.length} รีวิว)
                            </span>
                        </div>
                    )}
                </div>
                {session?.user && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg font-bold text-sm transition-all"
                    >
                        {showForm ? <X className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        {showForm ? 'ยกเลิก' : 'เขียนรีวิว'}
                    </button>
                )}
            </div>

            {/* Review Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">คะแนน</label>
                                <StarRating rating={rating} editable onChange={setRating} />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">รีวิว</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={`รีวิว ${productName}...`}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                                    rows={3}
                                />
                            </div>
                            <button
                                onClick={submitReview}
                                disabled={submitting || !comment.trim()}
                                className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        ยังไม่มีรีวิว เป็นคนแรกที่รีวิว!
                    </div>
                ) : (
                    reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 rounded-xl p-4"
                        >
                            <div className="flex items-start gap-3">
                                {review.user_image ? (
                                    <img
                                        src={review.user_image}
                                        alt={review.user_name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold">{review.user_name}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-300 text-sm mb-2">{review.comment}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>
                                            {new Date(review.created_at).toLocaleDateString('th-TH')}
                                        </span>
                                        <button
                                            onClick={() => handleLike(review.id, review.likes)}
                                            className="flex items-center gap-1 hover:text-primary transition-colors"
                                        >
                                            <ThumbsUp className="w-3 h-3" />
                                            {review.likes > 0 && review.likes}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductReviews;
