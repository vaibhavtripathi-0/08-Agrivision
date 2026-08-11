'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/messages/en.json';
import hi from '@/messages/hi.json';

type Language = 'en' | 'hi';
type Dictionaries = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
  dictionary: Dictionaries;
}

const dictionaries: Record<Language, Dictionaries> = { en, hi };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('agrivision_lang') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agrivision_lang', lang);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current: any = dictionaries[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if translation key missing
        let fallback: any = dictionaries['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        return fallback;
      }
    }
    return typeof current === 'string' ? current : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dictionary: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
