'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistItem {
    id: number;
    name: string;
    price?: number;
    image?: string;
    type: 'premium' | 'free';
}

interface WishlistContextType {
    items: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse wishlist:', e);
            }
        }
    }, []);

    // Save to localStorage when items change
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(items));
    }, [items]);

    const addToWishlist = (item: WishlistItem) => {
        if (!items.some(i => i.id === item.id)) {
            setItems([...items, item]);
        }
    };

    const removeFromWishlist = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    const isInWishlist = (id: number) => {
        return items.some(i => i.id === id);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    return (
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
}
