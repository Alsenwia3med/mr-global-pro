import { translations } from './data/translations.js';
import { universities } from './data/universities.js';
import * as utils from './utils.js';

let currentTheme = localStorage.getItem('theme') || 'light';
let currentLang = localStorage.getItem('lang') || 'ar';

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Module-based site loaded');
  // Apply saved theme & language
  utils.applyTheme(currentTheme);
  utils.applyLanguage(currentLang);

  // Render any dynamic lists (like universities) — minimal example
  const uniContainer = document.getElementById('universitiesList');
  if (uniContainer && universities && universities.length) {
    uniContainer.innerHTML = universities.map(u => {
      const name = currentLang === 'ar' ? u.name_ar : u.name_en;
      return `<div class="card uni">
        <h4>${name}</h4>
        <p>${currentLang === 'ar' ? u.location_ar : u.location_en} • ${u.students} students</p>
      </div>`;
    }).join('\n');
  }

  // Setup event handlers
  window.addEventListener('scroll', utils.handleScroll);
  document.getElementById('scrollTop')?.addEventListener('click', utils.scrollToTop);
  utils.setupSmoothScroll();
  // Mobile menu toggle (compat)
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
    }));
  }
  utils.initializeFAQ();
  utils.observeElements();

  // Track primary/success button clicks
  document.querySelectorAll('.btn-primary, .btn-success').forEach(btn => {
    btn.addEventListener('click', function() {
      utils.trackEvent('button_click', {
        button_text: this.textContent.trim(),
        button_location: this.closest('section')?.id || 'unknown'
      });
    });
  });

  // Language switch
  document.querySelectorAll('.btn-lang').forEach(btn =>
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      currentLang = lang;
      localStorage.setItem('lang', lang);
      utils.applyLanguage(lang);
      // Re-render dynamic components on language change
      if (uniContainer) {
        uniContainer.innerHTML = universities.map(u => `<div class="card uni"><h4>${lang === 'ar' ? u.name_ar : u.name_en}</h4></div>`).join('');
      }
    })
  );

  // Theme switch
  document.querySelectorAll('.btn-theme').forEach(btn =>
    btn.addEventListener('click', () => {
      currentTheme = utils.toggleTheme(currentTheme);
    })
  );

  // Form events (example)
  const form = document.getElementById('applyForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      // Here you can send email/WA using utils
      const body = utils.buildEmailMessage(data, currentLang);
      window.location.href = `mailto:theytruth7@gmail.com?subject=${encodeURIComponent('طلب جديد')}&body=${body}`;
    });
  }

  // WhatsApp button
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const formEl = document.getElementById('applyForm');
      if (!formEl) return;
      const data = Object.fromEntries(new FormData(formEl));
      const msg = utils.buildWhatsAppMessage(data, currentLang);
      const phone = '60143646834';
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
});

// Keep compatibility with old inline handlers (e.g. showUniversityDetails('um'))
window.showUniversityDetails = (id) => {
  utils.showUniversityDetails(universities, id);
};
