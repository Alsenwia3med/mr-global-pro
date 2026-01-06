# Adding data to MR GLOBAL site

This folder contains JavaScript data modules used by the website. Best practices:

- `translations.js` — Add keys under `ar` and `en` objects. Use keys as `data-i18n` attributes in the HTML.

- `universities.js` — Add objects with format:
  {
    id: 'um',
    name_ar: 'جامعة ماليا (UM)',
    name_en: 'University of Malaya (UM)',
    rank: 60,
    location_ar: 'كوالالمبور',
    location_en: 'Kuala Lumpur',
    students: 27000,
    fees_usd: '8000-15000',
    contact: 'info@um.edu.my'
  }

Main render is in `js/main.js` — it reads the `universities` array and inserts cards in `#universitiesList`.

Tips:
- Use `data-i18n` attributes for static HTML text and keep translations in `translations.js`.
- To add other data sets (houses, institutes, testimonials) create new files in this folder and import them in `js/main.js`.
