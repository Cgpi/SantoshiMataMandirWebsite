import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, visible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
