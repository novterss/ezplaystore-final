'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, X } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState } from 'react';
import Link from 'next/link';

const WishlistButton = () => {
    const { items, removeFromWishlist, clearWishlist } = useWishlist();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Wishlist Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
                <Heart className="w-5 h-5" />
                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {items.length}
                    </span>
                )}
            </button>

            {/* Wishlist Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-red-500" />
                                    <h2 className="text-lg font-bold">Wishlist</h2>
                                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-sm">
                                        {items.length}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {items.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-500">Wishlist ว่างเปล่า</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            กดไอคอน ♡ เพื่อเพิ่มสินค้า
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 100 }}
                                                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                                            >
                                                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                                                    <ShoppingBag className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">{item.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.type === 'premium' ? `฿${item.price?.toLocaleString()}` : 'Free'}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="p-4 border-t border-white/10 space-y-3">
                                    <Link
                                        href="/#shop"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        ไปที่ร้านค้า
                                    </Link>
                                    <button
                                        onClick={clearWishlist}
                                        className="w-full text-gray-500 hover:text-red-500 text-sm py-2 transition-colors"
                                    >
                                        ล้าง Wishlist ทั้งหมด
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default WishlistButton;
