'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
}

// Basic Skeleton Line
export const SkeletonLine = ({ className = '' }: SkeletonProps) => (
    <div className={`bg-white/10 rounded animate-pulse ${className}`} />
);

// Skeleton Card (for Shop, FreeZone items)
export const SkeletonCard = ({ className = '' }: SkeletonProps) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 ${className}`}>
        {/* Image */}
        <SkeletonLine className="w-full h-40 rounded-xl" />
        {/* Title */}
        <SkeletonLine className="w-3/4 h-6" />
        {/* Description */}
        <div className="space-y-2">
            <SkeletonLine className="w-full h-4" />
            <SkeletonLine className="w-5/6 h-4" />
        </div>
        {/* Button */}
        <SkeletonLine className="w-full h-12 rounded-xl" />
    </div>
);

// Skeleton Avatar (for Profile)
export const SkeletonAvatar = ({ className = '' }: SkeletonProps) => (
    <div className={`bg-white/10 rounded-full animate-pulse ${className}`} />
);

// Skeleton Text Block
export const SkeletonText = ({ lines = 3, className = '' }: { lines?: number; className?: string }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonLine
                key={i}
                className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

// Skeleton Stats Card
export const SkeletonStats = ({ className = '' }: SkeletonProps) => (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-4 text-center ${className}`}>
        <SkeletonLine className="w-8 h-8 rounded-lg mx-auto mb-3" />
        <SkeletonLine className="w-16 h-8 mx-auto mb-2" />
        <SkeletonLine className="w-20 h-3 mx-auto" />
    </div>
);

// Skeleton Table Row
export const SkeletonTableRow = ({ cols = 3, className = '' }: { cols?: number; className?: string }) => (
    <div className={`grid gap-4 p-4 border-b border-white/5 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
            <SkeletonLine key={i} className="h-6" />
        ))}
    </div>
);

// Full Page Skeleton (for page loads)
export const PageSkeleton = () => (
    <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <SkeletonLine className="w-48 h-10 mx-auto" />
                <SkeletonLine className="w-64 h-4 mx-auto" />
            </div>
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    </div>
);

export default SkeletonLine;
