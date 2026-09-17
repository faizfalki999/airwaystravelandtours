/**
 * Airways Travel & Tours — Destinations Component & Dataset
 * Reusable data-driven component for "Top Travel Destinations Around the World"
 */

const DESTINATIONS_LIST = [
  {
    name: "USA",
    image: "assets/dest_usa.jpg",
    emoji: "🗽",
    description: "Iconic Manhattan skylines, majestic national parks, and premier transatlantic flight reservations.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "United Kingdom",
    image: "assets/dest_london.jpg",
    emoji: "🇬🇧",
    description: "London landmarks, royal historic castles, and premier British flight and visa advisory.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "United Arab Emirates",
    image: "assets/dest_dubai.jpg",
    emoji: "🇦🇪",
    description: "Futuristic Dubai skyline, luxury Arabian desert safaris, and rapid tourist visa issuance.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Saudi Arabia",
    image: "assets/dest_saudi_arabia.jpg",
    emoji: "🕌",
    description: "Dedicated executive Umrah arrangements, historic AlUla heritage, and premier Riyadh stays.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Turkey",
    image: "assets/dest_istanbul.jpg",
    emoji: "🇹🇷",
    description: "Bosphorus cruises, Cappadocia hot-air ballooning, and fast electronic visa processing.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Thailand",
    image: "assets/dest_thailand.jpg",
    emoji: "🐘",
    description: "Vibrant Bangkok street culture, crystal Phuket lagoons, and rejuvenating wellness retreats.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Malaysia",
    image: "assets/dest_kuala_lumpur.jpg",
    emoji: "🇲🇾",
    description: "Petronas twin towers, lush Langkawi rainforests, and swift tourist eVisa approvals.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Singapore",
    image: "assets/dest_singapore.jpg",
    emoji: "🦁",
    description: "Marina Bay Sands luxury, futuristic Gardens by the Bay, and premier aviation routing.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Maldives",
    image: "assets/dest_maldives.jpg",
    emoji: "🏝️",
    description: "Overwater villa retreats, turquoise private atolls, and tailored honeymoon journeys.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Japan",
    image: "assets/dest_japan.jpg",
    emoji: "⛩️",
    description: "Kyoto imperial shrines, Tokyo neon districts, and luxury ryokan hospitality.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Australia",
    image: "assets/dest_australia.jpg",
    emoji: "🦘",
    description: "Sydney Harbour sailing, Great Barrier Reef private charters, and comprehensive visa guidance.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Canada",
    image: "assets/dest_canada.jpg",
    emoji: "🍁",
    description: "Banff turquoise glacial lakes, Rocky Mountain rail voyages, and Canadian tourist visa filing.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Switzerland",
    image: "assets/dest_switzerland.jpg",
    emoji: "⛰️",
    description: "Glacier Express panoramic rail routes, Matterhorn alpine chalets, and 5-star mountain sanctuaries.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "France",
    image: "assets/dest_france.jpg",
    emoji: "🗼",
    description: "Parisian haute couture, Eiffel Tower romance, and comprehensive Schengen visa facilitation.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Italy",
    image: "assets/dest_italy.jpg",
    emoji: "🏛️",
    description: "Rome's timeless antiquities, romantic Venetian gondolas, and secluded Amalfi coastline cliff villas.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Spain",
    image: "assets/dest_barcelona.jpg",
    emoji: "🇪🇸",
    description: "Barcelona architectural masterpieces, sunny Costa del Sol, and curated Schengen tours.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Germany",
    image: "assets/dest_germany.jpg",
    emoji: "🏰",
    description: "Fairytale Bavarian alpine castles, historic Berlin landmarks, and curated first-class rail itineraries.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Greece",
    image: "assets/dest_santorini.jpg",
    emoji: "🏛️",
    description: "Santorini cliffside whitewashed villas, Aegean yacht cruises, and ancient Athenian heritage.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Qatar",
    image: "assets/dest_qatar.jpg",
    emoji: "🇶🇦",
    description: "Doha illuminated coastal skyline, Museum of Islamic Art, and 5-star Arabian hospitality.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Morocco",
    image: "assets/dest_morocco.jpg",
    emoji: "🇲🇦",
    description: "Marrakech luxury riad courtyards, Atlas mountain horizons, and Sahara desert expeditions.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "China",
    image: "assets/dest_shanghai.jpg",
    emoji: "🏮",
    description: "Shanghai futuristic skyline, Great Wall heritage, and streamlined business and tourist visas.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Egypt",
    image: "assets/dest_egypt.jpg",
    emoji: "🐫",
    description: "Legendary Giza pyramids, luxury Nile riverboat cruises, and complete consular visa facilitation.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Azerbaijan",
    image: "assets/dest_azerbaijan.jpg",
    emoji: "🏰",
    description: "Ancient Silk Road marvels, Baku flame towers, and swift electronic visa processing.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Indonesia",
    image: "assets/dest_indonesia.jpg",
    emoji: "🏝️",
    description: "Tropical Bali sanctuary retreats, sacred volcanic temples, and curated private island hopping.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Brazil",
    image: "assets/dest_brazil.jpg",
    emoji: "🌴",
    description: "Sun-drenched Copacabana shores, Amazon expeditions, and vibrant Rio de Janeiro culture.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Pakistan",
    image: "assets/dest_pakistan.jpg",
    emoji: "🏔️",
    description: "Mirrored Skardu glacial lakes, Karakoram high-altitude treks, and bespoke luxury northern expeditions.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Cambodia",
    image: "assets/dest_cambodia.jpg",
    emoji: "🛕",
    description: "Mystical Angkor Wat sunrise explorations, ancient Khmer heritage, and fast-track tourist eVisa approval.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
  },
  {
    name: "Sweden",
    image: "assets/dest_sweden.jpg",
    emoji: "❄️",
    description: "Enchanting Stockholm archipelago canals, Arctic aurora borealis safaris, and secluded Nordic chalets.",
    link: "#inquiry-section",
    layoutClass: "bento-standard"
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
