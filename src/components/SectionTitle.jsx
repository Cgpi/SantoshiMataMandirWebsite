import { useLanguage } from '../context/LanguageContext';

export default function SectionTitle({ title, subtitle, id }) {
  return (
    <div className="section-title" id={id}>
      <div className="section-title-ornament">
        <span className="ornament-line" />
        <span className="ornament-dot" />
        <span className="ornament-center" />
        <span className="ornament-dot" />
        <span className="ornament-line" />
      </div>
      <h2 className="section-title-heading">{title}</h2>
      {subtitle && <p className="section-title-subtitle">{subtitle}</p>}
    </div>
  );
}
