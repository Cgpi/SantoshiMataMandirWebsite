import { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MAPS_URL } from '../translations/translations';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'darshan', label: t.nav.darshan },
    { id: 'festivals', label: t.nav.festivals },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'instagram', label: t.nav.instagram },
    { id: 'how-to-reach', label: t.nav.howToReach },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a
          href="#home"
          className="header-brand"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <div className="header-logo">
            <span className="header-logo-text">ॐ</span>
          </div>
          <div className="header-brand-text">
            <span className="header-temple-name">{t.templeName}</span>
            <span className="header-temple-location">
              <MapPin size={12} /> {t.templeLocation}
            </span>
          </div>
        </a>

        <nav className="header-nav desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSelector />
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary header-directions-btn"
          >
            <MapPin size={16} />
            <span>{t.getDirections}</span>
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mobile-directions-btn"
          >
            <MapPin size={16} />
            <span>{t.getDirections}</span>
          </a>
        </nav>
      )}
    </header>
  );
}
