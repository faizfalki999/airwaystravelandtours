/**
 * AIRWAYS TRAVEL & TOURS (UIXSHUVO)
 * Interactive Flight Scroll Animation & Dual Showcase Client Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // --- 1. DOM Elements Selection & Data Setup ---
  // ==========================================================================
  
  // Hero Elements
  const heroSection = document.getElementById('hero');
  const airplaneStage = document.getElementById('airplane-stage');
  const airplaneWrapper = document.getElementById('airplane-wrapper');
  const heroLeftColumn = document.getElementById('hero-left-column');
  const heroSkyImg = document.getElementById('hero-sky-img');
  const heroCta = document.getElementById('hero-cta');

  // Navigation & Modals Elements
  const bookingModal = document.getElementById('booking-modal');
  const cartToggle = document.getElementById('cart-toggle');
  const modalClose = document.getElementById('modal-close');
  const modalExploreBtn = document.getElementById('modal-explore-btn');
  const discoverMore = document.getElementById('discover-more');
  const cornerKnowMore = document.getElementById('corner-know-more');

  // Video Modal Elements
  const btnPlayVideo = document.getElementById('btn-play-video');
  const flightVideoModal = document.getElementById('flight-video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoBackdrop = document.getElementById('video-backdrop');
  const modalReserveBtn = document.getElementById('modal-reserve-btn');

  // Mobile Drawer Elements
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta-btn');

  // Country Detail & Booking Modal Elements
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

  // Curated Destination Packages Data (Frozen Lakes & Signature Expeditions)
  const destinationsData = [
    {
      id: 'shauser',
      tagElevation: '4250m',
      tagRegion: 'BALTISTAN · PAKISTAN',
      cardTag: '↑ 4250m',
      title: 'Shauser<br>Lake',
      country: 'PAKISTAN',
      cardTitle: 'Shauser Lake',
      narrative: "Surrounded by untouched snow and crisp winter air, it's the ideal spot for both beginners and seasoned skaters looking for peace, beauty, and unforgettable views.",
      heritage: "Nestled high in the Deosai alpine plateau under the shadows of K2 and Karakoram giants, Shauser Lake is a legendary high-altitude jewel of crystal-clear glacial waters and untouched wilderness.",
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
      id: 'kharfak',
      tagElevation: '3350m',
      tagRegion: 'BALTISTAN · PAKISTAN',
      cardTag: '↑ 3350m',
      title: 'Lake<br>Kharfak',
      country: 'PAKISTAN',
      cardTitle: 'Lake Kharfak',
      narrative: "An emerald alpine jewel hidden amidst glacial ridges, offering pristine crystalline ice and peaceful reflection under towering Karakoram peaks.",
      heritage: "Perched above the historic village of Kharfak in the valleys of Baltistan, this secluded glacial mirror has inspired local folklore and mountain voyagers for centuries.",
      image: 'assets/dest_swiss_alps.jpg',
      price: '$2,250',
      duration: '7 Days · 6 Nights Luxury Itinerary',
      pkgTitle: 'Lake Kharfak High-Altitude Trek & Retreat',
      highlights: [
        { icon: '🏔', title: 'Alpine Glacial Excursions', desc: 'Guided treks across untouched ridges with master sherpas' },
        { icon: '★', title: 'Luxury Mountain Camp', desc: 'Heated all-weather geodesic domes with panoramic sky roofs' },
        { icon: '🔥', title: 'Balti Cultural Evenings', desc: 'Traditional hearth fireside feasts & storytelling' }
      ]
    },
    {
      id: 'jarba-zhou',
      tagElevation: '2500m',
      tagRegion: 'SHIGAR VALLEY · PAKISTAN',
      cardTag: '↑ 2500m',
      title: 'Jarba<br>Zhou',
      country: 'PAKISTAN',
      cardTitle: 'Jarba Zhou',
      narrative: "A legendary high-altitude oasis tucked beside the cold desert of Shigar, famous for mirror-like frozen surfaces and serenity.",
      heritage: "Situated at the gateway to the mighty Baltoro glacier, Jarba Zhou blends tranquil waters with the dramatic sand dunes and royal Raja palaces of ancient Shigar.",
      image: 'assets/dest_japan.jpg',
      price: '$2,100',
      duration: '6 Days · 5 Nights Luxury Itinerary',
      pkgTitle: 'Jarba Zhou & Shigar Heritage Sanctuary',
      highlights: [
        { icon: '🏰', title: 'Serena Shigar Fort Residency', desc: 'Stay in the 400-year-old restored Raja palace of Baltistan' },
        { icon: '🏜', title: 'Sarfaranga Cold Desert Safari', desc: 'Sunset vintage 4WD dune runs across golden winter sands' },
        { icon: '⛸', title: 'Exclusive Ice Skating Access', desc: 'Private reserved lake surface with gear & instructors' }
      ]
    },
    {
      id: 'kachura',
      tagElevation: '2500m',
      tagRegion: 'SKARDU · PAKISTAN',
      cardTag: '↑ 2500m',
      title: 'Kachura<br>Lake',
      country: 'PAKISTAN',
      cardTitle: 'Kachura Lake',
      narrative: "Famed for its turquoise depths and winter frost, Kachura presents a winter wonderland framed by wild conifers and snow-capped crags.",
      heritage: "Known worldwide as Shangrila or Heaven on Earth, the twin Kachura lakes have captivated wanderers with fruit orchards, tranquil waters, and iconic red-roofed pagoda villas.",
      image: 'assets/dest_santorini.jpg',
      price: '$2,350',
      duration: '7 Days · 6 Nights Luxury Itinerary',
      pkgTitle: 'Upper Kachura Winter Wonder Voyage',
      highlights: [
        { icon: '🌲', title: 'Conifer Forest Snowshoeing', desc: 'Private guided trails through ancient juniper and pine groves' },
        { icon: '★', title: 'Shangrila Resort Lodging', desc: 'Signature waterside VIP villas overlooking frosted shores' },
        { icon: '☕', title: 'Lakeside Kashmiri Chai Pavilions', desc: 'Artisanal warm saffron tea and traditional bakery' }
      ]
    },
    {
      id: 'sadpara',
      tagElevation: '2637m',
      tagRegion: 'SKARDU · PAKISTAN',
      cardTag: '↑ 2637m',
      title: 'Sadpara<br>Lake',
      country: 'PAKISTAN',
      cardTitle: 'Sadpara Lake',
      narrative: "Named after the mountaineering legends of Baltistan, offering breathtaking alpine vistas, crystal blue waters, and pristine icy shores.",
      heritage: "Honoring the legendary climbers of Sadpara village who conquered K2 and Himalayan giants in midwinter, Sadpara Lake is the spiritual heart of Karakoram mountaineering.",
      image: 'assets/dest_tropical.jpg',
      price: '$2,500',
      duration: '8 Days · 7 Nights Luxury Itinerary',
      pkgTitle: 'Sadpara Lake & Mountaineers Tribute Tour',
      highlights: [
        { icon: '🧗', title: 'Mountaineering Masters Meet', desc: 'Exclusive session with high-altitude K2 expedition leaders' },
        { icon: '🚤', title: 'Electric Ice-Breaker Cruise', desc: 'Eco-cruising through crystalline winter glacial channels' },
        { icon: '🌌', title: 'Dark Sky Stargazing', desc: 'Certified astronomer telescope sessions beneath Karakoram skies' }
      ]
    }
  ];

  // ==========================================================================
  // --- 2. Math & Easing Helpers ---
  // ==========================================================================
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  // ==========================================================================
  // --- 3. Hero Flight Scroll Animation (Bottom-to-Up Climbing Flight) ---
  // - As user scrolls down, the plane ascends and soars from down to up
  //   into the sky and clouds, climbing smoothly along its flight vector.
  // ==========================================================================
  function updateFlightOnScroll(customScrollY) {
    if (!heroSection || !airplaneWrapper) return;
    if (airplaneWrapper.classList.contains('is-flying-one-shot')) return;

    const scrollY = customScrollY !== undefined ? customScrollY : (window.pageYOffset || document.documentElement.scrollTop);
    const isMobile = window.innerWidth <= 768;

    // Flight takeoff distance: smooth climb-out as user scrolls past hero
    const takeoffDistance = isMobile ? 380 : 500;

    // Hero Resting Stance (center):
    const midX = 0;
    const midY = 0;
    const midScale = 1.0;
    const midRot = -11;

    // Departure Vector (climbing up and right into clouds as page scrolls down):
    const endX = isMobile ? window.innerWidth * 0.65 : 480;
    const endY = isMobile ? -window.innerHeight * 0.45 : -420;
    const endScale = 1.35;
    const endRot = -18;

    const progress = clamp(scrollY / takeoffDistance, 0, 1);
    const t = easeInOutQuad(progress);

    const planeX = midX + (endX - midX) * t;
    const planeY = midY + (endY - midY) * t;
    const planeScale = midScale + (endScale - midScale) * t;
    const planeRot = midRot + (endRot - midRot) * t;

    // Plane is fully visible on load; dissolves smoothly into high clouds as it climbs away
    let planeOpacity = 1.0;
    if (t > 0.45) {
      planeOpacity = clamp(1.0 - (t - 0.45) / 0.55, 0, 1);
    }

    // Hero text glides with subtle upward parallax as page scrolls
    if (heroLeftColumn) {
      const textOpacity = clamp(1.0 - t * 1.4, 0, 1);
      const textY = -t * 60;
      heroLeftColumn.style.opacity = textOpacity.toFixed(3);
      heroLeftColumn.style.transform = `translate3d(0, ${textY.toFixed(1)}px, 0)`;
      heroLeftColumn.style.pointerEvents = textOpacity > 0.5 ? 'auto' : 'none';
    }

    // Direct scroll physics
    airplaneWrapper.style.animation = 'none';
    airplaneWrapper.style.transform = `translate3d(${planeX.toFixed(1)}px, ${planeY.toFixed(1)}px, 0) rotate(${planeRot.toFixed(1)}deg) scale(${planeScale.toFixed(3)})`;
    airplaneWrapper.style.opacity = planeOpacity.toFixed(3);

    if (heroSkyImg) heroSkyImg.style.transform = 'none';
  }

  // ==========================================================================
  // --- 4. Factory Function for Showcase Instances ---
  // ==========================================================================
  function initShowcaseInstance({ suffix = '', initialSlide = 0 } = {}) {
    const s = suffix ? `-${suffix}` : '';
    const sectionElem = document.getElementById(suffix ? `features-${suffix}` : 'features');
    const stickyViewport = document.getElementById(`showcase-sticky-viewport${s}`);
    const introCurtain = document.getElementById(suffix ? `showcase-intro-curtain-${suffix}` : 'showcase-intro-curtain');
    const introHint = document.getElementById(suffix ? `intro-hint-${suffix}` : 'intro-hint-1');
    const controlsBar = stickyViewport ? stickyViewport.querySelector('.showcase-controls-bar') : null;
    const infoPanel = document.getElementById(`showcase-info-panel${s}`);
    const elevationBadge = document.getElementById(suffix ? `showcase-badge-${suffix}` : 'showcase-badge');
    const elevation = document.getElementById(`showcase-elevation${s}`);
    const region = document.getElementById(`showcase-region${s}`);
    const headline = document.getElementById(`showcase-headline${s}`);
    const narrative = document.getElementById(`showcase-narrative${s}`);
    const bookBtn = document.getElementById(`showcase-book-btn${s}`);
    const btnLabel = document.getElementById(`showcase-btn-label${s}`);
    const cardsDeck = document.getElementById(`showcase-cards-deck${s}`);
    const cardsTrack = document.getElementById(suffix ? `showcase-cards-track-${suffix}` : 'showcase-cards-track');
    const prevBtn = document.getElementById(`showcase-prev-btn${s}`);
    const nextBtn = document.getElementById(`showcase-next-btn${s}`);
    const progressFill = document.getElementById(`showcase-progress-fill${s}`);
    const counterCurrent = document.getElementById(`counter-current${s}`);
    const bgLayers = document.querySelectorAll(suffix ? `#showcase-bg-container-${suffix} .showcase-bg-layer` : '#showcase-bg-container .showcase-bg-layer');
    const cards = document.querySelectorAll(suffix ? `#showcase-cards-deck-${suffix} .showcase-card` : '#showcase-cards-deck .showcase-card');

    if (!sectionElem) return null;

    let slide = initialSlide;

    function animateCardToFullscreen(targetSlideIndex) {
      if (!stickyViewport || !cardsTrack) {
        bgLayers.forEach((layer) => {
          const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
          layer.classList.toggle('active', layerSlide === targetSlideIndex);
        });
        return;
      }

      const targetCard = cardsTrack.querySelector(`.showcase-card[data-index="${targetSlideIndex}"]`);
      if (!targetCard) {
        bgLayers.forEach((layer) => {
          const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
          layer.classList.toggle('active', layerSlide === targetSlideIndex);
        });
        return;
      }

      const sourceRect = targetCard.getBoundingClientRect();
      const viewportRect = stickyViewport.getBoundingClientRect();

      // If card is hidden or zero dimensions, fallback to direct background switch
      if (sourceRect.width <= 0 || sourceRect.height <= 0 || sourceRect.right <= 0 || sourceRect.left >= window.innerWidth) {
        bgLayers.forEach((layer) => {
          const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
          layer.classList.toggle('active', layerSlide === targetSlideIndex);
        });
        return;
      }

      const startTop = sourceRect.top - viewportRect.top;
      const startLeft = sourceRect.left - viewportRect.left;
      const startWidth = sourceRect.width;
      const startHeight = sourceRect.height;

      // Clean up any ongoing clones
      const oldClone = stickyViewport.querySelector('.showcase-expanding-clone');
      if (oldClone) {
        if (typeof gsap !== 'undefined') gsap.killTweensOf(oldClone);
        oldClone.remove();
      }
      cardsTrack.querySelectorAll('.showcase-card.is-expanding').forEach(c => c.classList.remove('is-expanding'));

      // Create expanding clone element
      const clone = document.createElement('div');
      clone.className = 'showcase-expanding-clone';
      clone.style.position = 'absolute';
      clone.style.top = `${startTop}px`;
      clone.style.left = `${startLeft}px`;
      clone.style.width = `${startWidth}px`;
      clone.style.height = `${startHeight}px`;
      clone.style.borderRadius = '22px';
      clone.style.overflow = 'hidden';
      clone.style.zIndex = '1';
      clone.style.pointerEvents = 'none';
      clone.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.4)';
      clone.style.willChange = 'top, left, width, height, border-radius, box-shadow, opacity';

      const dest = destinationsData[targetSlideIndex - 1];
      const cardImg = targetCard.querySelector('.showcase-card-img');
      const imgSrc = dest ? dest.image : (cardImg ? cardImg.src : '');

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = dest ? dest.title : 'Destination';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center center';
      img.style.display = 'block';

      clone.appendChild(img);

      // Insert clone into .showcase-bg-container UNDER the permanent .showcase-vignette-overlay
      const bgContainer = stickyViewport.querySelector('.showcase-bg-container') || stickyViewport;
      const vignetteEl = bgContainer.querySelector('.showcase-vignette-overlay');
      if (vignetteEl) {
        bgContainer.insertBefore(clone, vignetteEl);
      } else {
        bgContainer.appendChild(clone);
      }

      targetCard.classList.add('is-expanding');

      if (typeof gsap !== 'undefined') {
        gsap.to(clone, {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 0,
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.82,
          ease: 'power3.inOut',
          onComplete: () => {
            // Activate destination background layer instantly with matching appearance
            bgLayers.forEach((layer) => {
              const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
              if (layerSlide === targetSlideIndex) {
                layer.style.transition = 'none';
                layer.classList.add('active');
                void layer.offsetWidth;
                layer.style.transition = '';
              } else {
                layer.classList.remove('active');
              }
            });

            clone.remove();
            targetCard.classList.remove('is-expanding');
          }
        });
      } else {
        bgLayers.forEach((layer) => {
          const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
          layer.classList.toggle('active', layerSlide === targetSlideIndex);
        });
        clone.remove();
        targetCard.classList.remove('is-expanding');
      }
    }

    function updateView(slideIndex, prevSlideIndex = null) {
      // 1. Toggle background layers with card enlarging animation if navigating to a destination
      if (prevSlideIndex !== null && prevSlideIndex !== slideIndex) {
        if (slideIndex >= 1) {
          animateCardToFullscreen(slideIndex);
        } else {
          // Returning to Slide 0 (Landing View: Plain solid color, no picture)
          bgLayers.forEach((layer) => {
            const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
            layer.classList.toggle('active', layerSlide === 0);
          });
        }
      } else {
        // Initial setup
        bgLayers.forEach((layer) => {
          const layerSlide = parseInt(layer.getAttribute('data-slide'), 10);
          layer.classList.toggle('active', layerSlide === slideIndex);
        });
      }

      // Toggle vignette overlay (only active on destination photo slides)
      const vignetteOverlay = stickyViewport.querySelector('.showcase-vignette-overlay');
      if (vignetteOverlay) {
        vignetteOverlay.classList.toggle('active', slideIndex >= 1);
      }

      // 2. Animate left info panel text transition
      if (infoPanel && infoPanel.dataset.lastSlide !== String(slideIndex)) {
        infoPanel.dataset.lastSlide = String(slideIndex);
        infoPanel.classList.add('animating');
        setTimeout(() => {
          infoPanel.classList.remove('animating');
        }, 220);
      }

      // 3. State 1 & State 2: Landing View (Slide 0)
      if (slideIndex === 0) {
        if (elevationBadge) {
          elevationBadge.classList.add('hidden-badge');
          elevationBadge.style.display = 'none';
        }
        if (headline) {
          if (suffix === '2') {
            headline.innerHTML = 'DISCOVER<br>DOMESTIC<br>DESTINATIONS';
          } else {
            headline.innerHTML = 'FIND YOUR<br>FROZEN<br>ESCAPE';
          }
        }
        if (narrative) {
          if (suffix === '2') {
            narrative.textContent = "Explore our high-altitude glacial valleys, ancient Silk Route plateaus, and serene alpine wonders across Pakistan.";
          } else {
            narrative.textContent = "Explore our frozen lake locations, each offering a unique skating experience in the heart of Skardu.";
          }
        }
        if (btnLabel) btnLabel.textContent = 'BOOK NOW';
        if (counterCurrent) counterCurrent.textContent = '00';
        if (progressFill) progressFill.style.width = '0%';

        // Reset cards track shift
        if (cardsTrack) {
          cardsTrack.style.transform = 'translate3d(0px, 0, 0)';
        }
      } else {
        // State 3: Full-Screen Destination View (Slide 1+)
        const dest = destinationsData[slideIndex - 1];
        if (dest) {
          if (elevationBadge) {
            elevationBadge.classList.remove('hidden-badge');
            elevationBadge.style.display = 'inline-flex';
          }
          if (elevation) elevation.textContent = dest.tagElevation;
          if (region) region.textContent = dest.tagRegion;
          if (headline) headline.innerHTML = dest.title;
          if (narrative) narrative.textContent = dest.narrative;
          if (btnLabel) btnLabel.textContent = 'BOOK NOW';
          const slideNumStr = slideIndex < 10 ? `0${slideIndex}` : `${slideIndex}`;
          if (counterCurrent) counterCurrent.textContent = slideNumStr;
          const progressPercent = (slideIndex / destinationsData.length) * 100;
          if (progressFill) progressFill.style.width = `${progressPercent}%`;

          // Shift cards track so upcoming destinations are presented cleanly (card width 248px + gap 24px = 272px)
          if (cardsTrack) {
            const slotWidth = window.innerWidth <= 768 ? 216 : 272;
            const shiftX = -(slideIndex) * slotWidth;
            cardsTrack.style.transform = `translate3d(${shiftX}px, 0, 0)`;
          }
        }
      }

      // Card active highlight
      cards.forEach((card) => {
        const cardIdx = parseInt(card.getAttribute('data-index'), 10);
        card.classList.toggle('active', cardIdx === slideIndex);
      });
    }

    function goToSlide(newIndex) {
      if (newIndex < 0) {
        newIndex = destinationsData.length;
      } else if (newIndex > destinationsData.length) {
        newIndex = 0;
      }
      // Ensure cards are visible whenever user interacts with controls
      if (cardsDeck && !cardsDeck.classList.contains('cards-entered')) {
        cardsDeck.classList.add('cards-entered');
      }
      const prev = slide;
      slide = newIndex;
      updateView(slide, prev);
    }

    if (introHint) {
      const scrollToContent = () => {
        const showcaseTop = sectionElem.offsetTop;
        const windowH = window.innerHeight;
        const pinDist = sectionElem.offsetHeight - windowH;
        if (pinDist > 0) {
          const targetY = showcaseTop + 0.60 * pinDist;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      };
      introHint.addEventListener('click', scrollToContent);
      introHint.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToContent();
        }
      });
    }

    cards.forEach((card) => {
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

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(slide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(slide + 1);
      });
    }

    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const destIdx = slide > 0 ? slide - 1 : 0;
        openCountryModal(destIdx);
      });
    }

    // Enhanced Touch Swipe for Mobile & Tablet (Horizontal Intent Detection)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const swipeTarget = stickyViewport || cardsDeck;
    if (swipeTarget) {
      swipeTarget.addEventListener('touchstart', (e) => {
        if (e.target.closest('button, a, input, select, textarea, .country-modal-window')) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      swipeTarget.addEventListener('touchend', (e) => {
        if (e.target.closest('button, a, input, select, textarea, .country-modal-window')) return;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Ensure clear horizontal intent (horizontal distance significantly exceeds vertical distance)
        if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
          if (diffX > 0) {
            goToSlide(slide + 1);
          } else {
            goToSlide(slide - 1);
          }
        }
      }, { passive: true });
    }

    // Responsive Track Recalibration on Resize & Orientation Change
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (cardsTrack && slide > 0) {
          const slotWidth = window.innerWidth <= 768 ? 216 : 272;
          cardsTrack.style.transform = `translate3d(${-slide * slotWidth}px, 0, 0)`;
        }
      }, 80);
    }, { passive: true });

    // Scroll Observer for entrance animation (State 1 -> State 2)
    if (typeof IntersectionObserver !== 'undefined' && sectionElem && !introCurtain) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            if (cardsDeck) cardsDeck.classList.add('cards-entered');
          }
        });
      }, { threshold: [0.15, 0.4] });
      observer.observe(sectionElem);
    }

    function updateOnScroll(scrollY, windowH) {
      if (!stickyViewport) return;

      const showcaseTop = sectionElem.offsetTop;
      const showcaseH = sectionElem.offsetHeight;
      const pinDist = showcaseH - windowH;

      // Section with intro curtain (e.g. features-2)
      if (introCurtain) {
        if (pinDist <= 0) return;

        if (scrollY < showcaseTop) {
          introCurtain.style.opacity = '1';
          introCurtain.style.transform = 'translate3d(0, 0, 0)';
          introCurtain.style.pointerEvents = 'auto';
          if (cardsDeck) {
            cardsDeck.style.opacity = '0';
            cardsDeck.style.transform = 'translate3d(240px, 0, 0)';
          }
          if (infoPanel) {
            infoPanel.style.opacity = '0';
            infoPanel.style.transform = 'translate3d(-30px, 40px, 0)';
          }
          if (controlsBar) controlsBar.style.opacity = '0';
          stickyViewport.style.transform = 'translate3d(0, 0, 0) scale(1)';
          stickyViewport.style.opacity = '1';
          return;
        }

        const scrollInside = scrollY - showcaseTop;
        const progress = clamp(scrollInside / pinDist, 0, 1);
        const INTRO_THRESHOLD = 0.50;
        const fadeStart = 0.12;

        if (progress < INTRO_THRESHOLD) {
          if (progress <= fadeStart) {
            introCurtain.style.opacity = '1';
            introCurtain.style.transform = 'translate3d(0, 0, 0)';
            introCurtain.style.pointerEvents = 'auto';
            if (cardsDeck) {
              cardsDeck.style.opacity = '0';
              cardsDeck.style.transform = 'translate3d(240px, 0, 0)';
            }
            if (infoPanel) {
              infoPanel.style.opacity = '0';
              infoPanel.style.transform = 'translate3d(-30px, 40px, 0)';
            }
            if (controlsBar) controlsBar.style.opacity = '0';
          } else {
            const t = (progress - fadeStart) / (INTRO_THRESHOLD - fadeStart);
            const easeOut = easeOutCubic(t);
            const easeIn = easeInOutQuad(t);

            introCurtain.style.opacity = (1 - easeIn).toFixed(3);
            introCurtain.style.transform = `translate3d(0, ${(-easeIn * 60).toFixed(1)}px, 0)`;
            introCurtain.style.pointerEvents = t > 0.8 ? 'none' : 'auto';

            if (cardsDeck) {
              const slideX = (1 - easeOut) * 240;
              cardsDeck.style.transform = `translate3d(${slideX.toFixed(1)}px, 0, 0)`;
              cardsDeck.style.opacity = easeOut.toFixed(3);
            }
            if (infoPanel) {
              const textY = (1 - easeOut) * 40;
              const textX = -(1 - easeOut) * 30;
              infoPanel.style.transform = `translate3d(${textX.toFixed(1)}px, ${textY.toFixed(1)}px, 0)`;
              infoPanel.style.opacity = easeOut.toFixed(3);
            }
            if (controlsBar) controlsBar.style.opacity = easeOut.toFixed(3);
          }
          stickyViewport.style.transform = 'translate3d(0, 0, 0) scale(1)';
          stickyViewport.style.opacity = '1';
          return;
        }

        introCurtain.style.opacity = '0';
        introCurtain.style.pointerEvents = 'none';
        introCurtain.style.transform = 'translate3d(0, -70px, 0)';
        if (cardsDeck) {
          cardsDeck.style.transform = 'translate3d(0, 0, 0)';
          cardsDeck.style.opacity = '1';
        }
        if (infoPanel) {
          infoPanel.style.transform = 'translate3d(0, 0, 0)';
          infoPanel.style.opacity = '1';
        }
        if (controlsBar) controlsBar.style.opacity = '1';
      } else {
        // Section without curtain (#features): Trigger State 2 cards slide-in as user scrolls in
        const rect = sectionElem.getBoundingClientRect();
        if (rect.top < windowH * 0.75 && rect.bottom > 0) {
          if (cardsDeck && !cardsDeck.classList.contains('cards-entered')) {
            cardsDeck.classList.add('cards-entered');
          }
        } else if (rect.top >= windowH * 0.85) {
          if (cardsDeck && slide === 0) {
            cardsDeck.classList.remove('cards-entered');
          }
        }
      }

      // Exit transition at bottom of showcase as user scrolls down to next section
      if (pinDist > 0) {
        const scrollInside = scrollY - showcaseTop;
        const progress = clamp(scrollInside / pinDist, 0, 1);
        if (progress >= 0.90) {
          const exitProgress = clamp((progress - 0.90) / 0.10, 0, 1);
          const exitScale = 1.0 - exitProgress * 0.05;
          const exitY = -exitProgress * 55;
          const exitOpacity = 1.0 - exitProgress * 0.45;

          stickyViewport.style.transform = `translate3d(0, ${exitY.toFixed(1)}px, 0) scale(${exitScale.toFixed(3)})`;
          stickyViewport.style.opacity = exitOpacity.toFixed(2);
        } else {
          stickyViewport.style.transform = 'translate3d(0, 0, 0) scale(1)';
          stickyViewport.style.opacity = '1';
        }
      }
    }

    updateView(initialSlide);

    return {
      sectionElem,
      updateView,
      updateOnScroll,
      next: () => goToSlide(slide + 1),
      prev: () => goToSlide(slide - 1),
      isInView: () => {
        const rect = sectionElem.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      }
    };
  }

  // Instantiate Both Showcase Sliders
  const showcase1 = initShowcaseInstance({ suffix: '', initialSlide: 0 });
  const showcase2 = initShowcaseInstance({ suffix: '2', initialSlide: 0 });

  function updateShowcasesOnScroll(customScrollY) {
    const scrollY = customScrollY !== undefined ? customScrollY : (window.pageYOffset || document.documentElement.scrollTop);
    const windowH = window.innerHeight;
    if (showcase1) showcase1.updateOnScroll(scrollY, windowH);
    if (showcase2) showcase2.updateOnScroll(scrollY, windowH);
  }

  // Keyboard navigation for showcases
  document.addEventListener('keydown', (e) => {
    if (countryModal?.classList.contains('active')) return;
    if (showcase1 && showcase1.isInView()) {
      if (e.key === 'ArrowRight') showcase1.next();
      else if (e.key === 'ArrowLeft') showcase1.prev();
    } else if (showcase2 && showcase2.isInView()) {
      if (e.key === 'ArrowRight') showcase2.next();
      else if (e.key === 'ArrowLeft') showcase2.prev();
    }
  });

  // ==========================================================================
  // --- 5. Country Package Modal Details & Booking Form ---
  // ==========================================================================
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

  if (countryBookingForm) {
    countryBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('pkg-guest-name')?.value || 'Guest';
      const guestEmail = document.getElementById('pkg-guest-email')?.value || '';
      const travelDate = document.getElementById('pkg-travel-date')?.value || '';
      const travelers = document.getElementById('pkg-travelers')?.value || '2';

      if (bookingConfirmationMsg) {
        const destName = destinationsData[0].pkgTitle;
        bookingConfirmationMsg.innerHTML = `✓ Thank you, <strong>${guestName}</strong>! Your inquiry for <strong>${destName}</strong> on <strong>${travelDate}</strong> (${travelers} travelers) has been submitted. Our concierge will contact you at <em>${guestEmail}</em> within 2 hours.`;
        bookingConfirmationMsg.style.display = 'block';
      }

      countryBookingForm.reset();
    });
  }


  const featuresSec = document.getElementById('features');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      if (featuresSec) featuresSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (cornerKnowMore) {
    cornerKnowMore.addEventListener('click', (e) => {
      e.preventDefault();
      if (featuresSec) featuresSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (discoverMore) {
    discoverMore.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Video Modal
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

  if (btnPlayVideo) btnPlayVideo.addEventListener('click', openVideoModal);
  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);
  if (modalReserveBtn) {
    modalReserveBtn.addEventListener('click', () => {
      closeVideoModal();
      if (featuresSec) featuresSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Mobile Drawer
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

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

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

  // Quick Booking Bag Modal
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

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modalExploreBtn) {
      modalExploreBtn.addEventListener('click', () => {
        closeModal();
        if (featuresSec) featuresSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // Global Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      closeVideoModal();
      closeCountryModal();
    }
  });

  // ==========================================================================
  // --- 7. Lenis Smooth Scrolling Initialization & ScrollTrigger Synchronization ---
  // ==========================================================================
  const heroNav = document.querySelector('.hero-nav');
  function updateNavOnScroll(scrollY) {
    if (!heroNav) return;
    if (scrollY > 35) {
      heroNav.classList.add('nav-scrolled');
    } else {
      heroNav.classList.remove('nav-scrolled');
    }
  }

  function onPageScroll(scrollY) {
    updateNavOnScroll(scrollY);
    updateFlightOnScroll(scrollY);
    updateShowcasesOnScroll(scrollY);
  }

  // Initialize Lenis Smooth Scrolling
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Synchronize ScrollTrigger with Lenis
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Drive Lenis RAF loop via GSAP ticker
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Listen to Lenis scroll
    lenis.on('scroll', (e) => {
      onPageScroll(e.scroll);
    });
  } else {
    // Fallback standard scroll listener if Lenis is unavailable
    let isTicking = false;
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          onPageScroll(scrollY);
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // --- 8. GSAP Hero-to-Showcase Smooth Animated Transition ---
  // ==========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const heroElem = document.getElementById('hero');
    const heroSkyImg = document.getElementById('hero-sky-img');
    const heroSkyGradient = document.querySelector('.hero-sky-gradient');
    const featuresElem = document.getElementById('features');
    const infoPanel = document.getElementById('showcase-info-panel');
    const cardsDeck = document.getElementById('showcase-cards-deck');
    const controlsBar = document.querySelector('#features .showcase-controls-bar');

    if (heroElem && featuresElem) {
      // Synchronized scrubbed timeline linking hero flight to destination showcase
      const transitionTL = gsap.timeline({
        scrollTrigger: {
          trigger: featuresElem,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.5,
          onEnter: () => {
            if (cardsDeck) cardsDeck.classList.add('cards-entered');
          },
          onLeaveBack: () => {
            if (cardsDeck && showcase1 && showcase1.slide === 0) {
              cardsDeck.classList.remove('cards-entered');
            }
          }
        }
      });

      // 1. Hero atmospheric horizon elevation into high altitude clouds
      if (heroSkyImg) {
        transitionTL.to(heroSkyImg, {
          scale: 1.08,
          yPercent: -10,
          opacity: 0.35,
          ease: 'power1.out',
          duration: 1
        }, 0);
      }

      if (heroSkyGradient) {
        transitionTL.to(heroSkyGradient, {
          opacity: 0.6,
          ease: 'none',
          duration: 1
        }, 0);
      }

      // 3. Showcase Content: Left Info Panel floats smoothly into place
      if (infoPanel) {
        transitionTL.fromTo(infoPanel,
          {
            y: 60,
            x: -30,
            opacity: 0
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.85
          },
          0.12
        );
      }

      // 4. Showcase Content: Cards Deck glides in from the right
      if (cardsDeck) {
        transitionTL.fromTo(cardsDeck,
          {
            x: 220,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.9
          },
          0.08
        );
      }

      // 5. Showcase Content: Controls bar rises softly
      if (controlsBar) {
        transitionTL.fromTo(controlsBar,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power1.out',
            duration: 0.7
          },
          0.25
        );
      }
    }
  }

  // Window resize & orientation change handlers
  window.addEventListener('resize', () => {
    const scrollY = lenis ? lenis.scroll : (window.pageYOffset || document.documentElement.scrollTop);
    onPageScroll(scrollY);
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      const scrollY = lenis ? lenis.scroll : (window.pageYOffset || document.documentElement.scrollTop);
      onPageScroll(scrollY);
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 200);
  });

  // Initial execution
  const initialScrollY = lenis ? lenis.scroll : (window.pageYOffset || document.documentElement.scrollTop);
  onPageScroll(initialScrollY);
});
