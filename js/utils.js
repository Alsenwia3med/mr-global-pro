// Utility functions used by main.js (DOM helpers, theme, language, forms)
export function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  const themeBtn = document.querySelector('.btn-theme');
  if (themeBtn) themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}

export function toggleTheme(currentTheme) {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
  return newTheme;
}

export function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Toggle active lang buttons
  document.querySelectorAll('.btn-lang').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang') || btn.getAttribute('data-lang');
    btn.classList.toggle('active', btnLang === lang);
  });
}

export function buildEmailMessage(data, lang = 'ar') {
  // This returns an encoded body string — keep simple, can be extended
  let message = `${lang === 'ar' ? 'طلب جديد' : 'New Application'}\n`;
  message += `Name: ${data.name}\nEmail: ${data.email}`;
  return encodeURIComponent(message);
}

export function buildWhatsAppMessage(data, lang = 'ar') {
  // For simplicity return plain text
  return `${lang === 'ar' ? 'طلب استشارة' : 'Application'} - ${data.name} - ${data.email}`;
}

export function trackEvent(eventName, data) {
  console.log('Analytics event', eventName, data);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.card, .uni, .testimonial, .stat, .feature, .institute, .accommodation')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
}

export function showUniversityDetails(unis, uniId) {
  const uni = unis.find(u => u.id === uniId);
  if (!uni) return alert('University not found');

  const name = uni.name_ar || uni.name_en || uni.id;
  let message = `${name}\n\n`;
  message += `${uni.location_ar || uni.location_en}\n`;
  message += `Students: ${uni.students}\n`;
  message += `Fees: ${uni.fees_usd} USD/year\n`;
  message += `Contact: ${uni.contact}`;
  alert(message);
}

export function initializeFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      // Toggle open
      const isActive = q.classList.contains('active');
      document.querySelectorAll('.faq-question').forEach(x => {
        x.classList.remove('active');
        x.nextElementSibling.classList.remove('active');
      });
      if (!isActive) {
        q.classList.add('active');
        q.nextElementSibling.classList.add('active');
      }
    });
  });
}

export function handleScroll() {
  const scrollTop = document.getElementById('scrollTop');
  const nav = document.getElementById('mainNav');
  if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 500);
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
}

export function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
