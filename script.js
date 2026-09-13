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

    // 2-Step Scroll Corridor:
    // Step 1: Pristine Empty Sky on open -> User scrolls once -> Plane & text glide in
    // Step 2: User scrolls again -> Plane accelerates & takes off into clouds, page scrolls down
    const step1Distance = isMobile ? 280 : 360;
    const step2Distance = isMobile ? 280 : 360;

    const midX = 0;
    const midY = 0;
    const midScale = 1.0;
    const midRot = -11;

    let planeX, planeY, planeScale, planeRot, planeOpacity;
    let textOpacity, textY;
    let hintOpacity;

    if (scrollY <= step1Distance) {
      // Phase 1: Materializing from Pristine Empty Sky to Center Resting Stance
      const p1 = clamp(scrollY / step1Distance, 0, 1);
      const t1 = easeOutCubic(p1);

      // Natural flight approach corridor: glides in from bottom-left / distance
      const startX = isMobile ? -260 : -440;
      const startY = isMobile ? 220 : 300;
      const startScale = 0.38;
      const startRot = -5;

      planeX = startX + (midX - startX) * t1;
      planeY = startY + (midY - startY) * t1;
      planeScale = startScale + (midScale - startScale) * t1;
      planeRot = startRot + (midRot - startRot) * t1;

      // At scrollY === 0, plane is completely invisible: PRISTINE EMPTY SKY
      // Materializes smoothly as user scrolls
      planeOpacity = clamp(t1 * 1.35, 0, 1);

      // Hero text slides up and fades in
      const textP = clamp((p1 - 0.12) / 0.88, 0, 1);
      textOpacity = easeInOutQuad(textP);
      textY = (1 - easeOutCubic(textP)) * 48;

      // Scroll hint is visible on pristine sky, fades out as user scrolls
      hintOpacity = clamp(1.0 - p1 * 2.2, 0, 1);
    } else {
      // Phase 2: Departure Vector - plane accelerates up and right into high clouds
      const p2 = clamp((scrollY - step1Distance) / step2Distance, 0, 1);
      const t2 = easeInOutQuad(p2);

      const endX = isMobile ? window.innerWidth * 0.65 : 480;
      const endY = isMobile ? -window.innerHeight * 0.45 : -440;
      const endScale = 1.4;
      const endRot = -19;

      planeX = midX + (endX - midX) * t2;
      planeY = midY + (endY - midY) * t2;
      planeScale = midScale + (endScale - midScale) * t2;
      planeRot = midRot + (endRot - midRot) * t2;

      // Plane dissolves into upper cloud layer
      planeOpacity = 1.0;
      if (t2 > 0.35) {
        planeOpacity = clamp(1.0 - (t2 - 0.35) / 0.65, 0, 1);
      }

      // Text glides up with parallax & dissolves
      textOpacity = clamp(1.0 - t2 * 1.6, 0, 1);
      textY = -t2 * 60;

      hintOpacity = 0;
    }

    // Apply transforms
    if (airplaneWrapper) {
      airplaneWrapper.style.transform = `translate3d(${planeX.toFixed(1)}px, ${planeY.toFixed(1)}px, 0) rotate(${planeRot.toFixed(1)}deg) scale(${planeScale.toFixed(3)})`;
      airplaneWrapper.style.opacity = planeOpacity.toFixed(3);
    }

    if (heroNav) {
      heroNav.style.opacity = '1';
      heroNav.style.transform = 'translate3d(0, 0, 0)';
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
  if (typeof updateShowcaseOnScroll === 'function') {
    updateShowcaseOnScroll();
  }

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        updateFlightOnScroll();
        if (typeof updateShowcaseOnScroll === 'function') {
          updateShowcaseOnScroll();
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateFlightOnScroll();
    if (typeof updateShowcaseOnScroll === 'function') {
      updateShowcaseOnScroll();
    }
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

  // ==========================================================================
  // --- 8. Interactive Country Showcase Slider (Fullscreen Expansion & Booking) ---
  // ==========================================================================
  const showcaseBgCurrent = document.getElementById('showcase-bg-current');
  const showcaseBgNext = document.getElementById('showcase-bg-next');
  const showcaseInfoPanel = document.getElementById('showcase-info-panel');
  const showcaseElevation = document.getElementById('showcase-elevation');
  const showcaseRegion = document.getElementById('showcase-region');
  const showcaseHeadline = document.getElementById('showcase-headline');
  const showcaseNarrative = document.getElementById('showcase-narrative');
  const showcaseBookBtn = document.getElementById('showcase-book-btn');
  const showcaseBtnLabel = document.getElementById('showcase-btn-label');
  const showcaseCardsDeck = document.getElementById('showcase-cards-deck');
  const showcasePrevBtn = document.getElementById('showcase-prev-btn');
  const showcaseNextBtn = document.getElementById('showcase-next-btn');
  const showcaseProgressFill = document.getElementById('showcase-progress-fill');
  const counterCurrent = document.getElementById('counter-current');

  // Country Modal Elements
  const countryModal = document.getElementById('country-package-modal');
  const countryModalClose = document.getElementById('country-modal-close');
  const countryModalTag = document.getElementById('country-modal-tag');
  const countryModalImg = document.getElementById('country-modal-img');
  const countryModalCountry = document.getElementById('country-modal-country');
  const countryModalTitle = document.getElementById('country-modal-title');
  const countryModalDuration = document.getElementById('country-modal-duration');
  const countryModalHeritage = document.getElementById('country-modal-heritage');
  const countryModalHighlights = document.getElementById('country-modal-highlights');
  const countryModalPrice = document.getElementById('country-modal-price');
  const countryBookingForm = document.getElementById('country-booking-form');
  const bookingConfirmationMsg = document.getElementById('booking-confirmation-msg');

  const destinationsData = [
    {
      id: 'skardu',
      tagElevation: '4250m',
      tagRegion: 'BALTISTAN · PAKISTAN',
      cardTag: '↑ 4250m',
      title: 'Shauser<br>Lake',
      country: 'PAKISTAN',
      cardTitle: 'Shauser Lake',
      narrative: "Surrounded by untouched snow and crisp winter air, it's the ideal spot for both beginners and seasoned skaters looking for peace, beauty, and unforgettable views.",
      heritage: "Nestled high in the Deosai alpine plateau under the shadows of K2 and Karakoram giants, Skardu is a legendary crossroad of ancient Balti kingdoms, Silk Route trading forts, and crystal-clear glacial waters.",
      image: 'assets/dest_skardu.jpg',
      price: '$2,450',
      duration: '8 Days · 7 Nights Luxury Itinerary',
      pkgTitle: 'Shauser Lake & Skardu Glacial Expedition',
      highlights: [
        { icon: '✈', title: 'Scenic Mountain Flights', desc: 'Direct mountain flight with luxury 4x4 private transit' },
        { icon: '★', title: '5-Star Lakeside Chalets', desc: 'Shangrila lakeside chalets & private mountain suites' },
        { icon: '🧭', title: 'Heritage Silk Route Tour', desc: 'Certified mountain historian guide & Deosai safari' }
      ]
    },
    {
      id: 'swiss',
      tagElevation: '3454m',
      tagRegion: 'BERNESE ALPS · SWITZERLAND',
      cardTag: '↑ 3454m',
      title: 'Jungfrau<br>Alps',
      country: 'SWITZERLAND',
      cardTitle: 'Jungfrau Alps',
      narrative: "Cradled among glacial peaks and timeless chalet villages. Experience premier cogwheel railways, alpine serenity, and world-class ski trails.",
      heritage: "A UNESCO World Heritage sanctuary where historic cogwheel rail has transported voyagers to the Top of Europe since 1898, celebrating centuries of Swiss alpine craftsmanship and hospitality.",
      image: 'assets/dest_swiss_alps.jpg',
      price: '$3,800',
      duration: '7 Days · 6 Nights Luxury Itinerary',
      pkgTitle: 'Jungfrau & Glacier Express Alpine Voyage',
      highlights: [
        { icon: '🚆', title: 'Glacier Express Excellence', desc: 'First Class panoramic rail pass across Swiss passes' },
        { icon: '★', title: 'Luxury St. Moritz Lodges', desc: 'Five-star ski-in/ski-out chalet suites with private spa' },
        { icon: '🚁', title: 'Matterhorn Heli-Tour', desc: 'Private helicopter flight over glaciers and Matterhorn' }
      ]
    },
    {
      id: 'japan',
      tagElevation: '3776m',
      tagRegion: 'HONSHU · JAPAN',
      cardTag: '↑ 3776m',
      title: 'Mount<br>Fuji',
      country: 'JAPAN',
      cardTitle: 'Mount Fuji',
      narrative: "A mesmerizing harmony of sacred pagodas, blooming cherry blossoms, and snow-capped volcanic summits across imperial ancient paths.",
      heritage: "Centuries of spiritual reverence, Zen rock gardens of Kyoto, imperial shogunate castles, and UNESCO-honored Kaiseki gastronomy passed down through generations.",
      image: 'assets/dest_japan.jpg',
      price: '$4,200',
      duration: '10 Days · 9 Nights Luxury Itinerary',
      pkgTitle: 'Imperial Kyoto & Mount Fuji Onsen Escape',
      highlights: [
        { icon: '🚅', title: 'Shinkansen Gran Class', desc: 'Reserved bullet train travel between Tokyo, Fuji & Kyoto' },
        { icon: '♨', title: 'Private Onsen Ryokan', desc: 'Authentic tatami suites with private hot spring baths' },
        { icon: '🍵', title: 'Exclusive Tea Ceremony', desc: 'Private tea master ceremony & geiko cultural performance' }
      ]
    },
    {
      id: 'greece',
      tagElevation: '330m',
      tagRegion: 'CYCLADES · GREECE',
      cardTag: '↑ 330m',
      title: 'Santorini<br>Caldera',
      country: 'GREECE',
      cardTitle: 'Santorini Caldera',
      narrative: "Iconic whitewashed villas and sapphire domes cascading down dramatic volcanic cliffs, crowned with the Aegean Sea's most legendary golden sunsets.",
      heritage: "Home to the prehistoric Minoan city of Akrotiri, Byzantine clifftop monasteries, and traditional maritime seafaring vineyards thriving in volcanic soil.",
      image: 'assets/dest_santorini.jpg',
      price: '$3,150',
      duration: '6 Days · 5 Nights Luxury Itinerary',
      pkgTitle: 'Aegean Caldera Cruise & Clifftop Villas',
      highlights: [
        { icon: '⛵', title: 'Private Catamaran Cruise', desc: 'Sunset cruise to volcanic hot springs & Red Beach' },
        { icon: '★', title: 'Infinity Cave Villa', desc: 'Private heated infinity plunge pool overlooking caldera' },
        { icon: '🍷', title: 'Volcanic Wine Tasting', desc: 'Sommelier-led tasting at Greece’s oldest vineyards' }
      ]
    },
    {
      id: 'tropical',
      tagElevation: '1717m',
      tagRegion: 'UBUD · INDONESIA',
      cardTag: '↑ 1717m',
      title: 'Bali<br>Sanctuary',
      country: 'INDONESIA',
      cardTitle: 'Bali Sanctuary',
      narrative: "Emerald jungle canopies, tiered sacred rice terraces, and turquoise coral lagoons. An ethereal haven of spiritual tranquility and rejuvenation.",
      heritage: "Ancient Subak irrigation temples dating back to the 9th century, sacred water purification blessings, and Royal Ubud art collectives.",
      image: 'assets/dest_tropical.jpg',
      price: '$2,200',
      duration: '7 Days · 6 Nights Luxury Itinerary',
      pkgTitle: 'Tropical Rainforest Sanctuary & Temple Retreat',
      highlights: [
        { icon: '🌿', title: 'Private Jungle Pool Villa', desc: 'Secluded river valley pavilion with dedicated butler' },
        { icon: '🪷', title: 'Sacred Water Blessing', desc: 'Exclusive purification ceremony with high priest' },
        { icon: '🛥', title: 'Nusa Island Yacht Charter', desc: 'Private yacht cruise with manta ray snorkeling' }
      ]
    }
  ];

  let currentSlide = 0; // 0 = Intro state, 1..5 = Destinations
  const showcaseBgLayers = document.querySelectorAll('.showcase-bg-layer');
  const showcaseCards = document.querySelectorAll('.showcase-card');

  // Initialize click handlers on pre-rendered destination cards
  showcaseCards.forEach((card) => {
    card.addEventListener('click', () => {
      const cardIdx = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(cardIdx)) {
        goToSlide(cardIdx);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cardIdx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(cardIdx)) {
          goToSlide(cardIdx);
        }
      }
    });
  });

  function updateShowcaseView(slideIndex) {
    // 1. Crossfade background layers natively with GPU acceleration
    showcaseBgLayers.forEach((layer) => {
      const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
      layer.classList.toggle('active', layerSlide === slideIndex);
    });

    // 2. Update text content
    if (slideIndex === 0) {
      if (showcaseElevation) showcaseElevation.textContent = '4250m';
      if (showcaseRegion) showcaseRegion.textContent = 'SKARDU & BEYOND';
      if (showcaseHeadline) showcaseHeadline.innerHTML = 'FIND YOUR<br>FROZEN ESCAPE';
      if (showcaseNarrative) {
        showcaseNarrative.textContent = 'Explore our frozen lake locations, each offering a unique skating experience in the heart of Skardu and worldwide alpine wonderlands.';
      }
      if (showcaseBtnLabel) showcaseBtnLabel.textContent = 'EXPLORE DESTINATIONS';

      if (counterCurrent) counterCurrent.textContent = '00';
      if (showcaseProgressFill) showcaseProgressFill.style.width = '0%';
    } else {
      const dest = destinationsData[slideIndex - 1];
      if (dest) {
        if (showcaseElevation) showcaseElevation.textContent = dest.tagElevation;
        if (showcaseRegion) showcaseRegion.textContent = dest.tagRegion;
        if (showcaseHeadline) showcaseHeadline.innerHTML = dest.title;
        if (showcaseNarrative) showcaseNarrative.textContent = dest.narrative;
        if (showcaseBtnLabel) showcaseBtnLabel.textContent = 'BOOK NOW';

        const slideNumStr = slideIndex < 10 ? `0${slideIndex}` : `${slideIndex}`;
        if (counterCurrent) counterCurrent.textContent = slideNumStr;

        const progressPercent = (slideIndex / destinationsData.length) * 100;
        if (showcaseProgressFill) showcaseProgressFill.style.width = `${progressPercent}%`;
      }
    }

    // 3. Highlight the active destination card
    showcaseCards.forEach((card) => {
      const cardIdx = parseInt(card.getAttribute('data-index'), 10);
      const isCardActive = cardIdx === slideIndex;
      card.classList.toggle('active', isCardActive);
    });
  }

  function scrollToShowcaseSlide(slideIdx) {
    const showcaseSec = document.getElementById('features');
    if (!showcaseSec) return;

    const showcaseTop = showcaseSec.offsetTop;
    const windowH = window.innerHeight;
    const pinDist = showcaseSec.offsetHeight - windowH;
    if (pinDist <= 0) return;

    let ratio = 0.05;
    if (slideIdx === 1) ratio = 0.20;
    else if (slideIdx === 2) ratio = 0.38;
    else if (slideIdx === 3) ratio = 0.56;
    else if (slideIdx === 4) ratio = 0.74;
    else if (slideIdx === 5) ratio = 0.88;

    const targetY = showcaseTop + ratio * pinDist;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  function goToSlide(newIndex, isFromScroll = false) {
    if (newIndex < 0) {
      newIndex = destinationsData.length;
    } else if (newIndex > destinationsData.length) {
      newIndex = 0;
    }
    currentSlide = newIndex;
    updateShowcaseView(currentSlide);

    if (!isFromScroll) {
      scrollToShowcaseSlide(currentSlide);
    }
  }

  const showcaseStickyViewport = document.getElementById('showcase-sticky-viewport');
  const showcaseSectionElem = document.getElementById('features');

  function updateShowcaseOnScroll() {
    if (!showcaseSectionElem || !showcaseStickyViewport) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowH = window.innerHeight;
    const showcaseTop = showcaseSectionElem.offsetTop;
    const showcaseH = showcaseSectionElem.offsetHeight;
    const pinDist = showcaseH - windowH;

    if (pinDist <= 0) return;

    // --- 1. Approaching / Coming Up from below Hero ---
    if (scrollY < showcaseTop) {
      const approachDist = windowH * 0.95;
      const approach = clamp((scrollY + windowH - showcaseTop) / approachDist, 0, 1);
      const easeApproach = easeOutCubic(approach);

      // Destination cards deck animates smoothly from RIGHT to LEFT
      if (showcaseCardsDeck) {
        const slideX = (1 - easeApproach) * 320;
        showcaseCardsDeck.style.transform = `translate3d(${slideX.toFixed(1)}px, 0, 0)`;
        showcaseCardsDeck.style.opacity = easeApproach.toFixed(3);
      }

      // Left country text panel animates into place
      if (showcaseInfoPanel) {
        const textY = (1 - easeApproach) * 55;
        const textX = -(1 - easeApproach) * 40;
        showcaseInfoPanel.style.transform = `translate3d(${textX.toFixed(1)}px, ${textY.toFixed(1)}px, 0)`;
        showcaseInfoPanel.style.opacity = easeApproach.toFixed(3);
      }

      showcaseStickyViewport.style.transform = 'translate3d(0, 0, 0) scale(1)';
      showcaseStickyViewport.style.opacity = '1';

      if (currentSlide !== 0) {
        goToSlide(0, true);
      }
      return;
    }

    // --- 2. Locked in place (Pinned viewport active) ---
    const scrollInside = scrollY - showcaseTop;
    const progress = clamp(scrollInside / pinDist, 0, 1);

    if (showcaseCardsDeck) {
      showcaseCardsDeck.style.transform = 'translate3d(0, 0, 0)';
      showcaseCardsDeck.style.opacity = '1';
    }

    if (showcaseInfoPanel) {
      showcaseInfoPanel.style.transform = 'translate3d(0, 0, 0)';
      showcaseInfoPanel.style.opacity = '1';
    }

    // Map scroll progress to active country slide
    let targetSlide = 0;
    if (progress < 0.12) {
      targetSlide = 0;
    } else if (progress < 0.30) {
      targetSlide = 1;
    } else if (progress < 0.48) {
      targetSlide = 2;
    } else if (progress < 0.66) {
      targetSlide = 3;
    } else if (progress < 0.84) {
      targetSlide = 4;
    } else {
      targetSlide = 5;
    }

    if (targetSlide !== currentSlide) {
      goToSlide(targetSlide, true);
    }

    // --- 3. Animating away when scrolled down towards footer ---
    if (progress >= 0.93) {
      const exitProgress = clamp((progress - 0.93) / 0.07, 0, 1);
      const exitScale = 1.0 - exitProgress * 0.08;
      const exitY = -exitProgress * 65;
      const exitOpacity = 1.0 - exitProgress * 0.55;

      showcaseStickyViewport.style.transform = `translate3d(0, ${exitY.toFixed(1)}px, 0) scale(${exitScale.toFixed(3)})`;
      showcaseStickyViewport.style.opacity = exitOpacity.toFixed(2);
    } else {
      showcaseStickyViewport.style.transform = 'translate3d(0, 0, 0) scale(1)';
      showcaseStickyViewport.style.opacity = '1';
    }
  }

  if (showcaseNextBtn) {
    showcaseNextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });
  }

  if (showcasePrevBtn) {
    showcasePrevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });
  }

  // --- Open Dedicated Country Package Details & Booking Modal ---
  function openCountryModal(destIndex) {
    if (!countryModal) return;
    const dest = destinationsData[destIndex];
    if (!dest) return;

    if (countryModalTag) countryModalTag.textContent = `${dest.cardTag} · ${dest.tagRegion}`;
    if (countryModalImg) {
      countryModalImg.src = dest.image;
      countryModalImg.alt = dest.pkgTitle;
    }
    if (countryModalCountry) countryModalCountry.textContent = dest.country;
    if (countryModalTitle) countryModalTitle.textContent = dest.pkgTitle;
    if (countryModalDuration) countryModalDuration.textContent = dest.duration;
    if (countryModalHeritage) countryModalHeritage.textContent = dest.heritage;
    if (countryModalPrice) {
      countryModalPrice.innerHTML = `${dest.price} <span class="price-sub">/ traveler</span>`;
    }

    if (countryModalHighlights) {
      countryModalHighlights.innerHTML = dest.highlights.map(h => `
        <div class="highlight-card">
          <span class="highlight-icon">${h.icon}</span>
          <div class="highlight-info">
            <strong>${h.title}</strong>
            <span>${h.desc}</span>
          </div>
        </div>
      `).join('');
    }

    if (bookingConfirmationMsg) {
      bookingConfirmationMsg.style.display = 'none';
    }

    countryModal.classList.add('active');
    countryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCountryModal() {
    if (!countryModal) return;
    countryModal.classList.remove('active');
    countryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (showcaseBookBtn) {
    showcaseBookBtn.addEventListener('click', () => {
      if (currentSlide === 0) {
        goToSlide(1);
      } else {
        openCountryModal(currentSlide - 1);
      }
    });
  }

  if (countryModalClose) {
    countryModalClose.addEventListener('click', closeCountryModal);
  }

  if (countryModal) {
    countryModal.addEventListener('click', (e) => {
      if (e.target === countryModal) {
        closeCountryModal();
      }
    });
  }

  // Handle Country Package Booking Form Submission
  if (countryBookingForm) {
    countryBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('pkg-guest-name')?.value || 'Guest';
      const guestEmail = document.getElementById('pkg-guest-email')?.value || '';
      const travelDate = document.getElementById('pkg-travel-date')?.value || '';
      const travelers = document.getElementById('pkg-travelers')?.value || '2';

      if (bookingConfirmationMsg) {
        const destName = destinationsData[currentSlide > 0 ? currentSlide - 1 : 0].pkgTitle;
        bookingConfirmationMsg.innerHTML = `✓ Thank you, <strong>${guestName}</strong>! Your inquiry for <strong>${destName}</strong> on <strong>${travelDate}</strong> (${travelers} travelers) has been submitted. Our concierge will contact you at <em>${guestEmail}</em> within 2 hours.`;
        bookingConfirmationMsg.style.display = 'block';
      }

      countryBookingForm.reset();
    });
  }

  // Keyboard Navigation (Left / Right Arrows)
  document.addEventListener('keydown', (e) => {
    const showcaseSection = document.getElementById('features');
    if (!showcaseSection) return;

    const rect = showcaseSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView && !countryModal?.classList.contains('active')) {
      if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    }
  });

  // Touch Swipe on Cards Deck
  let touchStartX = 0;
  let touchEndX = 0;

  if (showcaseCardsDeck) {
    showcaseCardsDeck.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    showcaseCardsDeck.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        // Swiped Left -> Next
        goToSlide(currentSlide + 1);
      } else if (touchEndX - touchStartX > 50) {
        // Swiped Right -> Prev
        goToSlide(currentSlide - 1);
      }
    }, { passive: true });
  }

  // Initial Showcase Setup
  updateShowcaseView(0);

  // Escape key listener for all modals and drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      closeVideoModal();
      closeCountryModal();
    }
  });
});
