'use client';

import TabbedFreeZone from '@/components/TabbedFreeZone';
import Navbar from '@/components/Navbar';

export default function FreeZonePage() {
    return (
        <main className="min-h-screen bg-transparent text-white">
            <div className="pt-24 pb-20 px-4">
                <TabbedFreeZone />
            </div>
        </main>
    );
}
