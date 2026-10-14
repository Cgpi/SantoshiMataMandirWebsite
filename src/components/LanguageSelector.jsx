import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ variant = 'header' }) {
  const { lang, changeLang, languages, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newLang) => {
    changeLang(newLang);
    setOpen(false);
  };

  const handleKeyDown = (e, newLang) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(newLang);
    }
  };

  if (variant === 'footer') {
    return (
      <div className="lang-selector footer-lang" ref={ref}>
        <span className="lang-selector-label">{t.selectLanguage}:</span>
        <div className="lang-options">
          {Object.entries(languages).map(([code, info]) => (
            <button
              key={code}
              className={`lang-option ${lang === code ? 'active' : ''}`}
              onClick={() => handleSelect(code)}
              onKeyDown={(e) => handleKeyDown(e, code)}
              aria-pressed={lang === code}
              type="button"
            >
              {info.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="lang-selector-btn"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.selectLanguage}
        type="button"
      >
        <Globe size={18} />
        <span>{languages[lang].shortLabel}</span>
        <ChevronDown size={14} className={open ? 'chevron-up' : ''} />
      </button>
      {open && (
        <ul className="lang-dropdown" role="listbox">
          {Object.entries(languages).map(([code, info]) => (
            <li
              key={code}
              role="option"
              aria-selected={lang === code}
              tabIndex={0}
              className={`lang-dropdown-item ${lang === code ? 'active' : ''}`}
              onClick={() => handleSelect(code)}
              onKeyDown={(e) => handleKeyDown(e, code)}
            >
              {info.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
