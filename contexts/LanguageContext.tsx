"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Language, Dictionary } from '../lib/dictionary';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('EN');

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: dictionary[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
