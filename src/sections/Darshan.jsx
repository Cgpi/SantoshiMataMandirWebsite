import { Images, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import { templeImages } from '../data/images';

export default function Darshan() {
  const { t } = useLanguage();

  const handleViewGallery = () => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section darshan-section" id="darshan">
      <div className="container">
        <Reveal><SectionTitle title={t.darshanTitle} subtitle={t.darshanSubtitle} /></Reveal>
        <div className="darshan-content">
          <Reveal delay={100} className="darshan-image-card-wrapper">
            <div className="darshan-image-card">
              <div className="darshan-image-glow" />
              <img
                src={templeImages.darshan.src}
                alt={t.galleryImages.idol}
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={200} className="darshan-text">
            <p className="darshan-message">{t.darshanMessage}</p>
            <button
              className="btn btn-primary"
              onClick={handleViewGallery}
              type="button"
            >
              <Images size={18} /> {t.darshanViewGallery} <ArrowRight size={16} className="btn-arrow" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
