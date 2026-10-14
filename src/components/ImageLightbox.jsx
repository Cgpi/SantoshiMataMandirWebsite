import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

export default function ImageLightbox({ src, alt, onClose, closeLabel }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label={closeLabel || 'Close'}
        type="button"
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt={alt}
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
