'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface PricePoint {
    date: string;
    price: number;
}

interface PriceHistoryChartProps {
    productId: number;
    currentPrice: number;
    originalPrice?: number;
}

const PriceHistoryChart = ({ productId, currentPrice, originalPrice }: PriceHistoryChartProps) => {
    const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
    const [lowestPrice, setLowestPrice] = useState(currentPrice);
    const [highestPrice, setHighestPrice] = useState(currentPrice);

    useEffect(() => {
        // Generate mock price history (in real app, fetch from database)
        const generateHistory = () => {
            const history: PricePoint[] = [];
            const today = new Date();
            const basePrice = originalPrice || currentPrice;

            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setMonth(date.getMonth() - i);

                // Add some variation to prices
                const variation = (Math.random() - 0.5) * 0.3; // ±15%
                const price = Math.round(basePrice * (1 + variation));

                history.push({
                    date: date.toLocaleDateString('th-TH', { month: 'short' }),
                    price: i === 0 ? currentPrice : price
                });
            }

            setPriceHistory(history);
            setLowestPrice(Math.min(...history.map(h => h.price)));
            setHighestPrice(Math.max(...history.map(h => h.price)));
        };

        generateHistory();
    }, [productId, currentPrice, originalPrice]);

    const getPriceRange = () => highestPrice - lowestPrice || 1;

    const getYPosition = (price: number) => {
        return 100 - ((price - lowestPrice) / getPriceRange()) * 80 - 10;
    };

    const getPriceTrend = () => {
        if (priceHistory.length < 2) return 'stable';
        const firstPrice = priceHistory[0].price;
        if (currentPrice < firstPrice * 0.95) return 'down';
        if (currentPrice > firstPrice * 1.05) return 'up';
        return 'stable';
    };

    const trend = getPriceTrend();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-gray-400">Price History</h4>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${trend === 'down' ? 'bg-green-500/20 text-green-400' :
                        trend === 'up' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                    }`}>
                    {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                    {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {trend === 'stable' && <Minus className="w-3 h-3" />}
                    {trend === 'down' ? 'Price Drop!' : trend === 'up' ? 'Price Up' : 'Stable'}
                </div>
            </div>

            {/* Mini Chart */}
            <div className="relative h-20 mb-3">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Area under the line */}
                    <defs>
                        <linearGradient id={`gradient-${productId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={trend === 'down' ? '#10B981' : trend === 'up' ? '#EF4444' : '#8B5CF6'} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={trend === 'down' ? '#10B981' : trend === 'up' ? '#EF4444' : '#8B5CF6'} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Line path */}
                    <path
                        d={`M ${priceHistory.map((p, i) =>
                            `${(i / (priceHistory.length - 1)) * 100},${getYPosition(p.price)}`
                        ).join(' L ')} L 100,100 L 0,100 Z`}
                        fill={`url(#gradient-${productId})`}
                    />

                    <path
                        d={`M ${priceHistory.map((p, i) =>
                            `${(i / (priceHistory.length - 1)) * 100},${getYPosition(p.price)}`
                        ).join(' L ')}`}
                        fill="none"
                        stroke={trend === 'down' ? '#10B981' : trend === 'up' ? '#EF4444' : '#8B5CF6'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Current price dot */}
                    <circle
                        cx="100"
                        cy={getYPosition(currentPrice)}
                        r="3"
                        fill={trend === 'down' ? '#10B981' : trend === 'up' ? '#EF4444' : '#8B5CF6'}
                    />
                </svg>
            </div>

            {/* Price stats */}
            <div className="flex justify-between text-xs">
                <div>
                    <div className="text-gray-500">Lowest</div>
                    <div className="text-green-400 font-bold">฿{lowestPrice.toLocaleString()}</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-500">Current</div>
                    <div className="text-white font-bold">฿{currentPrice.toLocaleString()}</div>
                </div>
                <div className="text-right">
                    <div className="text-gray-500">Highest</div>
                    <div className="text-red-400 font-bold">฿{highestPrice.toLocaleString()}</div>
                </div>
            </div>
        </motion.div>
    );
};

export default PriceHistoryChart;
