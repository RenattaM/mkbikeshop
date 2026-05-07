/**
 * MK Bike Shop — Cookie consent lišta
 * Zobrazuje se při první návštěvě, souhlas se uloží na 1 rok.
 * Vložit jako <script src="cookies-bar.js"></script> před </body> na každé stránce.
 */

(function () {
  const COOKIE_KEY = 'mkbs_cookie_consent';

  // Zkontroluj zda uživatel již rozhodl
  if (localStorage.getItem(COOKIE_KEY)) return;

  // CSS lišty
  const style = document.createElement('style');
  style.textContent = `
    #cookie-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #0a0a0a;
      border-top: 3px solid #F5B800;
      padding: 1.25rem 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      z-index: 9999;
      flex-wrap: wrap;
      box-shadow: 0 -4px 32px rgba(0,0,0,.25);
      font-family: 'Barlow', sans-serif;
    }
    #cookie-bar p {
      font-size: 13px;
      color: #888;
      line-height: 1.6;
      margin: 0;
      flex: 1;
      min-width: 200px;
    }
    #cookie-bar p a {
      color: #F5B800;
      text-decoration: underline;
    }
    #cookie-bar p strong {
      color: #fff;
      font-weight: 600;
    }
    #cookie-bar-btns {
      display: flex;
      gap: .75rem;
      flex-shrink: 0;
    }
    #cookie-accept {
      background: #F5B800;
      color: #0a0a0a;
      border: none;
      padding: 10px 22px;
      border-radius: 4px;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity .2s;
    }
    #cookie-accept:hover { opacity: .88; }
    #cookie-decline {
      background: transparent;
      color: #555;
      border: 1px solid #2a2a2a;
      padding: 9px 18px;
      border-radius: 4px;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: color .2s, border-color .2s;
    }
    #cookie-decline:hover { color: #888; border-color: #444; }
    @media (max-width: 600px) {
      #cookie-bar { padding: 1.25rem 1.25rem; flex-direction: column; align-items: flex-start; }
      #cookie-bar-btns { width: 100%; }
      #cookie-accept, #cookie-decline { flex: 1; text-align: center; }
    }
  `;
  document.head.appendChild(style);

  // HTML lišty
  const bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.innerHTML = `
    <p>
      <strong>Tento web používá cookies.</strong>
      Technické cookies jsou nezbytné pro fungování webu. Analytické cookies
      používáme pouze s vaším souhlasem.
      <a href="cookies.html">Více informací</a>
    </p>
    <div id="cookie-bar-btns">
      <button id="cookie-decline">Jen nezbytné</button>
      <button id="cookie-accept">Přijmout vše</button>
    </div>
  `;
  document.body.appendChild(bar);

  // Uložení souhlasu — platnost 1 rok
  function saveConsent(value) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    localStorage.setItem(COOKIE_KEY, value);
    localStorage.setItem(COOKIE_KEY + '_expires', expires.toISOString());
    bar.style.transition = 'transform .3s ease, opacity .3s ease';
    bar.style.transform = 'translateY(100%)';
    bar.style.opacity = '0';
    setTimeout(() => bar.remove(), 350);
  }

  document.getElementById('cookie-accept').addEventListener('click', () => saveConsent('all'));
  document.getElementById('cookie-decline').addEventListener('click', () => saveConsent('necessary'));
})();
