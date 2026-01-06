# JS Modules and Structure

This project uses ES modules. Key files:

- `js/main.js` — entry point (type=module) that imports data and utils, and sets up the UI.
- `js/utils.js` — utility DOM, theme, language, and form functions.
- `js/data/*` — place your data here (`translations.js`, `universities.js`).

How to add data:
- Put constants and arrays in `js/data/*.js` and export them.
- Import them in `js/main.js` and use `document.getElementById()` to render.

Notes:
- This setup avoids inline JS handlers. Prefer `data-*` attributes for binding and `main.js` for event handling.
- The website is static — to test run a local http server (Python):

```powershell
cd "c:\Users\user\Desktop\2025\MR GLOBEL"
python -m http.server 8000
```

Open `http://localhost:8000` in your browser to test.
