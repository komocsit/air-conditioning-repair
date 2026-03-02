import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function reinitSwiper() {
  if (typeof window === 'undefined' || !window.Swiper) return;

  // Destroy all existing Swiper instances to avoid conflicts
  if (window._swiperInstances) {
    window._swiperInstances.forEach(s => { try { s.destroy(true, true); } catch(e) {} });
  }
  window._swiperInstances = [];

  // Strip baked-in inline styles that WordPress pre-rendered so Swiper can start fresh
  document.querySelectorAll('.swiper-wrapper').forEach(el => {
    el.removeAttribute('style');
  });
  document.querySelectorAll('.swiper-slide').forEach(el => {
    el.style.removeProperty('transform');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('opacity');
    el.style.removeProperty('width');
  });
  document.querySelectorAll('.swiper-container').forEach(el => {
    el.style.removeProperty('overflow');
  });

  // === CAROUSEL CLASSES SLIDER (exact original config) ===
  document.querySelectorAll('.carousel-classes').forEach(el => {
    const carousel = new window.Swiper(el, {
      slidesPerView: '4',
      spaceBetween: 30,
      loop: true,
      draggable: true,
      navigation: {
        prevEl: '.arrow-prev',
        nextEl: '.arrow-next',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640:  { slidesPerView: 1, spaceBetween: 15 },
        768:  { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
    });
    window._swiperInstances.push(carousel);
  });

  // === MAIN HERO SLIDER (exact original config) ===
  const heroEl = document.querySelector('.main-slider');
  if (heroEl) {
    const hero = new window.Swiper('.main-slider', {
      slidesPerView: '1',
      spaceBetween: 0,
      speed: 1000,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      draggable: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        prevEl: '.button-prev',
        nextEl: '.button-next',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    window._swiperInstances.push(hero);
  }

  // === DATA-BACKGROUND images (WordPress theme feature) ===
  document.querySelectorAll('[data-background]').forEach(el => {
    el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')';
  });
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize on first load
    setTimeout(() => {
      reinitSwiper();
      // Initialize WOW.js on first load (elements are visibility:hidden from WordPress baked styles)
      if (typeof window.WOW === 'function') {
        try { new window.WOW({ animateClass: 'animated', offset: 0 }).init(); } catch (e) {}
      }
    }, 300);

    // Mobile Services dropdown handler (Bootstrap JS replacement)
    const handleMobileDropdown = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const toggle = e.target.closest('[data-toggle="dropdown"]');
      if (!toggle || !toggle.closest('.side-widget')) return;
      e.preventDefault();
      const parent = toggle.closest('.dropdown');
      if (!parent) return;
      const menu = parent.querySelector('.dropdown-menu');
      if (!menu) return;
      const isOpen = parent.classList.contains('show');
      // Close all open dropdowns in side-widget first
      document.querySelectorAll('.side-widget .dropdown.show').forEach(el => {
        el.classList.remove('show');
        const m = el.querySelector('.dropdown-menu');
        if (m) m.classList.remove('show');
        const t = el.querySelector('[data-toggle="dropdown"]');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      // Toggle current if it wasn't already open
      if (!isOpen) {
        parent.classList.add('show');
        menu.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };
    document.addEventListener('click', handleMobileDropdown);

    const handleRouteChange = () => {
      setTimeout(() => {
        // Remove preloader
        const preloader = document.querySelector('.preloader');
        if (preloader) preloader.style.display = 'none';

        if (window.jQuery) {
          // Reinitialize WOW.js animations
          if (typeof window.WOW === 'function') {
            try { new window.WOW({ animateClass: 'animated', offset: 0 }).init(); } catch (e) {}
          }
          // Close mobile menu on navigate
          window.jQuery('.side-widget').removeClass('active');
          window.jQuery('.hamburger-menu').removeClass('open');
          window.jQuery('body').removeClass('overflow');
          window.jQuery(window).trigger('scroll');
        }
        // Close any open mobile dropdowns on navigate
        document.querySelectorAll('.side-widget .dropdown.show').forEach(el => {
          el.classList.remove('show');
          const m = el.querySelector('.dropdown-menu');
          if (m) m.classList.remove('show');
        });

        // Reinitialize Swiper sliders
        reinitSwiper();
      }, 150);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      document.removeEventListener('click', handleMobileDropdown);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Intercept all form submissions - prevent redirect, show success message
    const handleFormSubmit = (e) => {
      const form = e.target.closest('form');
      if (!form) return;
      e.preventDefault();
      e.stopImmediatePropagation();

      // Remove any CF7 validation error classes
      form.querySelectorAll('.wpcf7-not-valid').forEach(el => el.classList.remove('wpcf7-not-valid'));
      form.querySelectorAll('.wpcf7-not-valid-tip').forEach(el => el.remove());

      // Find or create a response output div inside this form's container
      const container = form.closest('.wpcf7') || form.parentElement;
      let output = container.querySelector('.wpcf7-response-output');
      if (!output) {
        output = document.createElement('div');
        output.className = 'wpcf7-response-output';
        form.appendChild(output);
      }

      // Reset fields
      form.querySelectorAll('input:not([type=hidden]):not([type=submit]), textarea').forEach(el => {
        el.value = '';
      });

      // Show success message styled with site brand color
      output.removeAttribute('aria-hidden');
      output.style.cssText = 'display:block; border-color:#0d7ebf; color:#0d7ebf; background:#eaf5fd; margin:1em 0; padding:0.75em 1.25em; border:2px solid #0d7ebf; border-radius:4px; font-weight:500;';
      output.textContent = 'Thank you! Your message has been sent. We will get back to you shortly.';
    };

    document.addEventListener('submit', handleFormSubmit, true);
    return () => {
      document.removeEventListener('submit', handleFormSubmit, true);
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}