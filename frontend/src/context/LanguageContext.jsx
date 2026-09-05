import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('cropshield_lang') || 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('cropshield_lang', newLang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[lang] || translations.en;
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English
        let fallback = translations.en;
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) return path;
          fallback = fallback[fKey];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
