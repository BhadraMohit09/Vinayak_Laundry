import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      document.querySelectorAll('.reveal-on-scroll, .reveal-scale').forEach((el) => {
        if (!el.classList.contains('is-revealed') && !el.hasAttribute('data-observed')) {
          el.setAttribute('data-observed', 'true');
          observer.observe(el);
        }
      });
    };

    // Initial check and timeouts for lazy-loaded components
    observeElements();
    const timer1 = setTimeout(observeElements, 100);
    const timer2 = setTimeout(observeElements, 400);

    // Watch for dynamic DOM updates
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
