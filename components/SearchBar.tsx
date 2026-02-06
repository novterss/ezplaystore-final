'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
    id: number;
    name: string;
    type: 'premium' | 'free';
    price?: number;
}

interface SearchBarProps {
    products: SearchResult[];
}

const SearchBar = ({ products }: SearchBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (query.trim().length > 0) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered.slice(0, 5));
        } else {
            setResults([]);
        }
    }, [query, products]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Keyboard shortcut (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all text-sm"
            >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">ค้นหา...</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 bg-white/10 rounded text-xs">
                    ⌘K
                </kbd>
            </button>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsOpen(false); setQuery(''); }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Search Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
                        >
                            <div className="bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="ค้นหาสินค้า..."
                                        className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                                    />
                                    {query && (
                                        <button
                                            onClick={() => setQuery('')}
                                            className="p-1 hover:bg-white/10 rounded"
                                        >
                                            <X className="w-4 h-4 text-gray-400" />
                                        </button>
                                    )}
                                </div>

                                {/* Results */}
                                <div className="max-h-80 overflow-y-auto">
                                    {results.length > 0 ? (
                                        <div className="p-2">
                                            {results.map((item, index) => (
                                                <Link
                                                    key={item.id}
                                                    href={item.type === 'premium' ? '/#shop' : '/free-zone'}
                                                    onClick={() => { setIsOpen(false); setQuery(''); }}
                                                    className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors"
                                                >
                                                    <div className={`p-2 rounded-lg ${item.type === 'premium' ? 'bg-primary/20 text-primary' : 'bg-green-500/20 text-green-500'}`}>
                                                        <Package className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-white">{item.name}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.type === 'premium' ? `฿${item.price?.toLocaleString()}` : 'Free'}
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-gray-500" />
                                                </Link>
                                            ))}
                                        </div>
                                    ) : query.length > 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            ไม่พบสินค้าที่ค้นหา
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-gray-500">
                                            พิมพ์เพื่อค้นหาสินค้า
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                                    <span>กด ESC เพื่อปิด</span>
                                    <span>{results.length} ผลลัพธ์</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default SearchBar;
