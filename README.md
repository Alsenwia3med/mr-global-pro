# MR GLOBAL EDUCATION — Project Overview

Steps to add content/data:
1. Add static translations to `js/data/translations.js` as key => value pairs for `ar` and `en`.
2. Add universities (or other data) to `js/data/universities.js` (array of objects). 
3. Update `js/main.js` if you need to render any new content or add components (it imports data modules).

Developer notes:
- `index.html` now loads `js/main.js` as module (`<script type="module" src="js/main.js"></script>`).
- Avoid inline onclick. Use `data-*` attributes and event listeners in `js/main.js`.

Run locally:
```powershell
cd "c:\Users\user\Desktop\2025\MR GLOBEL"
python -m http.server 8000
```
Open: http://localhost:8000
