
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "../context/LanguageContext";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { templeImages } from "../data/images";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTemple() {
  const { t } = useLanguage();

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const imageInnerRef = useRef(null);
  const timelineRef = useRef(null);
  const blessingRef = useRef(null);
  const diyaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      // Main storytelling entrance
      gsap.from(".st-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      // Reveal timeline entries one after another
      const entries = gsap.utils.toArray(".st-entry");

      gsap.from(entries, {
        x: -35,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 78%",
          once: true,
        },
      });

      // Draw the timeline line as the visitor scrolls
      gsap.fromTo(
        ".st-timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 72%",
            end: "bottom 65%",
            scrub: 0.8,
          },
        }
      );

      // Large temple photograph: slow parallax movement
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -5, scale: 1.12 },
          {
            yPercent: 5,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Floating devotional accents
      if (diyaRef.current) {
        gsap.to(diyaRef.current, {
          y: -12,
          rotation: 5,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.from(".st-photo-stamp", {
        scale: 0.65,
        rotation: -14,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Devotional message reveal
      if (blessingRef.current) {
        gsap.from(blessingRef.current, {
          y: 35,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blessingRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="spiritual-story" id="about" ref={sectionRef}>
      <style>{`
        .spiritual-story {
          --st-cream: #FFF8E9;
          --st-paper: #FFFDF6;
          --st-red: #8B101C;
          --st-red-dark: #590914;
          --st-gold: #C89B3C;
          --st-gold-light: #E9D49B;
          --st-ink: #3E2420;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(76px, 9vw, 132px) 0 100px;
          background: var(--st-cream);
          color: var(--st-ink);
        }

        .spiritual-story *,
        .spiritual-story *::before,
        .spiritual-story *::after {
          box-sizing: border-box;
        }

        .st-shell {
          width: min(1180px, calc(100% - 48px));
          margin-inline: auto;
        }

        .st-background-mark {
          position: absolute;
          top: 30px;
          right: -75px;
          z-index: -1;
          color: rgb(139 16 28 / 9%);
          font-family: serif;
          font-size: clamp(260px, 37vw, 540px);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .st-topline {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          color: var(--st-red);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .st-topline::before {
          content: "";
          width: 36px;
          height: 1px;
          background: var(--st-gold);
        }

        .st-heading-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, 0.48fr);
          align-items: end;
          gap: 40px;
          margin-bottom: 68px;
        }

        .st-heading-grid > div:first-child {
          min-width: 0;
        }

        .spiritual-story .st-heading-grid h1,
        .spiritual-story .st-heading-grid h2,
        .spiritual-story .st-heading-grid h3 {
          font-family: "Noto Serif", Georgia, serif;
        }

        .st-heading-grid .section-title {
          margin: 0;
          text-align: left;
        }

        .st-heading-grid .section-title h2,
        .st-heading-grid h2 {
          max-width: 720px;
          margin: 0;
          color: var(--st-red-dark);
          font-size: clamp(34px, 4.4vw, 58px);
          line-height: 1.16;
          letter-spacing: -0.045em;
        }

        .st-heading-grid .section-title p,
        .st-heading-grid .section-title .subtitle {
          max-width: 530px;
          margin-top: 18px;
          color: #795D50;
          font-size: 15px;
          line-height: 1.9;
        }

        .st-heading-aside {
          padding: 0 0 7px 24px;
          border-left: 1px solid rgba(200, 155, 60, 0.65);
          color: #795D50;
          font-family: "Noto Serif", Georgia, serif;
          font-size: 16px;
          font-style: italic;
          line-height: 1.85;
        }

        .st-heading-aside span {
          display: block;
          margin-bottom: 9px;
          color: var(--st-gold);
          font-family: Georgia, serif;
          font-size: 24px;
          font-style: normal;
        }

        .st-story-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          align-items: start;
          gap: clamp(40px, 7vw, 96px);
        }

        .st-story-copy {
          padding-top: 9px;
        }

        .st-intro {
          max-width: 480px;
          margin: 0 0 36px;
          color: #6E5045;
          font-size: 15px;
          line-height: 1.95;
        }

        .st-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-left: 4px;
        }

        .st-timeline-line {
          position: absolute;
          top: 15px;
          bottom: 25px;
          left: 18px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            var(--st-gold),
            rgba(200, 155, 60, 0.2)
          );
          transform-origin: top center;
        }

        .st-entry {
          position: relative;
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          gap: 22px;
          padding: 0 0 35px;
        }

        .st-entry:last-child {
          padding-bottom: 0;
        }

        .st-node {
          position: relative;
          z-index: 1;
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          border: 1px solid var(--st-gold);
          border-radius: 50%;
          background: var(--st-cream);
          color: var(--st-red);
          font-family: Georgia, serif;
          font-size: 10px;
          box-shadow: 0 0 0 5px var(--st-cream);
        }

        .st-entry-content {
          padding-top: 2px;
        }

        .st-entry-kicker {
          display: block;
          margin-bottom: 11px;
          color: #AE8332;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.19em;
        }

        .st-entry-content p {
          margin: 0;
          color: #64473C;
          font-size: 14px;
          line-height: 1.95;
        }

        .st-image-column {
          position: relative;
          min-width: 0;
          padding: 0 0 65px 22px;
        }

        .st-photo-frame {
          position: relative;
          height: clamp(440px, 54vw, 650px);
          min-height: 420px;
          overflow: hidden;
          background: #D8BCA0;
          box-shadow: 0 24px 60px rgba(74, 31, 24, 0.16);
        }

        .st-photo-frame::before {
          position: absolute;
          z-index: 1;
          inset: 0;
          content: "";
          border: 1px solid rgba(255, 248, 233, 0.42);
          pointer-events: none;
        }

        .st-photo-frame::after {
          position: absolute;
          z-index: 1;
          inset: 40% 0 0;
          content: "";
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(48, 12, 13, 0.58)
          );
          pointer-events: none;
        }

        .st-photo-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          will-change: transform;
        }

        .st-photo-caption {
          position: absolute;
          z-index: 2;
          right: 28px;
          bottom: 28px;
          left: 28px;
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          color: white;
        }

        .st-photo-caption small {
          display: block;
          margin-bottom: 8px;
          color: #F0DDA9;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .st-photo-caption strong {
          display: block;
          font-family: "Noto Serif", Georgia, serif;
          font-size: clamp(23px, 2.6vw, 35px);
          font-weight: 500;
          line-height: 1.25;
        }

        .st-photo-stamp {
          position: absolute;
          z-index: 3;
          top: 35px;
          right: -20px;
          display: grid;
          width: 112px;
          height: 112px;
          place-content: center;
          border: 1px solid var(--st-gold);
          border-radius: 50%;
          background: var(--st-cream);
          color: var(--st-red);
          text-align: center;
          box-shadow: 0 10px 30px rgba(74, 31, 24, 0.1);
        }

        .st-photo-stamp span {
          display: block;
          font-size: 25px;
          line-height: 1.2;
        }

        .st-photo-stamp small {
          display: block;
          margin-top: 5px;
          font-size: 9px;
          letter-spacing: 0.1em;
        }

        .st-photo-side-note {
          position: absolute;
          top: 110px;
          left: -5px;
          z-index: 3;
          writing-mode: vertical-rl;
          color: var(--st-red);
          font-family: Georgia, serif;
          font-size: 11px;
          letter-spacing: 0.23em;
          transform: rotate(180deg);
        }

        .st-diya {
          position: absolute;
          z-index: 4;
          right: 32px;
          bottom: 7px;
          display: grid;
          width: 82px;
          height: 82px;
          place-items: center;
          border: 1px solid rgba(200, 155, 60, 0.65);
          border-radius: 50%;
          background: var(--st-paper);
          font-size: 34px;
          box-shadow: 0 12px 32px rgba(74, 31, 24, 0.1);
          will-change: transform;
        }

        .st-devotional-banner {
          position: relative;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
          margin-top: 75px;
          padding: 34px 20px;
          border-top: 1px solid rgba(200, 155, 60, 0.55);
          border-bottom: 1px solid rgba(200, 155, 60, 0.55);
          text-align: center;
        }

        .st-banner-line {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(200, 155, 60, 0.75)
          );
        }

        .st-banner-line:last-child {
          transform: rotate(180deg);
        }

        .st-blessing {
          margin: 0;
          color: var(--st-red);
          font-family: "Noto Serif", Georgia, serif;
          font-size: clamp(25px, 4vw, 43px);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: 0.015em;
        }

        .st-blessing-subtitle {
          margin: 10px 0 0;
          color: #95744D;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .st-decorative-dot {
          position: absolute;
          top: -4px;
          left: 50%;
          width: 7px;
          height: 7px;
          border: 1px solid var(--st-gold);
          background: var(--st-cream);
          transform: translateX(-50%) rotate(45deg);
        }

        @media (min-width: 1400px) {
          .st-shell {
            width: min(1240px, calc(100% - 80px));
          }
        }

        @media (max-width: 900px) {
          .st-heading-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 48px;
          }

          .st-heading-aside {
            max-width: 520px;
          }

          .st-story-grid {
            grid-template-columns: 1fr;
            gap: 54px;
          }

          .st-story-copy {
            max-width: 680px;
          }

          .st-image-column {
            width: min(100%, 620px);
            margin-inline: auto;
            padding-left: 12px;
          }

          .st-photo-frame {
            height: 570px;
          }

          .st-photo-side-note {
            left: -2px;
          }
        }

        @media (max-width: 560px) {
          .spiritual-story {
            padding: 66px 0 68px;
          }

          .st-shell {
            width: calc(100% - 36px);
          }

          .st-background-mark {
            top: 100px;
            right: -45px;
            font-size: 290px;
          }

          .st-topline {
            margin-bottom: 17px;
            font-size: 9px;
            letter-spacing: 0.17em;
          }

          .st-heading-grid {
            gap: 18px;
            margin-bottom: 36px;
          }

          .st-heading-grid .section-title h2,
          .st-heading-grid h2 {
            font-size: clamp(31px, 8.5vw, 43px);
          }

          .st-heading-grid .section-title p,
          .st-heading-grid .section-title .subtitle {
            font-size: 13px;
            line-height: 1.85;
          }

          .st-heading-aside {
            padding-left: 17px;
            font-size: 14px;
          }

          .st-story-grid {
            gap: 38px;
          }

          .st-intro {
            margin-bottom: 29px;
            font-size: 13px;
          }

          .st-entry {
            grid-template-columns: 30px minmax(0, 1fr);
            gap: 15px;
            padding-bottom: 29px;
          }

          .st-timeline-line {
            left: 14px;
          }

          .st-node {
            width: 26px;
            height: 26px;
            font-size: 9px;
          }

          .st-entry-content p {
            font-size: 13px;
            line-height: 1.9;
          }

          .st-image-column {
            padding: 0 8px 47px 7px;
          }

          .st-photo-frame {
            height: 440px;
            min-height: 380px;
          }

          .st-photo-stamp {
            top: 22px;
            right: -10px;
            width: 84px;
            height: 84px;
          }

          .st-photo-stamp span {
            font-size: 20px;
          }

          .st-photo-stamp small {
            font-size: 8px;
          }

          .st-photo-side-note {
            top: 83px;
            left: -1px;
            font-size: 9px;
          }

          .st-photo-caption {
            right: 17px;
            bottom: 20px;
            left: 17px;
          }

          .st-photo-caption strong {
            font-size: 25px;
          }

          .st-diya {
            right: 19px;
            bottom: 0;
            width: 66px;
            height: 66px;
            font-size: 27px;
          }

          .st-devotional-banner {
            grid-template-columns: 1fr;
            gap: 13px;
            margin-top: 47px;
            padding: 26px 8px;
          }

          .st-banner-line {
            width: 60px;
            margin-inline: auto;
          }

          .st-banner-line:last-child {
            transform: none;
          }

          .st-blessing {
            font-size: clamp(25px, 7.5vw, 34px);
          }

          .st-blessing-subtitle {
            font-size: 8px;
            letter-spacing: 0.16em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spiritual-story *,
          .spiritual-story *::before,
          .spiritual-story *::after {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="st-background-mark" aria-hidden="true">
        ॐ
      </div>

      <div className="st-shell">
        <div className="st-topline st-eyebrow">
          {t.aboutSubtitle}
        </div>

        <div className="st-heading-grid">
          <div>
            <Reveal>
              <SectionTitle
                title={t.aboutTitle}
                subtitle={t.aboutSubtitle}
              />
            </Reveal>
          </div>

          <div className="st-heading-aside">
            <span aria-hidden="true">✳</span>
            {t.heroBlessing || "जय संतोषी माता"}
          </div>
        </div>

        <div className="st-story-grid">
          <div className="st-story-copy">
            <p className="st-intro">
              {t.aboutPara1}
            </p>

            <div className="st-timeline" ref={timelineRef}>
              <div className="st-timeline-line" aria-hidden="true" />

              <article className="st-entry">
                <div className="st-node">01</div>
                <div className="st-entry-content">
                  <span className="st-entry-kicker">01 / श्रद्धा</span>
                  <p>{t.aboutPara1}</p>
                </div>
              </article>

              <article className="st-entry">
                <div className="st-node">02</div>
                <div className="st-entry-content">
                  <span className="st-entry-kicker">02 / भक्ति</span>
                  <p>{t.aboutPara2}</p>
                </div>
              </article>

              <article className="st-entry">
                <div className="st-node">03</div>
                <div className="st-entry-content">
                  <span className="st-entry-kicker">03 / आस्था</span>
                  <p>{t.aboutPara3}</p>
                </div>
              </article>
            </div>
          </div>

          <div className="st-image-column">
            <div className="st-photo-side-note" aria-hidden="true">
              FAITH · DEVOTION · PEACE
            </div>

            <div className="st-photo-frame" ref={imageRef}>
              <img
                ref={imageInnerRef}
                className="st-photo-image"
                src={templeImages.temple.src}
                alt={t.galleryImages.temple}
                loading="lazy"
              />

              <div className="st-photo-caption">
                <div>
                  <small>SHRI SANTOSHI MATA MANDIR</small>
                  <strong>{t.galleryImages.temple}</strong>
                </div>
              </div>
            </div>

            <div className="st-photo-stamp" aria-label="Devotional symbol">
              <span>ॐ</span>
              <small>शुभम्</small>
            </div>

            <div className="st-diya" ref={diyaRef} aria-hidden="true">
              🪔
            </div>
          </div>
        </div>

        <div className="st-devotional-banner" ref={blessingRef}>
          <div className="st-decorative-dot" aria-hidden="true" />

          <div className="st-banner-line" aria-hidden="true" />

          <div>
            <p className="st-blessing">
              {t.heroBlessing || "जय संतोषी माता"}
            </p>
            <p className="st-blessing-subtitle">
              Faith · Peace · Blessings
            </p>
          </div>

          <div className="st-banner-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
