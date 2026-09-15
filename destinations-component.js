/**
 * Airways Travel & Tours — Destinations Component & Dataset
 * Reusable data-driven component for "Top Travel Destinations Around the World"
 */

const DESTINATIONS_LIST = [
  {
    name: "Azerbaijan",
    image: "assets/dest_azerbaijan.jpg",
    emoji: "🏰",
    description: "Ancient Silk Road marvels, Baku's flame towers, and swift electronic visa processing.",
    link: "services/visa.html?country=Azerbaijan",
    layoutClass: "bento-standard"
  },
  {
    name: "Indonesia",
    image: "assets/dest_indonesia.jpg",
    emoji: "🏝️",
    description: "Tropical Bali sanctuary retreats, sacred volcanic temples, and curated private island hopping.",
    link: "services.html#contact-section",
    layoutClass: "bento-tall"
  },
  {
    name: "Brazil",
    image: "assets/dest_brazil.jpg",
    emoji: "🌴",
    description: "Sun-drenched Copacabana shores, Amazon expeditions, and vibrant Rio de Janeiro culture.",
    link: "services.html#contact-section",
    layoutClass: "bento-wide"
  },
  {
    name: "Japan",
    image: "assets/dest_japan.jpg",
    emoji: "⛩️",
    description: "Kyoto imperial gardens, Shinkansen bullet train routes, and authentic luxury ryokan hospitality.",
    link: "services.html#contact-section",
    layoutClass: "bento-tall"
  },
  {
    name: "Pakistan",
    image: "assets/dest_pakistan.jpg",
    emoji: "🏔️",
    description: "Mirrored Skardu glacial lakes, Karakoram high-altitude treks, and bespoke luxury northern expeditions.",
    link: "index.html#features",
    layoutClass: "bento-extra-tall"
  },
  {
    name: "Germany",
    image: "assets/dest_germany.jpg",
    emoji: "🏰",
    description: "Fairytale Bavarian alpine castles, historic Berlin landmarks, and curated first-class rail itineraries.",
    link: "services.html#contact-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Cambodia",
    image: "assets/dest_cambodia.jpg",
    emoji: "🛕",
    description: "Mystical Angkor Wat sunrise explorations, ancient Khmer heritage, and fast-track tourist eVisa approval.",
    link: "services/visa.html?country=Cambodia",
    layoutClass: "bento-standard"
  },
  {
    name: "Italy",
    image: "assets/dest_italy.jpg",
    emoji: "🏛️",
    description: "Rome's timeless antiquities, romantic Venetian gondolas, and secluded Amalfi coastline cliff villas.",
    link: "services.html#contact-section",
    layoutClass: "bento-wide"
  },
  {
    name: "Saudi Arabia",
    image: "assets/dest_saudi_arabia.jpg",
    emoji: "🕌",
    description: "Dedicated executive Umrah arrangements, historic AlUla canyon heritage, and premier Riyadh stays.",
    link: "services.html#contact-section",
    layoutClass: "bento-tall"
  },
  {
    name: "Thailand",
    image: "assets/dest_thailand.jpg",
    emoji: "🐘",
    description: "Vibrant Bangkok street culture, crystal Phuket lagoons, and rejuvenating luxury wellness retreats.",
    link: "services.html#contact-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Australia",
    image: "assets/dest_australia.jpg",
    emoji: "🦘",
    description: "Sydney Harbour sailing, Great Barrier Reef private charters, and comprehensive tourist visa guidance.",
    link: "services/visa.html?country=Australia",
    layoutClass: "bento-tall"
  },
  {
    name: "Egypt",
    image: "assets/dest_egypt.jpg",
    emoji: "🐫",
    description: "Legendary Giza pyramids, luxury Nile riverboat cruises, and complete consular visa facilitation.",
    link: "services/visa.html?country=Egypt",
    layoutClass: "bento-standard"
  },
  {
    name: "Sweden",
    image: "assets/dest_sweden.jpg",
    emoji: "❄️",
    description: "Enchanting Stockholm archipelago canals, Arctic aurora borealis safaris, and secluded Nordic chalets.",
    link: "services.html#contact-section",
    layoutClass: "bento-standard"
  },
  {
    name: "France",
    image: "assets/dest_france.jpg",
    emoji: "🗼",
    description: "Parisian haute couture, Eiffel Tower romance, and comprehensive French Schengen visa facilitation.",
    link: "services/visa.html?country=France",
    layoutClass: "bento-feature-large"
  },
  {
    name: "New York",
    image: "assets/dest_new_york.jpg",
    emoji: "🗽",
    description: "Manhattan skyline glamour, Broadway theater premieres, and premier transatlantic flight reservations.",
    link: "services.html#contact-section",
    layoutClass: "bento-wide"
  },
  {
    name: "Switzerland",
    image: "assets/dest_switzerland.jpg",
    emoji: "⛰️",
    description: "Glacier Express panoramic rail routes, Matterhorn alpine chalets, and 5-star mountain sanctuaries.",
    link: "services.html#contact-section",
    layoutClass: "bento-tall"
  }
];

/**
 * Initializes the Destinations Bento Grid Component
 * @param {Object} options
 * @param {string} options.containerId - ID of grid container
 * @param {string} options.assetPrefix - Path prefix for images (e.g. '../' when inside subfolders)
 */
function initDestinationsGrid(options = {}) {
  const container = document.getElementById(options.containerId || 'destinations-bento-grid');
  if (!container) return;

  const prefix = options.assetPrefix || '';

  // Render cards
  container.innerHTML = DESTINATIONS_LIST.map(dest => {
    // Resolve link prefix if needed
    let resolvedLink = dest.link;
    if (prefix && !resolvedLink.startsWith('http') && !resolvedLink.startsWith('#')) {
      resolvedLink = prefix + resolvedLink;
    }
    const resolvedImage = prefix + dest.image;

    return `
      <a href="${resolvedLink}" class="service-feature-card tilt-card ${dest.layoutClass}" data-tilt aria-label="Explore travel to ${dest.name}">
        <div class="service-card-banner">
          <img src="${resolvedImage}" alt="${dest.name}" loading="lazy">
          <div class="service-banner-overlay"></div>
          <div class="service-icon-badge" aria-hidden="true">${dest.emoji}</div>
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${dest.name}</h3>
          <p class="service-card-desc">${dest.description}</p>
          <div class="dest-card-action-hint">
            <span>Explore Options</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  // Initialize tilt card interaction on newly created cards
  initTiltEffect(container);
}

/**
 * Vanilla 3D Tilt interaction matching the rest of the site
 */
function initTiltEffect(scope = document) {
  const tiltCards = scope.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}
