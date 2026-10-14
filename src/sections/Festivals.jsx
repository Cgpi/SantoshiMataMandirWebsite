import { useState } from 'react';
import { Calendar, Flame, Music, Sparkles, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import ImageLightbox from '../components/ImageLightbox';
import { templeImages } from '../data/images';

export default function Festivals() {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cards = [
    {
      icon: Calendar,
      title: t.festivalNavratriTitle,
      desc: t.festivalNavratriDesc,
      badge: t.eventDatesLabel,
      featured: true,
    },
    {
      icon: Flame,
      title: t.festivalAartiTitle,
      desc: t.festivalAartiDesc,
    },
    {
      icon: Music,
      title: t.festivalBhajanTitle,
      desc: t.festivalBhajanDesc,
    },
    {
      icon: Sparkles,
      title: t.festivalPoojaTitle,
      desc: t.festivalPoojaDesc,
    },
  ];

  return (
    <section className="section festivals-section" id="festivals">
      <div className="container">
        <Reveal><SectionTitle title={t.festivalsTitle} subtitle={t.festivalsSubtitle} /></Reveal>

        <div className="festivals-grid">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={idx} delay={idx * 120}>
                <div className={`festival-card ${card.featured ? 'featured' : ''}`}>
                  <div className="festival-card-icon">
                    <Icon size={28} />
                  </div>
                  {card.badge && <span className="festival-card-badge">{card.badge}</span>}
                  <h3 className="festival-card-title">{card.title}</h3>
                  <p className="festival-card-desc">{card.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* <Reveal delay={200}>
          <div className="festivals-poster">
            <div className="festivals-poster-card" onClick={() => setLightboxOpen(true)}>
              <img
                src={templeImages.navratriPoster.src}
                alt={t.festivalPosterAlt}
                loading="lazy"
              />
              <div className="festivals-poster-overlay">
                <Eye size={32} />
                <span>{t.festivalPosterPreview}</span>
              </div>
            </div>
          </div>
        </Reveal> */}
      </div>

      {/* {lightboxOpen && (
        <ImageLightbox
          src={templeImages.navratriPoster.fullSrc}
          alt={t.festivalPosterAlt}
          onClose={() => setLightboxOpen(false)}
          closeLabel={t.festivalPosterClose}
        />
      )} */}
    </section>
  );
}
