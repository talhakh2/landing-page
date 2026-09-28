import { useCallback, useEffect, useRef, useState } from 'react';

const EXIT_MS = 220;

/**
 * Modal plate for a single photograph.
 *
 * Motion: enters at scale(0.97) + opacity 0 over 220ms ease-out and leaves the
 * same way, so opening and closing trace one path. It is a modal, so it stays
 * centred rather than growing from its trigger.
 */
export default function Lightbox({ items, index, onIndex, onClose }) {
  const [state, setState] = useState('closed');
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);
  const timer = useRef(null);

  const item = items[index];

  const requestClose = useCallback(() => {
    setState('closed');
    timer.current = setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  // Enter on the next frame so the browser has a "closed" frame to animate from.
  useEffect(() => {
    restoreRef.current = document.activeElement;
    const raf = requestAnimationFrame(() => setState('open'));
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer.current);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, []);

  // Escape closes, arrows page through, Tab stays inside the dialog.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        onIndex((index + 1) % items.length);
        return;
      }
      if (e.key === 'ArrowLeft') {
        onIndex((index - 1 + items.length) % items.length);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, items.length, onIndex, requestClose]);

  if (!item) return null;

  return (
    <div
      className="lb"
      data-state={state}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <figure className="lb__figure">
        <img src={`img/work/${item.id}.webp`} alt={item.alt ?? item.title} />
      </figure>

      <div className="lb__bar">
        <div>
          <p className="lb__tag">{item.tag}</p>
          <h3 className="lb__title">{item.title}</h3>
          <p className="lb__note">{item.note}</p>
          <p className="lb__credit">
            {item.credit.author} ·{' '}
            <a href={item.credit.page} target="_blank" rel="noopener noreferrer">
              source
            </a>{' '}
            ·{' '}
            <a href={item.credit.licenseUrl} target="_blank" rel="noopener noreferrer">
              {item.credit.license}
            </a>
            {item.credit.modified ? ` · ${item.credit.modified}` : ''}
          </p>
        </div>

        <div className="lb__nav">
          <button
            className="lb__btn"
            type="button"
            onClick={() => onIndex((index - 1 + items.length) % items.length)}
            aria-label="Previous image"
          >
            ←
          </button>
          <span className="lb__count" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <button
            className="lb__btn"
            type="button"
            onClick={() => onIndex((index + 1) % items.length)}
            aria-label="Next image"
          >
            →
          </button>
          <button className="lb__btn" type="button" onClick={requestClose} ref={closeRef} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
