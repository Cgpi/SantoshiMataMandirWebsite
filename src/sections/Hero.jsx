// import { MapPin, ArrowRight } from 'lucide-react';
// import { useLanguage } from '../context/LanguageContext';
// import { MAPS_URL } from '../translations/translations';
// import { templeImages } from '../data/images';

// export default function Hero() {
//   const { t } = useLanguage();

//   const handleExplore = () => {
//     const el = document.getElementById('about');
//     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   return (
//     <section className="hero" id="home">
//       <div className="hero-bg">
//         <img src={templeImages.heroBg.src} alt="" aria-hidden="true" />
//         <div className="hero-overlay" />
//       </div>

//       <div className="hero-decor-top" />
//       <div className="hero-decor-bottom" />

//       <div className="hero-content">
//         <p className="hero-blessing">{t.heroBlessing}</p>
//         <div className="hero-title-wrapper">
//           <h1 className="hero-title">{t.heroTitle}</h1>
//         </div>
//         <p className="hero-subtitle">{t.heroSubtitle}</p>
//         <p className="hero-location">
//           <MapPin size={18} className="hero-location-pin" /> {t.heroLocation}
//         </p>
//         <div className="hero-buttons">
//           <button className="btn btn-primary btn-lg hero-btn-primary" onClick={handleExplore} type="button">
//             {t.heroExplore} <ArrowRight size={18} className="btn-arrow" />
//           </button>
//           <a
//             href={MAPS_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn btn-secondary btn-lg"
//           >
//             <MapPin size={18} /> {t.heroDirections}
//           </a>
//         </div>
//       </div>

//       <div className="hero-scroll-indicator">
//         <span />
//       </div>
//     </section>
//   );
// }




