import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations, stateLanguageMap } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  setLanguageFromState: (state: string) => void;
  locationSet: boolean;
  setLocationSet: (v: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [locationSet, setLocationSet] = useState(false);

  const t = useCallback((key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  }, [language]);

  const setLanguageFromState = useCallback((state: string) => {
    const normalized = state.toLowerCase().trim();
    const lang = stateLanguageMap[normalized] || 'en';
    setLanguage(lang);
    setLocationSet(true);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, setLanguageFromState, locationSet, setLocationSet }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
