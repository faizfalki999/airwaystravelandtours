/**
 * Airways Travel & Tours - Luxury Aesthetics & Interactive Micro-Animations
 * Adds smooth scroll progress, floating concierge hub, back-to-top FAB, 3D card tilt,
 * tactile ripple effects, and subtle ambient flight details across every page.
 */

(function () {
  'use strict';

  function initLuxuryEnhancements() {
    // ------------------------------------------------------------------------
    // 1. Injected Top Scroll Progress Bar
    // ------------------------------------------------------------------------
    let progressBar = document.querySelector('.lux-scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'lux-scroll-progress';
      progressBar.setAttribute('aria-hidden', 'true');
      document.body.prepend(progressBar);
    }

    function updateScrollProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = Math.min(progress, 100).toFixed(2) + '%';
      }
    }

    // ------------------------------------------------------------------------
    // 2. Injected Floating Concierge Hub & Back-to-Top Button
    // ------------------------------------------------------------------------
    let floatingCluster = document.querySelector('.lux-floating-cluster');
    if (!floatingCluster) {
      floatingCluster = document.createElement('div');
      floatingCluster.className = 'lux-floating-cluster';
      floatingCluster.setAttribute('aria-label', 'Direct Concierge & Quick Navigation');

      floatingCluster.innerHTML = `
        <button class="lux-back-to-top" id="lux-back-to-top" aria-label="Scroll back to top" title="Back to top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>

        <a href="https://wa.me/923390020309?text=Hello%20Airways%20Travel,%20I%20would%20like%20to%20inquire%20about%20a%20booking" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="lux-concierge-btn" 
           aria-label="Direct WhatsApp Concierge Chat">
          <div class="lux-concierge-icon-box">
            <svg viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.956.818 2.802.818 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.804-5.773-5.804zm8.681 5.766c.002 4.802-3.904 8.712-8.706 8.712-.042 0-.083-.001-.125-.002-1.503-.032-2.924-.46-4.18-1.229l-4.721 1.238 1.26-4.598c-.854-1.332-1.338-2.898-1.34-4.551-.002-4.804 3.904-8.715 8.707-8.715 4.802 0 8.705 3.91 8.705 8.715z"/>
            </svg>
            <span class="lux-pulse-beacon" title="Concierge Online"></span>
          </div>
          <div class="lux-concierge-text">
            <span class="lux-concierge-title">24/7 Concierge</span>
            <span class="lux-concierge-sub">Live Support</span>
          </div>
        </a>
      `;
      document.body.appendChild(floatingCluster);
    }

    const backToTopBtn = document.getElementById('lux-back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    function toggleBackToTop() {
      if (!backToTopBtn) return;
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('is-shown');
      } else {
        backToTopBtn.classList.remove('is-shown');
      }
    }

    // Scroll listener with RAF throttle
    let isTicking = false;
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          toggleBackToTop();
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });

    // Run initial check
    updateScrollProgress();
    toggleBackToTop();

    // ------------------------------------------------------------------------
    // 3. Subtle Ambient Jet Flight Silhouette in Sky
    // ------------------------------------------------------------------------
    let skyPlane = document.querySelector('.lux-sky-plane');
    if (!skyPlane) {
      skyPlane = document.createElement('div');
      skyPlane.className = 'lux-sky-plane';
      skyPlane.setAttribute('aria-hidden', 'true');
      skyPlane.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      `;
      document.body.appendChild(skyPlane);
    }

    // ------------------------------------------------------------------------
    // 4. Tactile Ripple Effect on Buttons & Action Elements
    // ------------------------------------------------------------------------
    document.addEventListener('click', (e) => {
      const target = e.target.closest(
        '.btn-book-hero, .contact-submit-btn, .quote-submit-btn, .country-submit-btn, .drawer-cta-btn, .dest-inquire-btn, .pkg-inquire-btn, .hero-cta, .hero-cta-btn, .faq-filter-btn, .visa-tab-btn'
      );
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('lux-ripple');

      const existingRipple = target.querySelector('.lux-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      target.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    });

    // ------------------------------------------------------------------------
    // 5. Smooth 3D Card Hover Depth & Glare
    // ------------------------------------------------------------------------
    const interactiveCards = document.querySelectorAll(
      '.service-card-item, .destination-card, .visa-card, .contact-feature-card, .why-card, .approach-pillar-card, .vision-card, .showcase-card, .faq-category-card'
    );

    interactiveCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        // Skip on mobile / touch
        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLuxuryEnhancements);
  } else {
    initLuxuryEnhancements();
  }
})();
