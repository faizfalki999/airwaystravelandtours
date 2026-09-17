/**
 * Airways Travel & Tours — Destinations Component & Dataset
 * Reusable data-driven component for "Top Travel Destinations Around the World"
 */

const DESTINATIONS_LIST = [
  {
    name: "USA",
    image: "assets/dest_usa.jpg",
    layoutClass: "bento-feature-large",
    description: "Iconic Manhattan skylines, majestic national parks, and premier transatlantic flight reservations.",
    link: "#inquiry-section"
  },
  {
    name: "United Kingdom",
    image: "assets/dest_london.jpg",
    layoutClass: "bento-tall",
    description: "London landmarks, royal historic castles, and premier British flight and visa advisory.",
    link: "#inquiry-section"
  },
  {
    name: "United Arab Emirates",
    image: "assets/dest_dubai.jpg",
    layoutClass: "bento-standard",
    description: "Futuristic Dubai skyline, luxury Arabian desert safaris, and rapid tourist visa issuance.",
    link: "#inquiry-section"
  },
  {
    name: "Saudi Arabia",
    image: "assets/dest_saudi_arabia.jpg",
    layoutClass: "bento-standard",
    description: "Dedicated executive Umrah arrangements, historic AlUla heritage, and premier Riyadh stays.",
    link: "#inquiry-section"
  },
  {
    name: "Turkey",
    image: "assets/dest_istanbul.jpg",
    layoutClass: "bento-tall",
    description: "Bosphorus cruises, Cappadocia hot-air ballooning, and fast electronic visa processing.",
    link: "#inquiry-section"
  },
  {
    name: "Thailand",
    image: "assets/dest_thailand.jpg",
    layoutClass: "bento-wide",
    description: "Vibrant Bangkok street culture, crystal Phuket lagoons, and rejuvenating wellness retreats.",
    link: "#inquiry-section"
  },
  {
    name: "Malaysia",
    image: "assets/dest_kuala_lumpur.jpg",
    layoutClass: "bento-standard",
    description: "Petronas twin towers, lush Langkawi rainforests, and swift tourist eVisa approvals.",
    link: "#inquiry-section"
  },
  {
    name: "Singapore",
    image: "assets/dest_singapore.jpg",
    layoutClass: "bento-standard",
    description: "Marina Bay Sands luxury, futuristic Gardens by the Bay, and premier aviation routing.",
    link: "#inquiry-section"
  },
  {
    name: "Maldives",
    image: "assets/dest_maldives.jpg",
    layoutClass: "bento-wide",
    description: "Overwater villa retreats, turquoise private atolls, and tailored honeymoon journeys.",
    link: "#inquiry-section"
  },
  {
    name: "Japan",
    image: "assets/dest_japan.jpg",
    layoutClass: "bento-standard",
    description: "Kyoto imperial shrines, Tokyo neon districts, and luxury ryokan hospitality.",
    link: "#inquiry-section"
  },
  {
    name: "Australia",
    image: "assets/dest_australia.jpg",
    layoutClass: "bento-wide",
    description: "Sydney Harbour sailing, Great Barrier Reef private charters, and comprehensive visa guidance.",
    link: "#inquiry-section"
  },
  {
    name: "Canada",
    image: "assets/dest_canada.jpg",
    layoutClass: "bento-tall",
    description: "Banff turquoise glacial lakes, Rocky Mountain rail voyages, and Canadian tourist visa filing.",
    link: "#inquiry-section"
  },
  {
    name: "Switzerland",
    image: "assets/dest_switzerland.jpg",
    layoutClass: "bento-wide",
    description: "Glacier Express panoramic rail routes, Matterhorn alpine chalets, and 5-star mountain sanctuaries.",
    link: "#inquiry-section"
  },
  {
    name: "France",
    image: "assets/dest_france.jpg",
    layoutClass: "bento-standard",
    description: "Parisian haute couture, Eiffel Tower romance, and comprehensive Schengen visa facilitation.",
    link: "#inquiry-section"
  },
  {
    name: "Italy",
    image: "assets/dest_italy.jpg",
    layoutClass: "bento-tall",
    description: "Rome's timeless antiquities, romantic Venetian gondolas, and secluded Amalfi coastline cliff villas.",
    link: "#inquiry-section"
  },
  {
    name: "Spain",
    image: "assets/dest_barcelona.jpg",
    layoutClass: "bento-feature-large",
    description: "Barcelona architectural masterpieces, sunny Costa del Sol, and curated Schengen tours.",
    link: "#inquiry-section"
  },
  {
    name: "Germany",
    image: "assets/dest_germany.jpg",
    layoutClass: "bento-standard",
    description: "Fairytale Bavarian alpine castles, historic Berlin landmarks, and curated first-class rail itineraries.",
    link: "#inquiry-section"
  },
  {
    name: "Greece",
    image: "assets/dest_santorini.jpg",
    layoutClass: "bento-standard",
    description: "Santorini cliffside whitewashed villas, Aegean yacht cruises, and ancient Athenian heritage.",
    link: "#inquiry-section"
  },
  {
    name: "Qatar",
    image: "assets/dest_qatar.jpg",
    layoutClass: "bento-wide",
    description: "Doha illuminated coastal skyline, Museum of Islamic Art, and 5-star Arabian hospitality.",
    link: "#inquiry-section"
  },
  {
    name: "Morocco",
    image: "assets/dest_morocco.jpg",
    layoutClass: "bento-tall",
    description: "Marrakech luxury riad courtyards, Atlas mountain horizons, and Sahara desert expeditions.",
    link: "#inquiry-section"
  },
  {
    name: "China",
    image: "assets/dest_shanghai.jpg",
    layoutClass: "bento-standard",
    description: "Shanghai futuristic skyline, Great Wall heritage, and streamlined business and tourist visas.",
    link: "#inquiry-section"
  },
  {
    name: "Egypt",
    image: "assets/dest_egypt.jpg",
    layoutClass: "bento-standard",
    description: "Legendary Giza pyramids, luxury Nile riverboat cruises, and complete consular visa facilitation.",
    link: "#inquiry-section"
  },
  {
    name: "Azerbaijan",
    image: "assets/dest_azerbaijan.jpg",
    layoutClass: "bento-standard",
    description: "Ancient Silk Road marvels, Baku flame towers, and swift electronic visa processing.",
    link: "#inquiry-section"
  },
  {
    name: "Indonesia",
    image: "assets/dest_indonesia.jpg",
    layoutClass: "bento-standard",
    description: "Tropical Bali sanctuary retreats, sacred volcanic temples, and curated private island hopping.",
    link: "#inquiry-section"
  },
  {
    name: "Pakistan",
    image: "assets/dest_pakistan.jpg",
    layoutClass: "bento-tall",
    description: "Mirrored Skardu glacial lakes, Karakoram high-altitude treks, and bespoke luxury northern expeditions.",
    link: "#inquiry-section"
  },
  {
    name: "Sweden",
    image: "assets/dest_sweden.jpg",
    layoutClass: "bento-feature-large",
    description: "Enchanting Stockholm archipelago canals, Arctic aurora borealis safaris, and secluded Nordic chalets.",
    link: "#inquiry-section"
  },
  {
    name: "Brazil",
    image: "assets/dest_brazil.jpg",
    layoutClass: "bento-standard",
    description: "Sun-drenched Copacabana shores, Amazon expeditions, and vibrant Rio de Janeiro culture.",
    link: "#inquiry-section"
  },
  {
    name: "Cambodia",
    image: "assets/dest_cambodia.jpg",
    layoutClass: "bento-standard",
    description: "Mystical Angkor Wat sunrise explorations, ancient Khmer heritage, and fast-track tourist eVisa approval.",
    link: "#inquiry-section"
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
      <a href="${resolvedLink}" class="service-feature-card tilt-card ${dest.layoutClass} destination-inquire-trigger" data-dest="${dest.name}" data-tilt aria-label="Explore travel to ${dest.name}">
        <div class="service-card-banner">
          <img src="${resolvedImage}" alt="${dest.name}" loading="lazy">
          <div class="service-banner-overlay"></div>
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
