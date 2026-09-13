/**
 * AIRWAYS TRAVEL & TOURS (UIXSHUVO)
 * Interactive Flight Scroll Animation & Client Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const heroSection = document.getElementById('hero');
  const airplaneStage = document.getElementById('airplane-stage');
  const airplaneWrapper = document.getElementById('airplane-wrapper');
  const heroLeftColumn = document.getElementById('hero-left-column');
  const heroCornerCard = document.getElementById('hero-corner-card');
  const heroSkyImg = document.getElementById('hero-sky-img');
  const cloudWisps = document.getElementById('hero-cloud-wisps');

  // --- 1. Continuous Scroll-Driven Flight Path Controller ---
  // The user controls the entire flight path directly with the scrollbar/wheel/touch:
  // - Top (clean bg): Plane is back in the distance along its approach path; UI is hidden.
  // - Scrolling down: Plane flies smoothly IN along its natural approach corridor (scaling & banking in).
  // - Mid scroll: Hero resting station (headline & CTA 100% visible & clickable).
  // - Continuing scroll: Plane accelerates along its climb corridor up into the upper clouds & flies away.
  // - Scrolling up: Reverses continuously with zero lag.

  const heroNav = document.querySelector('.hero-nav');
  const scrollHint = document.getElementById('hero-scroll-hint');

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function updateFlightOnScroll() {
    if (!heroSection) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 768;

    // Arrival track distance: pinned distance at the top for the plane to fly in
    const arrivalTrack = isMobile ? 260 : 360;

    // --- Vector Coordinates ---
    // Approach Vector (from distance lower-left along its flight path):
    const startX = isMobile ? -window.innerWidth * 0.70 : -420;
    const startY = isMobile ? window.innerHeight * 0.32 : 340;
    const startScale = 0.40;
    const startRot = -14;

    // Hero Resting Stance (center):
    const midX = 0;
    const midY = 0;
    const midScale = 1.0;
    const midRot = -11;

    // Departure Vector (climbing up and right into clouds as page scrolls down):
    const endX = isMobile ? window.innerWidth * 0.75 : 500;
    const endY = isMobile ? -window.innerHeight * 0.48 : -460;
    const endScale = 1.35;
    const endRot = -18;

    let planeX, planeY, planeScale, planeRot, planeOpacity;
    let navOpacity, navY;
    let textOpacity, textY;
    let hintOpacity;

    if (scrollY <= arrivalTrack) {
      // ----------------------------------------------------
      // Phase 1: Arrival (0 -> arrivalTrack)
      // Background is steady; plane flies in along its natural vector;
      // headline and nav appear; hint fades out.
      // ----------------------------------------------------
      const arrivalProgress = clamp(scrollY / arrivalTrack, 0, 1);
      const t = easeOutCubic(arrivalProgress);

      planeX = startX + (midX - startX) * t;
      planeY = startY + (midY - startY) * t;
      planeScale = startScale + (midScale - startScale) * t;
      planeRot = startRot + (midRot - startRot) * t;
      planeOpacity = clamp((arrivalProgress - 0.04) / 0.70, 0, 1);

      // Nav fades down into view
      navOpacity = clamp((arrivalProgress - 0.15) / 0.65, 0, 1);
      navY = (1 - navOpacity) * -28;

      // Headline and CTA slide up into view
      textOpacity = clamp((arrivalProgress - 0.20) / 0.65, 0, 1);
      textY = (1 - textOpacity) * 40;

      // Scroll hint visible only on clean background
      hintOpacity = clamp(1.0 - arrivalProgress / 0.30, 0, 1);

    } else {
      // ----------------------------------------------------
      // Phase 2: Page is scrolling down, and AS the page scrolls down,
      // the plane takes off and flies out into the upper clouds!
      // ----------------------------------------------------
      const scrollBeyond = scrollY - arrivalTrack;
      const departDistance = window.innerHeight * 0.75;
      const departProgress = clamp(scrollBeyond / departDistance, 0, 1);
      const t = easeInOutQuad(departProgress);

      planeX = midX + (endX - midX) * t;
      planeY = midY + (endY - midY) * t;
      planeScale = midScale + (endScale - midScale) * t;
      planeRot = midRot + (endRot - midRot) * t;

      // Dissolve into upper clouds as it reaches the top
      if (t > 0.40) {
        planeOpacity = clamp(1.0 - (t - 0.40) / 0.60, 0, 1);
      } else {
        planeOpacity = 1.0;
      }

      navOpacity = 1.0;
      navY = 0;

      // Text glides with subtle upward parallax as page scrolls
      textOpacity = clamp(1.0 - t * 1.5, 0, 1);
      textY = -t * 80;

      hintOpacity = 0;
    }

    // Apply values to DOM
    if (airplaneWrapper) {
      airplaneWrapper.style.transform = `translate3d(${planeX.toFixed(1)}px, ${planeY.toFixed(1)}px, 0) rotate(${planeRot.toFixed(1)}deg) scale(${planeScale.toFixed(3)})`;
      airplaneWrapper.style.opacity = planeOpacity.toFixed(3);
    }

    if (heroNav) {
      heroNav.style.opacity = navOpacity.toFixed(3);
      heroNav.style.transform = `translate3d(0, ${navY.toFixed(1)}px, 0)`;
      heroNav.style.pointerEvents = navOpacity > 0.5 ? 'auto' : 'none';
    }

    if (heroLeftColumn) {
      heroLeftColumn.style.opacity = textOpacity.toFixed(3);
      heroLeftColumn.style.transform = `translate3d(0, ${textY.toFixed(1)}px, 0)`;
      heroLeftColumn.style.pointerEvents = textOpacity > 0.5 ? 'auto' : 'none';
    }

    if (scrollHint) {
      scrollHint.style.opacity = hintOpacity.toFixed(3);
      scrollHint.style.pointerEvents = hintOpacity > 0.2 ? 'auto' : 'none';
    }

    // Background stays rock-solid: no downward translation!
    if (heroSkyImg) {
      heroSkyImg.style.transform = 'none';
    }
    if (cloudWisps) {
      cloudWisps.style.transform = 'none';
    }
  }

  // Initial call on page load
  updateFlightOnScroll();

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        updateFlightOnScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateFlightOnScroll();
  });

  // Click on scroll hint smoothly scrolls to reveal hero
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 768;
      const arrivalTrack = isMobile ? 260 : 360;
      window.scrollTo({ top: arrivalTrack, behavior: 'smooth' });
    });
  }

  // --- 4. Smooth Navigation & Button Scrolls ---
  const heroCta = document.getElementById('hero-cta');
  const cornerKnowMore = document.getElementById('corner-know-more');
  const navBookTripBtn = document.getElementById('nav-book-trip-btn');
  const bookingModal = document.getElementById('booking-modal');

  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('features');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (cornerKnowMore) {
    cornerKnowMore.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('features');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (navBookTripBtn) {
    navBookTripBtn.addEventListener('click', () => {
      if (bookingModal) {
        bookingModal.classList.add('active');
        bookingModal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  // Discover More Smooth Scroll
  const discoverMore = document.getElementById('discover-more');
  if (discoverMore) {
    discoverMore.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 5. Interactive Flight Experience Video Modal ---
  const btnPlayVideo = document.getElementById('btn-play-video');
  const flightVideoModal = document.getElementById('flight-video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoBackdrop = document.getElementById('video-backdrop');
  const modalReserveBtn = document.getElementById('modal-reserve-btn');

  function openVideoModal() {
    if (!flightVideoModal) return;
    flightVideoModal.classList.add('active');
    flightVideoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!flightVideoModal) return;
    flightVideoModal.classList.remove('active');
    flightVideoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnPlayVideo) {
    btnPlayVideo.addEventListener('click', openVideoModal);
  }
  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }
  if (videoBackdrop) {
    videoBackdrop.addEventListener('click', closeVideoModal);
  }
  if (modalReserveBtn) {
    modalReserveBtn.addEventListener('click', () => {
      closeVideoModal();
      const target = document.getElementById('features');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- 6. Mobile Drawer Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta-btn');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', closeDrawer);
    }

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && 
          !mobileDrawer.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // --- 7. Quick Booking Bag Modal ---
  const cartToggle = document.getElementById('cart-toggle');
  const modalClose = document.getElementById('modal-close');
  const modalExploreBtn = document.getElementById('modal-explore-btn');

  function openModal() {
    if (!bookingModal) return;
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
  }

  if (cartToggle && bookingModal) {
    cartToggle.addEventListener('click', openModal);

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    if (modalExploreBtn) {
      modalExploreBtn.addEventListener('click', () => {
        closeModal();
        const features = document.getElementById('features');
        if (features) {
          features.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // Escape key listener for all modals and drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      closeVideoModal();
    }
  });
});
