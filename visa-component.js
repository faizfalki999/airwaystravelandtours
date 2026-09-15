/**
 * Airways Travel & Tours — Reusable Visa Grid Component
 * Easily extensible country dataset and renderer.
 */

const VISA_COUNTRIES = [
  {
    id: 'australia',
    country: 'Australia',
    code: 'au',
    price: 'PKR 60,000',
    flag: 'assets/flags/au.png',
    processing: '15–20 Working Days',
    type: 'Visitor / Tourist Stream'
  },
  {
    id: 'azerbaijan',
    country: 'Azerbaijan',
    code: 'az',
    price: 'PKR 10,000',
    flag: 'assets/flags/az.png',
    processing: '3–5 Working Days',
    type: 'Official Electronic Visa (ASAN)'
  },
  {
    id: 'bahrain',
    country: 'Bahrain',
    code: 'bh',
    price: 'PKR 35,000',
    flag: 'assets/flags/bh.png',
    processing: '5–7 Working Days',
    type: 'Tourist / Business eVisa'
  },
  {
    id: 'cambodia',
    country: 'Cambodia',
    code: 'kh',
    price: 'PKR 25,000',
    flag: 'assets/flags/kh.png',
    processing: '4–6 Working Days',
    type: 'Tourist eVisa (Type T)'
  },
  {
    id: 'canada',
    country: 'Canada',
    code: 'ca',
    price: 'PKR 60,000',
    flag: 'assets/flags/ca.png',
    processing: '30–45 Working Days',
    type: 'Temporary Resident Visa (TRV)'
  },
  {
    id: 'china',
    country: 'China',
    code: 'cn',
    price: 'PKR 45,000',
    flag: 'assets/flags/cn.png',
    processing: '7–10 Working Days',
    type: 'L Visa (Tourist / Family)'
  },
  {
    id: 'egypt',
    country: 'Egypt',
    code: 'eg',
    price: 'PKR 30,000',
    flag: 'assets/flags/eg.png',
    processing: '10–14 Working Days',
    type: 'Tourist Visa / Group Approval'
  },
  {
    id: 'france',
    country: 'France',
    code: 'fr',
    price: 'PKR 75,000',
    flag: 'assets/flags/fr.png',
    processing: '15–21 Working Days',
    type: 'Schengen Short-Stay (Type C)'
  }
];

/**
 * Initializes the Visa Grid Component
 * @param {Object} options
 * @param {string} options.containerId - ID of grid container
 * @param {string} options.searchInputId - ID of search bar
 * @param {string} options.counterId - ID of count display
 * @param {string} options.assetPrefix - Path prefix for flag images (e.g. '../' when inside subfolder)
 */
function initVisaGrid(options = {}) {
  const container = document.getElementById(options.containerId || 'visa-cards-grid');
  if (!container) return;

  const searchInput = document.getElementById(options.searchInputId || 'visa-search-input');
  const counterEl = document.getElementById(options.counterId || 'visa-counter-val');
  const assetPrefix = options.assetPrefix || '';

  function render(list) {
    container.innerHTML = '';
    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: rgba(14, 42, 60, 0.4); border-radius: 16px; border: 1px dashed rgba(56, 189, 248, 0.3);">
          <p style="color: #cbdbe6; font-size: 1.1rem; margin-bottom: 8px;">No matching destinations found.</p>
          <p style="color: #8fa8ba; font-size: 0.9rem;">Need a visa for another country? Contact our desk directly below.</p>
        </div>
      `;
    } else {
      list.forEach(item => {
        const card = document.createElement('article');
        card.className = 'visa-card';
        card.setAttribute('data-country', item.country);
        card.setAttribute('data-id', item.id);

        card.innerHTML = `
          <div class="visa-flag-wrap">
            <img src="${assetPrefix}${item.flag}" alt="National Flag of ${item.country}" class="visa-flag-img" loading="lazy">
            <div class="visa-flag-overlay" aria-hidden="true"></div>
          </div>
          <div class="visa-card-content">
            <h3 class="visa-card-title">Visa For ${item.country}</h3>
            <div class="visa-price-block">
              <span class="visa-start-label">Starting from</span>
              <div class="visa-price-val">${item.price}</div>
            </div>
            <button type="button" class="visa-apply-btn" data-country="${item.country}" data-price="${item.price}" aria-label="Apply for ${item.country} Visa">
              APPLY NOW
            </button>
          </div>
        `;
        container.appendChild(card);
      });
    }

    if (counterEl) {
      counterEl.textContent = list.length;
    }

    bindApplyButtons();
  }

  function bindApplyButtons() {
    const buttons = container.querySelectorAll('.visa-apply-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const country = btn.getAttribute('data-country');
        const price = btn.getAttribute('data-price');
        handleVisaApply(country, price);
      });
    });
  }

  function handleVisaApply(country, price) {
    const subjectInput = document.getElementById('contact-subject');
    const countrySelect = document.getElementById('contact-visa-country');
    const formSection = document.getElementById('visa-inquiry-section') || document.getElementById('contact-section');
    const formCard = document.querySelector('.contact-form-panel');
    const tagNotice = document.getElementById('visa-selected-tag');
    const selectedCountryText = document.getElementById('selected-country-text');

    if (subjectInput) {
      subjectInput.value = `Visa Application Inquiry: ${country} (${price})`;
    }
    if (countrySelect) {
      countrySelect.value = country;
    }
    if (tagNotice && selectedCountryText) {
      selectedCountryText.textContent = `${country} (${price})`;
      tagNotice.style.display = 'inline-flex';
    }

    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (formCard) {
      formCard.classList.remove('visa-pulse-active');
      void formCard.offsetWidth; // Trigger reflow
      formCard.classList.add('visa-pulse-active');
    }
  }

  // Live search filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = VISA_COUNTRIES.filter(item => 
        item.country.toLowerCase().includes(q)
      );
      render(filtered);
    });
  }

  // Initial render
  render(VISA_COUNTRIES);

  // Check URL param if user was referred with ?country=France
  const urlParams = new URLSearchParams(window.location.search);
  const targetCountry = urlParams.get('country');
  if (targetCountry) {
    const matched = VISA_COUNTRIES.find(c => c.country.toLowerCase() === targetCountry.toLowerCase());
    if (matched) {
      setTimeout(() => {
        handleVisaApply(matched.country, matched.price);
      }, 400);
    }
  }
}
