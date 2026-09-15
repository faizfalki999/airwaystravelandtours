/**
 * Airways Travel & Tours — Partners & Clients Data
 * Complete list of 39 brand & studio partners
 */

const PARTNERS_LIST = [
  { name: "IAL International Advertising (Saatchi & Saatchi)", src: "assets/partners/ial-saatchi.png" },
  { name: "MullenLowe Rauf", src: "assets/partners/mullenlowe-rauf.png" },
  { name: "Peek Freans", src: "assets/partners/peek-freans.png" },
  { name: "The Dhamani Partnership", src: "assets/partners/dhamani.png" },
  { name: "Connect Digital Marketing", src: "assets/partners/connect-digital.png" },
  { name: "The Crew Films", src: "assets/partners/the-crew-films.png" },
  { name: "Ambience", src: "assets/partners/ambience.png" },
  { name: "See'me Productions", src: "assets/partners/seeme-productions.png" },
  { name: "Stimulus Production", src: "assets/partners/stimulus-production.png" },
  { name: "Bionic Films", src: "assets/partners/bionic-films.png" },
  { name: "Ogilvy", src: "assets/partners/ogilvy.png" },
  { name: "Digitz", src: "assets/partners/digitz.png" },
  { name: "Sonraj Pakistan", src: "assets/partners/sonraj.png" },
  { name: "Azad Films", src: "assets/partners/azad-films.png" },
  { name: "Art Noir", src: "assets/partners/art-noir.png" },
  { name: "Big Guns", src: "assets/partners/big-guns.png" },
  { name: "Page 33 Productions", src: "assets/partners/page-33.png" },
  { name: "Citrus", src: "assets/partners/citrus.png" },
  { name: "Shan", src: "assets/partners/shan.png" },
  { name: "NMC Healthcare", src: "assets/partners/nmc-healthcare.png" },
  { name: "Turktex Chemicals", src: "assets/partners/turktex.png" },
  { name: "Crew Entertainment", src: "assets/partners/crew-entertainment.png" },
  { name: "LCG Lights Camera Grips", src: "assets/partners/lcg.png" },
  { name: "LightSources", src: "assets/partners/lightsources.png" },
  { name: "Medica", src: "assets/partners/medica.png" },
  { name: "Platinum Pharmaceuticals", src: "assets/partners/platinum-pharma.png" },
  { name: "Eastern Garments", src: "assets/partners/eastern-garments.png" },
  { name: "Terminal One Limited", src: "assets/partners/terminal-one.png" },
  { name: "Rastek Technologies", src: "assets/partners/rastek.png" },
  { name: "M.Mawji & Sons", src: "assets/partners/mawji-sons.png" },
  { name: "Saima Group", src: "assets/partners/saima-group.png" },
  { name: "Mehran University of Engineering and Technology Jamshoro", src: "assets/partners/muet-jamshoro.png" },
  { name: "Deepak Perwani", src: "assets/partners/deepak-perwani.png" },
  { name: "Mansha Brothers", src: "assets/partners/mansha-brothers.png" },
  { name: "Zeeco", src: "assets/partners/zeeco.png" },
  { name: "Zainab Chottani", src: "assets/partners/zainab-chottani.png" },
  { name: "Collectibles Jewellery & Watches", src: "assets/partners/collectibles.png" },
  { name: "Wide Angle Films", src: "assets/partners/wide-angle-films.png" },
  { name: "Epic Films", src: "assets/partners/epic-films.png" }
];

/**
 * Populates both tracks of the marquee for seamless infinite looping.
 * @param {string} trackSelector - CSS selector for tracks
 */
function initPartnersMarquee(trackSelector = '.partners-track') {
  const tracks = document.querySelectorAll(trackSelector);
  if (!tracks || tracks.length === 0) return;

  const trackHtml = PARTNERS_LIST.map(item => `
    <div class="partner-logo" title="${item.name}">
      <img src="${item.src}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';">
      <span class="partner-logo-fallback" style="display:none;">${item.name}</span>
    </div>
  `).join('');

  tracks.forEach(track => {
    track.innerHTML = trackHtml;
  });
}
