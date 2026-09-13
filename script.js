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

  let currentSlide = 0; // 0 = Intro state (Plain theme background matching image 1), 1..5 = Destinations
  let isTransitioning = false;

  function renderShowcaseCards() {
    if (!showcaseCardsDeck) return;
    showcaseCardsDeck.innerHTML = '';

    // Decide which cards to display on the right
    // If on slide 0 (intro), display all 5 destinations
    // If on destination slide i (1..5), display the upcoming destinations
    let deckCards = [];
    if (currentSlide === 0) {
      deckCards = destinationsData;
    } else {
      const activeIdx = currentSlide - 1;
      for (let i = 1; i < destinationsData.length; i++) {
        const nextIdx = (activeIdx + i) % destinationsData.length;
        deckCards.push(destinationsData[nextIdx]);
      }
    }

    deckCards.forEach((dest) => {
      const card = document.createElement('article');
      card.className = 'showcase-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${dest.cardTitle}`);

      card.innerHTML = `
        <img src="${dest.image}" alt="${dest.cardTitle}" class="showcase-card-img" loading="lazy">
        <div class="showcase-card-overlay"></div>
        <div class="showcase-card-content">
          <span class="showcase-card-tag">${dest.cardTag}</span>
          <h3 class="showcase-card-title">${dest.cardTitle}</h3>
        </div>
      `;

      card.addEventListener('click', () => {
        const targetIndex = destinationsData.findIndex(d => d.id === dest.id);
        if (targetIndex !== -1) {
          goToSlide(targetIndex + 1);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const targetIndex = destinationsData.findIndex(d => d.id === dest.id);
          if (targetIndex !== -1) {
            goToSlide(targetIndex + 1);
          }
        }
      });

      showcaseCardsDeck.appendChild(card);
    });
  }

  function updateShowcaseView(slideIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Trigger smooth fade out of info panel
    if (showcaseInfoPanel) {
      showcaseInfoPanel.classList.add('animating');
    }

    setTimeout(() => {
      if (slideIndex === 0) {
        // --- State 0: Intro (Plain theme matching background, Screenshot 1) ---
        if (showcaseBgCurrent) {
          showcaseBgCurrent.classList.remove('active');
          showcaseBgCurrent.style.backgroundImage = 'none';
        }
        if (showcaseBgNext) {
          showcaseBgNext.classList.remove('active');
          showcaseBgNext.style.backgroundImage = 'none';
        }

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
        // --- State 1..5: Active Country (Fullscreen background expansion & heritage info) ---
        const dest = destinationsData[slideIndex - 1];

        // Crossfade background image
        if (showcaseBgCurrent && showcaseBgNext) {
          showcaseBgNext.style.backgroundImage = `url('${dest.image}')`;
          showcaseBgNext.classList.add('active');

          setTimeout(() => {
            showcaseBgCurrent.style.backgroundImage = `url('${dest.image}')`;
            showcaseBgCurrent.classList.add('active');
            showcaseBgNext.classList.remove('active');
          }, 850);
        }

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

      // Re-render right cards deck
      renderShowcaseCards();

      // Fade info panel back in
      if (showcaseInfoPanel) {
        showcaseInfoPanel.classList.remove('animating');
      }

      isTransitioning = false;
    }, 320);
  }

  function goToSlide(newIndex) {
    if (newIndex < 0) {
      newIndex = destinationsData.length;
    } else if (newIndex > destinationsData.length) {
      newIndex = 0;
    }
    currentSlide = newIndex;
    updateShowcaseView(currentSlide);
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
  renderShowcaseCards();

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
