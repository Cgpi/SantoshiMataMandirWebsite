import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, languages } from '../translations/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'santoshi-mata-lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch {
      // localStorage may be unavailable
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = languages[lang]?.htmlLang || 'en';
  }, [lang]);

  const changeLang = useCallback((newLang) => {
    if (translations[newLang]) setLang(newLang);
  }, []);

  const t = translations[lang];

  const value = {
    lang,
    changeLang,
    t,
    languages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
