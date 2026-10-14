import { useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Navigation,
  Sparkles,
  ArrowUpRight,
  Compass,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "../context/LanguageContext";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { MAPS_URL } from "../translations/translations";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  const contactItems = [
    {
      id: "address",
      icon: MapPin,
      label: t.contactAddressLabel,
      value: t.contactAddressValue,
      available: true,
    },
    {
      id: "phone",
      icon: Phone,
      label: t.contactPhoneLabel,
      value: t.contactPhonePlaceholder,
      available: false,
    },
    {
      id: "email",
      icon: Mail,
      label: t.contactEmailLabel,
      value: t.contactEmailPlaceholder,
      available: false,
    },
    {
      id: "hours",
      icon: Clock,
      label: t.contactHoursLabel,
      value: t.contactHoursPlaceholder,
      available: false,
    },
    {
      id: "trust",
      icon: Building,
      label: t.contactTrustLabel,
      value: t.contactTrustPlaceholder,
      available: false,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      gsap.from(".ct-heading", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ct-heading",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".ct-main-panel", {
        y: 38,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ct-main-panel",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".ct-contact-item", {
        x: -22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ct-contact-list",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".ct-note-panel", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ct-note-panel",
          start: "top 88%",
          once: true,
        },
      });

      gsap.to(".ct-floating-symbol", {
        y: -10,
        rotation: 8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".ct-gold-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ct-main-panel",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="ct-section"
      id="contact"
      ref={sectionRef}
    >
      <style>{`
        .ct-section {
          --ct-cream: #FFF8E9;
          --ct-paper: #FFFDF7;
          --ct-red: #8B101C;
          --ct-red-dark: #590914;
          --ct-gold: #C89B3C;
          --ct-gold-light: #E9D49B;
          --ct-ink: #3E2420;

          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(76px, 9vw, 125px) 0;
          background: var(--ct-cream);
          color: var(--ct-ink);
        }

        .ct-section *,
        .ct-section *::before,
        .ct-section *::after {
          box-sizing: border-box;
        }

        .ct-container {
          width: min(1160px, calc(100% - 48px));
          margin-inline: auto;
        }

        .ct-watermark {
          position: absolute;
          top: 45px;
          left: -55px;
          z-index: -1;
          color: rgba(139, 16, 28, 0.035);
          font-family: Georgia, serif;
          font-size: clamp(220px, 34vw, 450px);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .ct-heading {
          margin-bottom: 50px;
          text-align: center;
        }

        .ct-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
          color: var(--ct-red);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ct-eyebrow svg {
          color: var(--ct-gold);
        }

        .ct-section .ct-heading .section-title {
          margin-bottom: 0;
        }

        .ct-section .ct-heading .section-title h2 {
          color: var(--ct-red-dark);
          font-family: "Noto Serif", Georgia, serif;
          font-size: clamp(32px, 4vw, 49px);
          line-height: 1.2;
        }

        .ct-section .ct-heading .section-title p,
        .ct-section .ct-heading .section-title .subtitle {
          color: #795D50;
          line-height: 1.85;
        }

        .ct-main-panel {
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(300px, 0.88fr);
          min-width: 0;
          border: 1px solid rgba(200, 155, 60, 0.48);
          background: var(--ct-paper);
          box-shadow: 0 24px 70px rgba(74, 31, 24, 0.075);
        }

        .ct-details-panel {
          min-width: 0;
          padding: clamp(25px, 4vw, 48px);
        }

        .ct-panel-heading {
          display: flex;
          align-items: flex-start;
          gap: 17px;
          margin-bottom: 30px;
        }

        .ct-heading-icon {
          display: grid;
          width: 49px;
          height: 49px;
          flex: 0 0 49px;
          place-items: center;
          border: 1px solid rgba(200, 155, 60, 0.65);
          color: var(--ct-red);
          background: var(--ct-cream);
        }

        .ct-panel-heading small {
          display: block;
          margin-bottom: 7px;
          color: #A47B3C;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }

        .ct-panel-heading h3 {
          margin: 0;
          color: var(--ct-red-dark);
          font-family: "Noto Serif", Georgia, serif;
          font-size: clamp(23px, 2.5vw, 30px);
          font-weight: 600;
          line-height: 1.3;
        }

        .ct-gold-line {
          width: 100%;
          height: 1px;
          margin-bottom: 27px;
          background: linear-gradient(
            to right,
            var(--ct-gold),
            rgba(200, 155, 60, 0.08)
          );
        }

        .ct-contact-list {
          display: flex;
          flex-direction: column;
        }

        .ct-contact-item {
          display: grid;
          grid-template-columns: 43px minmax(0, 1fr);
          align-items: start;
          gap: 16px;
          padding: 19px 0;
          border-bottom: 1px solid rgba(200, 155, 60, 0.23);
        }

        .ct-contact-item:first-child {
          padding-top: 0;
        }

        .ct-contact-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid rgba(200, 155, 60, 0.42);
          background: var(--ct-cream);
          color: var(--ct-red);
          transition:
            color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease;
        }

        .ct-contact-item:hover .ct-contact-icon {
          transform: translateY(-2px);
          background: var(--ct-red);
          color: #fff8e9;
        }

        .ct-contact-copy {
          min-width: 0;
          padding-top: 2px;
        }

        .ct-contact-label {
          display: block;
          margin-bottom: 7px;
          color: #A47B3C;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .ct-contact-value {
          display: block;
          overflow-wrap: anywhere;
          color: #5F4238;
          font-size: 14px;
          line-height: 1.8;
        }

        .ct-pending .ct-contact-value {
          color: #927E70;
        }

        .ct-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          color: #9A856F;
          font-size: 9px;
          letter-spacing: 0.05em;
        }

        .ct-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C8A96A;
        }

        .ct-directions {
          display: flex;
          min-height: 51px;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 28px;
          padding: 15px 19px;
          border: 1px solid var(--ct-red);
          background: var(--ct-red);
          color: var(--ct-cream);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            transform 0.3s ease;
        }

        .ct-directions:hover {
          transform: translateY(-2px);
          border-color: var(--ct-red-dark);
          background: var(--ct-red-dark);
        }

        .ct-directions-label {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .ct-directions-label svg {
          color: var(--ct-gold-light);
        }

        .ct-directions-arrow {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border: 1px solid rgba(255, 248, 233, 0.4);
          border-radius: 50%;
        }

        .ct-note-panel {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          padding: clamp(30px, 4vw, 47px);
          background: var(--ct-red-dark);
          color: var(--ct-cream);
        }

        .ct-note-panel::before {
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(233, 212, 155, 0.28);
          content: "";
          pointer-events: none;
        }

        .ct-note-panel::after {
          position: absolute;
          right: -95px;
          bottom: -110px;
          width: 280px;
          height: 280px;
          border: 1px solid rgba(233, 212, 155, 0.13);
          border-radius: 50%;
          box-shadow:
            0 0 0 25px rgba(233, 212, 155, 0.035),
            0 0 0 50px rgba(233, 212, 155, 0.025);
          content: "";
          pointer-events: none;
        }

        .ct-note-top,
        .ct-note-message,
        .ct-note-bottom {
          position: relative;
          z-index: 1;
        }

        .ct-note-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .ct-note-label {
          color: var(--ct-gold-light);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }

        .ct-note-symbol {
          display: grid;
          width: 45px;
          height: 45px;
          place-items: center;
          border: 1px solid rgba(233, 212, 155, 0.55);
          border-radius: 50%;
          color: var(--ct-gold-light);
        }

        .ct-floating-symbol {
          position: absolute;
          top: 22%;
          right: 30px;
          color: rgba(233, 212, 155, 0.28);
          font-family: Georgia, serif;
          font-size: 39px;
          pointer-events: none;
        }

        .ct-note-message {
          margin: 50px 0;
        }

        .ct-note-om {
          display: block;
          margin-bottom: 20px;
          color: var(--ct-gold-light);
          font-family: Georgia, serif;
          font-size: clamp(43px, 5vw, 65px);
          line-height: 1;
        }

        .ct-note-message h3 {
          max-width: 360px;
          margin: 0 0 22px;
          color: var(--ct-cream);
          font-family: "Noto Serif", Georgia, serif;
          font-size: clamp(27px, 3.2vw, 39px);
          font-weight: 500;
          line-height: 1.45;
        }

        .ct-note-message p {
          max-width: 380px;
          margin: 0;
          color: rgba(255, 248, 233, 0.79);
          font-size: 13px;
          line-height: 2;
        }

        .ct-note-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 25px 0;
          color: var(--ct-gold-light);
        }

        .ct-note-divider::before,
        .ct-note-divider::after {
          width: 32px;
          height: 1px;
          background: rgba(233, 212, 155, 0.5);
          content: "";
        }

        .ct-note-bottom {
          padding-top: 23px;
          border-top: 1px solid rgba(233, 212, 155, 0.28);
        }

        .ct-note-bottom span {
          display: block;
          color: var(--ct-gold-light);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .ct-note-bottom strong {
          display: block;
          margin-top: 10px;
          color: var(--ct-cream);
          font-family: "Noto Serif", Georgia, serif;
          font-size: 19px;
          font-weight: 500;
        }

        .ct-bottom-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 42px;
          color: #A47B3C;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-align: center;
        }

        .ct-bottom-ornament::before,
        .ct-bottom-ornament::after {
          width: min(75px, 12vw);
          height: 1px;
          background: rgba(200, 155, 60, 0.65);
          content: "";
        }

        @media (min-width: 1400px) {
          .ct-container {
            width: min(1200px, calc(100% - 80px));
          }
        }

        @media (max-width: 900px) {
          .ct-main-panel {
            grid-template-columns: 1fr;
          }

          .ct-note-panel {
            min-height: 390px;
          }

          .ct-note-message {
            margin: 35px 0;
          }

          .ct-note-message h3 {
            max-width: 500px;
          }
        }

        @media (max-width: 560px) {
          .ct-section {
            padding: 68px 0;
          }

          .ct-container {
            width: calc(100% - 32px);
          }

          .ct-heading {
            margin-bottom: 32px;
          }

          .ct-section .ct-heading .section-title h2 {
            font-size: clamp(29px, 8vw, 38px);
          }

          .ct-details-panel {
            padding: 24px 19px;
          }

          .ct-panel-heading {
            gap: 12px;
            margin-bottom: 23px;
          }

          .ct-heading-icon {
            width: 42px;
            height: 42px;
            flex-basis: 42px;
          }

          .ct-panel-heading h3 {
            font-size: 23px;
          }

          .ct-contact-item {
            grid-template-columns: 36px minmax(0, 1fr);
            gap: 12px;
            padding: 16px 0;
          }

          .ct-contact-icon {
            width: 36px;
            height: 36px;
          }

          .ct-contact-icon svg {
            width: 17px;
            height: 17px;
          }

          .ct-contact-value {
            font-size: 13px;
          }

          .ct-directions {
            padding: 13px 14px;
            font-size: 11px;
          }

          .ct-note-panel {
            min-height: 380px;
            padding: 29px;
          }

          .ct-note-panel::before {
            inset: 10px;
          }

          .ct-note-message {
            margin: 37px 0;
          }

          .ct-note-message h3 {
            font-size: 29px;
          }

          .ct-note-message p {
            font-size: 12px;
          }

          .ct-note-bottom strong {
            font-size: 17px;
          }

          .ct-bottom-ornament {
            gap: 9px;
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-section *,
          .ct-section *::before,
          .ct-section *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="ct-watermark" aria-hidden="true">
        ॐ
      </div>

      <div className="ct-container">
        <div className="ct-heading">
          <div className="ct-eyebrow">
            <Sparkles size={14} />
            <span>We welcome you</span>
            <Sparkles size={14} />
          </div>

          <Reveal>
            <SectionTitle
              title={t.contactTitle}
              subtitle={t.contactSubtitle}
            />
          </Reveal>
        </div>

        <div className="ct-main-panel">
          <div className="ct-details-panel">
            <div className="ct-panel-heading">
              <div className="ct-heading-icon">
                <Compass size={23} />
              </div>

              <div>
                <small>VISIT OUR TEMPLE</small>
                <h3>{t.contactTitle}</h3>
              </div>
            </div>

            <div className="ct-gold-line" />

            <div className="ct-contact-list">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`ct-contact-item ${
                      item.available ? "" : "ct-pending"
                    }`}
                  >
                    <div className="ct-contact-icon">
                      <Icon size={19} />
                    </div>

                    <div className="ct-contact-copy">
                      <span className="ct-contact-label">
                        {item.label}
                      </span>

                      <span className="ct-contact-value">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-directions"
            >
              <span className="ct-directions-label">
                <Navigation size={18} />
                {t.getDirections}
              </span>

              <span className="ct-directions-arrow">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          <div className="ct-note-panel">
            <div className="ct-note-top">
              <span className="ct-note-label">
                A place of faith & devotion
              </span>

              <div className="ct-note-symbol">
                <Sparkles size={20} />
              </div>
            </div>

            <span className="ct-floating-symbol" aria-hidden="true">
              ✳
            </span>

            <div className="ct-note-message">
              <span className="ct-note-om" aria-hidden="true">
                ॐ
              </span>

              <h3>जय संतोषी माता</h3>

              <div className="ct-note-divider" aria-hidden="true">
                ✧
              </div>

              <p>{t.contactNote}</p>
            </div>

            <div className="ct-note-bottom">
              <span>With devotion and faith</span>
              <strong>Shri Santoshi Mata Mandir</strong>
            </div>
          </div>
        </div>

        <div className="ct-bottom-ornament">
          <span>✧</span>
          <span>YOUR VISIT IS A BLESSING</span>
          <span>✧</span>
        </div>
      </div>
    </section>
  );
}