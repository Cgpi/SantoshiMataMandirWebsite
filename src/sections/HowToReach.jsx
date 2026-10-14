import { useState } from 'react';
import { MapPin, Navigation, Eye, Map } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
// import ImageLightbox from '../components/ImageLightbox';
import { MAPS_URL, MAPS_EMBED_URL } from '../translations/translations';
// import { templeImages } from '../data/images';

export default function HowToReach() {
  const { t } = useLanguage();
  // const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="section how-to-reach-section" id="how-to-reach">
      <div className="container">
        <Reveal><SectionTitle title={t.howToReachTitle} subtitle={t.howToReachSubtitle} /></Reveal>

        <div className="how-to-reach-content">
          <Reveal delay={100} className="how-to-reach-info">
            <p className="how-to-reach-intro">{t.howToReachIntro}</p>

            <div className="how-to-reach-address-card">
              <MapPin size={24} />
              <div>
                <strong>{t.templeName}</strong>
                <p>{t.contactAddressValue}</p>
              </div>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <Navigation size={18} /> {t.howToReachDirectionsBtn}
            </a>

            <div className="how-to-reach-areas">
              <h3 className="how-to-reach-areas-title">
                <Map size={20} /> {t.howToReachAreasTitle}
              </h3>
              <p className="how-to-reach-areas-intro">{t.howToReachAreasIntro}</p>
              <div className="how-to-reach-areas-grid">
                {t.howToReachAreas.map((area, idx) => (
                  <span key={idx} className="area-chip" style={{ animationDelay: `${idx * 80}ms` }}>
                    <MapPin size={14} /> {area}
                  </span>
                ))}
              </div>
            </div>

            {/* <div
              className="how-to-reach-poster"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
            >
              <img
                src={templeImages.howToReachPoster.src}
                alt={t.howToReachPosterAlt}
                loading="lazy"
              />
              <div className="how-to-reach-poster-overlay">
                <Eye size={28} />
                <span>{t.howToReachPosterPreview}</span>
              </div>
            </div> */}
          </Reveal>

          <Reveal delay={200} className="how-to-reach-map">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Shri Santoshi Mata Mandir Katraj Pune"
            />
          </Reveal>
        </div>
      </div>

      {/* {lightboxOpen && (
        <ImageLightbox
          src={templeImages.howToReachPoster.fullSrc}
          alt={t.howToReachPosterAlt}
          onClose={() => setLightboxOpen(false)}
          closeLabel={t.galleryClose}
        />
      )} */}
    </section>
  );
}
