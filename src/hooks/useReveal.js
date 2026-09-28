import { useEffect, useRef } from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades an element in once it scrolls into view.
 * Returns a ref; the element keeps `.reveal` until it enters, then gains `.is-in`.
 */
export function useReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced() || !('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }

    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        io.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}
