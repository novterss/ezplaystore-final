'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UnlockContextType {
    isUnlocked: boolean;
    verifyMembership: () => Promise<boolean>;
    isLoading: boolean;
}

const UnlockContext = createContext<UnlockContextType | undefined>(undefined);

export const UnlockProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('isDiscordUnlocked');
        if (stored === 'true') {
            setIsUnlocked(true);
        }
    }, []);

    const verifyMembership = async (): Promise<boolean> => {
        if (isUnlocked) return true;

        // @ts-ignore
        const accessToken = session?.accessToken;

        if (!accessToken) {
            alert('Please login first!');
            return false;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/discord/check-member', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken }),
            });
            const data = await res.json();

            if (data.isMember) {
                setIsUnlocked(true);
                localStorage.setItem('isDiscordUnlocked', 'true');
                return true;
            } else {
                alert('คุณยังไม่ได้เข้า Discord Server! กรุณาเข้าร่วมก่อน (You have not joined the server yet!)');
                return false;
            }
        } catch (error) {
            console.error('Verification failed', error);
            alert('Verification failed. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UnlockContext.Provider value={{ isUnlocked, verifyMembership, isLoading }}>
            {children}
        </UnlockContext.Provider>
    );
};

export const useUnlock = () => {
    const context = useContext(UnlockContext);
    if (!context) {
        throw new Error('useUnlock must be used within an UnlockProvider');
    }
    return context;
};
