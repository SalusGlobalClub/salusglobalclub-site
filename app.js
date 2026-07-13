/* SALUS GLOBAL CLUB — Wealth Club
   Static rendering of webinar + Telegram cards.
   Webinar schedule from the "Speaker Flyer" sheet (2026-07-13).
   Telegram targets use the salusglobal.club redirect subdomains
   (managed via GoDaddy forwarding). */

const WEBINARS = [
  { title: 'Business Presentation ENG | MONDAYS 17:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-eng.jpg', speakers: 'Manuel Leidel · David Bunenberg · Claudio Catrini' },
  { title: 'Business Presentation GER | TUESDAYS 9:30 CEST | 50 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-ger.jpg', speakers: 'Manuel Leidel · Claudio Catrini' },
  { title: 'Leader Training GER | TUESDAYS 10:30 CEST | 2h', url: 'https://zoom.us/j/95770825858', thumb: 'assets/leaders-ger.jpg', speakers: 'Claudio Catrini' },
  { title: 'Business Presentation ENG | TUESDAYS 17:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-eng.jpg', speakers: 'Manuel Leidel · David Bunenberg · Claudio Catrini' },
  { title: 'Business Presentation ITA | TUESDAYS 19:00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-04.jpg', speakers: 'Francesco Mercone · Claudio Catrini' },
  { title: 'Business Presentation ENG | WEDNESDAYS 17:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-eng.jpg', speakers: 'Manuel Leidel · David Bunenberg · Claudio Catrini' },
  { title: 'Business Presentation ENG (Privacy Mode) | THURSDAYS 9:30 CEST | 60 Min', url: 'https://zoom.us/j/98916828025', thumb: 'assets/webinar-eng.jpg', speakers: 'Manuel Leidel · Claudio Catrini' },
  { title: 'Business Presentation ENG | THURSDAYS 17:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-eng.jpg', speakers: 'Manuel Leidel · David Bunenberg · Claudio Catrini' },
  { title: 'Business Presentation GER | THURSDAYS 19:00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-ger.jpg', speakers: 'Manuel Leidel · Claudio Catrini' },
  { title: 'Business Presentation ESP | THURSDAYS 21:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-esp.jpg', speakers: 'Manuel Leidel' },
  { title: 'Business Presentation HINDI | FRIDAYS 17:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/webinar-hin.jpg', speakers: 'Sunil Kumar' },
  { title: 'Starter Training GER | SATURDAYS 10:00 CEST | 2h', url: 'https://zoom.us/j/95346205331', thumb: 'assets/webinar-09.jpg', speakers: 'Claudio Catrini' },
  { title: 'Starter Training ENG | SATURDAYS 10:00 CEST | 90 Min', url: 'https://zoom.us/j/91355320262', thumb: 'assets/starter-eng.jpg', speakers: 'David Bunenberg' },
];

/* Telegram cards link straight to t.me: Telegram's in-app browser
   intercepts direct t.me links cleanly, while 301 redirects
   (dach.salusglobal.club etc.) freeze Telegram on iOS. The redirect
   subdomains remain in use on bio.site and printed flyers only. */
const TELEGRAM = [
  { title: 'SGC - DACH Offiziell 🇩🇪🇦🇹🇨🇭', url: 'https://t.me/SGC_DACH', thumb: 'assets/tg-dach.jpg' },
  { title: 'SGC - International Official 🌍', url: 'https://t.me/SGC_international', thumb: 'assets/tg-int.jpg' },
  { title: 'SGC - Español Oficial 🇪🇸', url: 'https://t.me/SGC_espanol', thumb: 'assets/tg-es.jpg' },
  { title: 'SGC - Japanese Official 🇯🇵', url: 'https://t.me/SGC_japanese', thumb: 'assets/tg-jp.jpg' },
  { title: 'SGC - Italiano Ufficiale 🇮🇹', url: 'https://t.me/+-yE3zJcTM1EwNjE6', thumb: 'assets/tg-it.jpg' },
];

const ARROW = '<svg class="card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

function renderCard(item, kind) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.className = 'card';
  a.href = item.url;
  if (kind === 'zoom') {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

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

  if (item.speakers) {
    const speakers = document.createElement('p');
    speakers.className = 'card__speakers';
    speakers.textContent = item.speakers;
    body.appendChild(speakers);
  }

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

/* dark / light toggle — dark is the brand default (matches salusglobal.club) */
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = 'dark';
  r.setAttribute('data-theme', d);
  const sun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  function apply() { t.innerHTML = d === 'dark' ? moon : sun; t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode'); }
  apply();
  t && t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; r.setAttribute('data-theme', d); apply(); });
})();