import React, { useEffect, useRef } from "react";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MAPS_URL } from "../translations/translations";
import { templeImages } from "../data/images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useLanguage();
  const rootRef = useRef(null);
  const imageRef = useRef(null);

  const handleExplore = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          ".smt-kicker",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 }
        )
        .fromTo(
          ".smt-title",
          { y: 35, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          "-=0.35"
        )
        .fromTo(
          ".smt-description",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          ".smt-details",
          { y: 15, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          ".smt-buttons",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65 },
          "-=0.3"
        )
        .fromTo(
          ".smt-artwork",
          { x: 35, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.1 },
          "-=1.1"
        );

      gsap.to(imageRef.current, {
        yPercent: 7,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".smt-ornament", {
        rotation: 12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });

      gsap.fromTo(
        ".smt-bottom-strip",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".smt-bottom-strip",
            start: "top 95%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .smt-hero {
          --smt-cream: #FFF8E9;
          --smt-red: #8B101C;
          --smt-red-dark: #650D17;
          --smt-gold: #D6A84F;
          --smt-text: #4A251D;
          --smt-muted: #806B5F;

          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: var(--smt-cream);
          color: var(--smt-text);
          font-family: 'Noto Sans', 'Noto Sans Devanagari', sans-serif;
        }

        .smt-hero *,
        .smt-hero *::before,
        .smt-hero *::after {
          box-sizing: border-box;
        }

        .smt-main {
          width: min(1280px, calc(100% - 100px));
          min-height: 690px;
          margin: 0 auto;
          padding: 115px 0 75px;
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          align-items: center;
          gap: clamp(40px, 6vw, 90px);
        }

        /* TEXT */

        .smt-copy {
          position: relative;
          z-index: 2;
          padding: 15px 0 35px;
        }

        .smt-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          color: var(--smt-red);
          font-family: 'Noto Serif', 'Noto Serif Devanagari', Georgia, serif;
          font-size: 17px;
          font-weight: 600;
        }

        .smt-kicker-mark {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 1px solid rgba(139, 16, 28, 0.25);
          border-radius: 50%;
          color: var(--smt-gold);
        }

        .smt-title {
          margin: 0;
          color: var(--smt-text);
          font-family: 'Noto Serif', 'Noto Serif Devanagari', Georgia, serif;
          font-size: clamp(43px, 5.1vw, 70px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.045em;
          overflow-wrap: anywhere;
          text-wrap: balance;
        }

        .smt-title::after {
          content: "";
          display: block;
          width: 75px;
          height: 4px;
          margin-top: 25px;
          background: var(--smt-red);
          border-radius: 5px;
        }

        .smt-description {
          max-width: 470px;
          margin-top: 23px;
          color: var(--smt-muted);
          font-size: 15px;
          line-height: 1.95;
        }

        .smt-details {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 23px;
          color: var(--smt-red);
          font-size: 13px;
          font-weight: 600;
        }

        .smt-location-icon {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #F1E6D2;
        }

        .smt-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 30px;
        }

        .smt-btn {
          min-height: 51px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          padding: 0 21px;
          border: 1px solid var(--smt-red);
          border-radius: 3px;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .smt-btn:hover {
          transform: translateY(-3px);
        }

        .smt-btn-primary {
          background: var(--smt-red);
          color: #fffaf0;
          box-shadow: 0 8px 20px rgba(139, 16, 28, 0.12);
        }

        .smt-btn-primary:hover {
          background: var(--smt-red-dark);
          color: #fffaf0;
          box-shadow: 0 12px 24px rgba(139, 16, 28, 0.2);
        }

        .smt-btn-secondary {
          color: var(--smt-red);
          background: transparent;
        }

        .smt-btn-secondary:hover {
          color: white;
          background: var(--smt-red);
        }

        /* TEMPLE ARCH */

        .smt-artwork {
          position: relative;
          min-width: 0;
          padding: 12px 12px 30px 0;
        }

        .smt-artwork::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          width: 76%;
          height: 83%;
          border-radius: 48% 48% 0 0;
          background: #EAD9BC;
        }

        .smt-arch {
          position: relative;
          height: clamp(420px, 49vw, 590px);
          overflow: hidden;
          border: 8px solid var(--smt-cream);
          border-radius: 48% 48% 3px 3px;
          background: #E9D5B5;
          box-shadow: 0 18px 45px rgba(74, 37, 29, 0.14);
        }

        .smt-arch::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 10px;
          border: 1px solid rgba(255, 248, 233, 0.55);
          border-radius: 48% 48% 0 0;
          pointer-events: none;
        }

        .smt-arch img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
          will-change: transform;
        }

        .smt-arch-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(55, 10, 13, 0.02) 45%,
            rgba(55, 10, 13, 0.6) 100%
          );
          pointer-events: none;
        }

        .smt-image-label {
          position: absolute;
          z-index: 2;
          right: 22px;
          bottom: 27px;
          left: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
        }

        .smt-image-label-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.65);
          border-radius: 50%;
          color: #F3D28D;
        }

        .smt-image-label p {
          margin: 0;
          font-family: 'Noto Serif', 'Noto Serif Devanagari', Georgia, serif;
          font-size: 19px;
          font-weight: 600;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        /* ORNAMENT */

        .smt-ornament {
          position: absolute;
          z-index: 3;
          top: 16%;
          right: -12px;
          width: 95px;
          height: 95px;
          display: grid;
          place-items: center;
          border: 1px solid var(--smt-gold);
          border-radius: 50%;
          background: var(--smt-cream);
          color: var(--smt-red);
          box-shadow: 0 8px 24px rgba(74, 37, 29, 0.1);
        }

        .smt-ornament::before,
        .smt-ornament::after {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(214, 168, 79, 0.55);
          border-radius: 50%;
        }

        .smt-ornament::after {
          inset: 14px;
          border-style: dashed;
        }

        .smt-ornament svg {
          width: 25px;
          height: 25px;
        }

        .smt-image-number {
          position: absolute;
          left: -25px;
          bottom: 65px;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: var(--smt-red);
          color: white;
          border: 5px solid var(--smt-cream);
          font-family: 'Noto Serif', Georgia, serif;
          font-size: 20px;
        }

        /* BOTTOM INFO */

        .smt-bottom-strip {
          width: min(1280px, calc(100% - 100px));
          margin: 0 auto;
          padding: 19px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          border-top: 1px solid rgba(139, 16, 28, 0.16);
          color: var(--smt-muted);
          font-size: 11px;
          letter-spacing: 0.05em;
        }

        .smt-bottom-blessing {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--smt-red);
          font-family: 'Noto Serif', 'Noto Serif Devanagari', Georgia, serif;
          font-size: 14px;
          font-weight: 600;
        }

        .smt-bottom-blessing svg {
          color: var(--smt-gold);
        }

        .smt-bottom-location {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .smt-main {
            width: calc(100% - 56px);
            min-height: 630px;
            gap: 32px;
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.86fr);
          }

          .smt-title {
            font-size: clamp(38px, 5.5vw, 53px);
          }

          .smt-description {
            font-size: 14px;
          }

          .smt-arch {
            height: 450px;
          }

          .smt-ornament {
            width: 76px;
            height: 76px;
            right: -7px;
          }

          .smt-bottom-strip {
            width: calc(100% - 56px);
          }
        }

        /* MOBILE */

        @media (max-width: 650px) {
          .smt-main {
            width: calc(100% - 38px);
            padding: 100px 0 50px;
            min-height: 0;
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .smt-copy {
            padding: 0;
          }

          .smt-kicker {
            margin-bottom: 18px;
            font-size: 15px;
          }

          .smt-kicker-mark {
            width: 32px;
            height: 32px;
          }

          .smt-title {
            font-size: clamp(38px, 9vw, 54px);
            line-height: 1.23;
          }

          .smt-title::after {
            margin-top: 19px;
          }

          .smt-description {
            margin-top: 18px;
            font-size: 14px;
            line-height: 1.85;
          }

          .smt-details {
            margin-top: 18px;
            font-size: 12px;
          }

          .smt-buttons {
            margin-top: 24px;
          }

          .smt-btn {
            min-height: 48px;
            padding: 0 16px;
          }

          .smt-artwork {
            width: calc(100% - 12px);
            margin-left: 12px;
            padding: 0 8px 20px 0;
          }

          .smt-arch {
            height: clamp(390px, 112vw, 500px);
            border-width: 6px;
          }

          .smt-ornament {
            top: 12%;
            right: -7px;
            width: 70px;
            height: 70px;
          }

          .smt-image-number {
            left: -18px;
            bottom: 55px;
            width: 62px;
            height: 62px;
          }

          .smt-bottom-strip {
            width: calc(100% - 38px);
            align-items: flex-start;
            flex-direction: column;
            gap: 9px;
            padding: 16px 0 22px;
          }
        }

        @media (max-width: 380px) {
          .smt-main {
            width: calc(100% - 30px);
          }

          .smt-title {
            font-size: 35px;
          }

          .smt-buttons {
            flex-direction: column;
          }

          .smt-btn {
            width: 100%;
          }

          .smt-arch {
            height: 370px;
          }

          .smt-bottom-strip {
            width: calc(100% - 30px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smt-hero *,
          .smt-hero *::before,
          .smt-hero *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section className="smt-hero" id="home" ref={rootRef}>
        <div className="smt-main">
          <div className="smt-copy">
            <p className="smt-kicker">
              <span className="smt-kicker-mark">
                <Sparkles size={16} />
              </span>
              {t.heroBlessing}
            </p>

            <h1 className="smt-title">
              {t.heroTitle}
            </h1>

            <p className="smt-description">
              {t.heroSubtitle}
            </p>

            <div className="smt-details">
              <span className="smt-location-icon">
                <MapPin size={17} />
              </span>
              <span>{t.heroLocation}</span>
            </div>

            <div className="smt-buttons">
              <button
                type="button"
                className="smt-btn smt-btn-primary"
                onClick={handleExplore}
              >
                {t.heroExplore}
                <ArrowRight size={17} />
              </button>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="smt-btn smt-btn-secondary"
              >
                <MapPin size={16} />
                {t.heroDirections}
              </a>
            </div>
          </div>

          <div className="smt-artwork">
            <div className="smt-arch">
              <img
                ref={imageRef}
                src={templeImages.heroBg.src}
                alt={t.templeName || t.heroTitle}
              />

              <div className="smt-arch-shade" />

              <div className="smt-image-label">
                <span className="smt-image-label-icon">
                  <Sparkles size={20} />
                </span>
                <p>{t.templeName}</p>
              </div>
            </div>

            <div className="smt-ornament" aria-hidden="true">
              <Sparkles />
            </div>

            <div className="smt-image-number" aria-hidden="true">
              ॐ
            </div>
          </div>
        </div>

        <div className="smt-bottom-strip">
          <div className="smt-bottom-blessing">
            <Sparkles size={15} />
            {t.heroBlessing}
          </div>

          <div className="smt-bottom-location">
            <MapPin size={14} />
            {t.templeLocation}
          </div>
        </div>
      </section>
    </>
  );
}
