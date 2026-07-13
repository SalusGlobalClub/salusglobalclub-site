/* SALUS GLOBAL CLUB — Wealth Club
   Static rendering of webinar + Telegram cards.
   Data captured from https://bio.site/salusglobal.club (2026-07-11).
   Zoom URLs for items 1, 5, 8 corrected from malformed originals
   (see content-backup.md / content-backup.json). */

const WEBINARS = [
  { title: 'Business Präsentation GER | TUESDAYS 9.30 CEST | 50 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-01.jpg', corrected: true },
  { title: 'Leader Training GER | TUESDAYS 10.30 CEST | 90 min', url: 'https://zoom.us/j/95770825858', thumb: 'assets/webinar-02.jpg' },
  { title: 'Leader Training ENG | TUESDAYS 12.30 CEST | 90 min', url: 'https://zoom.us/j/95770825858', thumb: 'assets/webinar-03.jpg' },
  { title: 'Presentazione aziendale ITA | TUESDAYS 19.00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-04.jpg' },
  { title: 'Business Presentation ENG | WEDNESDAYS 19.00 CEST | 50 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-05.jpg', corrected: true },
  { title: 'Business Präsentation und Q&A GER | THURSDAYS 19.00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-06.jpg' },
  { title: 'Business Presentation ENG - WEBINAR MODE | THURSDAYS 9.30 CEST | 60 Min', url: 'https://zoom.us/j/98916828025', thumb: 'assets/webinar-07.jpg' },
  { title: 'Business Presentation ESP | THURSDAYS 21.00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-08.jpg', corrected: true },
  { title: 'Starter Training GER | SATURDAYS 10:00 CEST | 90 Min', url: 'https://zoom.us/j/93664485403', thumb: 'assets/webinar-09.jpg' },
  { title: 'Starter Training ENG | SATURDAYS 12:00 CEST | 90 Min | (Autotranslate in 35 languages)', url: 'https://zoom.us/j/91355320262', thumb: 'assets/webinar-10.jpg' },
];

const TELEGRAM = [
  { title: 'SGC - International Official 🌍', url: 'https://t.me/SGC_international', thumb: 'assets/telegram-01.jpg' },
  { title: 'SGC - Español oficial 🇪🇸', url: 'https://t.me/SGC_espanol', thumb: 'assets/telegram-02.jpg' },
  { title: 'SGC - DACH Offiziell 🇩🇪🇦🇹🇨🇭', url: 'https://t.me/SGC_DACH', thumb: 'assets/telegram-03.jpg' },
  { title: 'SGC - Japanese Official 🇯🇵', url: 'https://t.me/SGC_japanese', thumb: 'assets/telegram-04.jpg' },
  { title: 'SGC - Italiano Ufficiale 🇮🇹', url: 'https://t.me/+-yE3zJcTM1EwNjE6', thumb: 'assets/telegram-05.jpg' },
];

const ARROW = '<svg class="card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

function renderCard(item, kind) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.className = 'card';
  a.href = item.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  const img = document.createElement('img');
  img.className = 'card__thumb';
  img.src = item.thumb;
  img.width = 60; img.height = 60;
  img.loading = 'lazy'; img.decoding = 'async';
  img.alt = item.title + ' thumbnail';

  const body = document.createElement('div');
  body.className = 'card__body';

  const title = document.createElement('p');
  title.className = 'card__title';
  title.textContent = item.title;
  body.appendChild(title);

  const meta = document.createElement('span');
  meta.className = 'card__meta';
  meta.textContent = kind === 'zoom' ? 'Join on Zoom' : 'Open on Telegram';
  body.appendChild(meta);

  a.appendChild(img);
  a.appendChild(body);
  a.insertAdjacentHTML('beforeend', ARROW);
  li.appendChild(a);
  return li;
}

const webinarList = document.getElementById('webinar-list');
WEBINARS.forEach((w) => webinarList.appendChild(renderCard(w, 'zoom')));

const telegramList = document.getElementById('telegram-list');
TELEGRAM.forEach((t) => telegramList.appendChild(renderCard(t, 'telegram')));

document.getElementById('year').textContent = new Date().getFullYear();

/* dark / light toggle (no localStorage — sandboxed iframes block it) */
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  r.setAttribute('data-theme', d);
  const sun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  function apply() { t.innerHTML = d === 'dark' ? moon : sun; t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode'); }
  apply();
  t && t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; r.setAttribute('data-theme', d); apply(); });
})();
