import { MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MAPS_URL } from '../translations/translations';
import LanguageSelector from './LanguageSelector';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand-col">
          <div className="footer-logo">
            <span className="footer-logo-text">ॐ</span>
          </div>
          <h3 className="footer-temple-name">{t.templeName}</h3>
          <p className="footer-location">
            <MapPin size={14} /> {t.templeLocation}
          </p>
          <p className="footer-blessing-text">{t.footerBlessing}</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">{t.footerQuickLinks}</h4>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">{t.footerContact}</h4>
          <p className="footer-contact-item">
            <MapPin size={14} /> {t.contactAddressValue}
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <ExternalLink size={14} /> {t.getDirections}
          </a>
        </div>

        <div className="footer-col">
          <LanguageSelector variant="footer" />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-disclaimer">{t.footerDisclaimer}</p>
        <p className="footer-copyright">
          &copy; {year} {t.templeName}. {t.footerRights}
        </p>
        <p className="footer-made-with">{t.footerMadeWith}</p>
        <p className="footer-blessing-bottom">{t.footerBlessing}</p>
      </div>
    </footer>
  );
}
