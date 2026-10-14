import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import ImageLightbox from '../components/ImageLightbox';
import { templeImages } from '../data/images';

export default function Gallery() {
  const { t } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const galleryItems = [
    { key: 'darshan', ...templeImages.darshan, altKey: 'idol' },
    { key: 'temple', ...templeImages.temple, altKey: 'temple' },
    { key: 'interior', ...templeImages.interior, altKey: 'interior' },
    { key: 'decoration', ...templeImages.decoration, altKey: 'decoration' },
    { key: 'festival', ...templeImages.festival, altKey: 'festival' },
    { key: 'aarti', ...templeImages.aarti, altKey: 'aarti' },
  ];

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <Reveal><SectionTitle title={t.galleryTitle} subtitle={t.gallerySubtitle} /></Reveal>

        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <Reveal key={idx} delay={(idx % 3) * 100}>
              <button
                className="gallery-item"
                onClick={() => setLightboxIdx(idx)}
                type="button"
                aria-label={t.galleryImages[item.altKey]}
              >
                <img
                  src={item.src}
                  alt={t.galleryImages[item.altKey]}
                  loading="lazy"
                />
                <div className="gallery-item-overlay">
                  <span>{t.galleryImages[item.altKey]}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <ImageLightbox
          src={galleryItems[lightboxIdx].fullSrc}
          alt={t.galleryImages[galleryItems[lightboxIdx].altKey]}
          onClose={() => setLightboxIdx(null)}
          closeLabel={t.galleryClose}
        />
      )}
    </section>
  );
}
