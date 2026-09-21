import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

// Smooth cubic/exponential easing curve for uniform, fluid scrolling momentum
export const SMOOTH_SCROLL_EASING = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Initializes Lenis smooth scrolling engine.
 * Ensures whole-website scrolling is fluid, consistent, and moves at the exact same pace.
 */
export function initSmoothScroll(): Lenis {
  if (typeof window === 'undefined') {
    return null as unknown as Lenis;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    lerp: 0.085, // Silky, fluid inertia momentum
    duration: 1.2,
    easing: SMOOTH_SCROLL_EASING,
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2,
    infinite: false,
  });

  // Expose global reference on window for convenience
  (window as unknown as { __lenis: Lenis }).__lenis = lenisInstance;

  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Intercept all in-page anchor links (#hero, #services, #branches, etc.)
  // so that clicks glide smoothly to the target at the exact same pace
  const handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest('a[href*="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.startsWith('tel:') || href.startsWith('mailto:')) return;

    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const hash = href.slice(hashIndex);
    if (!hash || hash === '#') return;

    const targetElement = document.querySelector(hash);
    if (targetElement) {
      e.preventDefault();
      lenisInstance?.scrollTo(targetElement as HTMLElement, {
        offset: -75, // Navbar clearance
        duration: 1.2,
        easing: SMOOTH_SCROLL_EASING,
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', hash);
      }
    }
  };

  document.addEventListener('click', handleAnchorClick);

  return lenisInstance;
}

export function getSmoothScroll(): Lenis | null {
  return lenisInstance;
}

/**
 * Programmatically scrolls to a target with fluid momentum at the website's unified pace.
 */
export function smoothScrollTo(
  target: number | HTMLElement | string,
  options?: { offset?: number; duration?: number }
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      easing: SMOOTH_SCROLL_EASING,
    });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export function pauseSmoothScroll() {
  lenisInstance?.stop();
}

export function resumeSmoothScroll() {
  lenisInstance?.start();
}

export function destroySmoothScroll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
