import { useEffect, useRef, RefObject } from 'react';

/**
 * Animates elements with `.reveal-up` inside the returned container ref once they enter the viewport.
 * Includes a guaranteed safety fallback so no element ever remains invisible even if IntersectionObserver never fires.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(staggerMs = 90): RefObject<T> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>('.reveal-up'));
    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elements.forEach((el, idx) => {
              const t = window.setTimeout(() => {
                el.classList.add('is-visible');
              }, idx * staggerMs);
              timers.push(t);
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 }
    );

    observer.observe(root);

    // Guaranteed safety fallback so nothing stays invisible
    const fallbackTimer = window.setTimeout(() => {
      elements.forEach((el) => el.classList.add('is-visible'));
    }, 1800);

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(fallbackTimer);
    };
  }, [staggerMs]);

  return containerRef;
}
