/* SALUS GLOBAL CLUB — Wealth Club
   Static rendering of webinar + Telegram cards.
   Deployed via GitHub Pages to bio.salusglobal.club */

const WEBINARS = [
  { title: 'Business Presentation ENG | MONDAYS 17:30 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Auvesta Produktpräsentation und Q&A GER | MONDAYS 19:00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.png' },
  { title: 'Business Präsentation GER | TUESDAYS 9:30 CEST | 50 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-ger.jpg' },
  { title: 'Leader Training GER | TUESDAYS 10:30 CEST | 2h', url: 'https://zoom.us/j/95770825858', thumb: 'assets/leader-ger.jpg' },
  { title: 'Compensation Plan Training ENG | TUESDAYS 17:30 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'tegasFX Produktpräsentation und Q&A GER | TUESDAYS 19:00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.png' },
  { title: 'Business Presentation ENG | WEDNESDAYS 17:30 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Aionas21 Produktpräsentation und Q&A GER | WEDNESDAYS 19:00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.png' },
  { title: 'Business Presentation ENG – Privacy Mode | THURSDAYS 9:30 CEST | 60 Min', url: 'https://zoom.us/j/98916828025', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Compensation Plan Training ENG | THURSDAYS 17:30 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Business Präsentation und Q&A GER | THURSDAYS 19:00 CEST | 90 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/business-qna-ger.jpg' },
  { title: 'Presentación de Negocio ESP | THURSDAYS 21:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-esp.jpg' },
  { title: 'Business Presentation in Hindi | FRIDAYS 17:00 CEST | 60 Min', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-hin.jpg' },
  { title: 'Starter Training GER | SATURDAYS 10:00 CEST | 2h', url: 'https://zoom.us/j/95346205331', thumb: 'assets/starter-ger.jpg' },
  { title: 'Starter Training ENG | SATURDAYS 10:00 CEST | 90 Min | (Auto translation in 35 languages)', url: 'https://zoom.us/j/91355320262', thumb: 'assets/starter-eng.jpg' },
];

const TELEGRAM = [
  { title: 'SGC - International Official \u{1F30D}', url: 'https://t.me/SGC_international', thumb: 'assets/tg-int.jpg' },
  { title: 'SGC - Español Oficial \u{1F1EA}\u{1F1F8}', url: 'https://t.me/SGC_espanol', thumb: 'assets/tg-es.jpg' },
  { title: 'SGC - DACH Offiziell \u{1F1E9}\u{1F1EA}\u{1F1E6}\u{1F1F9}\u{1F1E8}\u{1F1ED}', url: 'https://t.me/SGC_DACH', thumb: 'assets/tg-dach.jpg' },
  { title: 'SGC - Japanese Official \u{1F1EF}\u{1F1F5}', url: 'https://t.me/SGC_japanese', thumb: 'assets/tg-jp.jpg' },
  { title: 'SGC - Italiano Ufficiale \u{1F1EE}\u{1F1F9}', url: 'https://t.me/+-yE3zJcTM1EwNjE6', thumb: 'assets/tg-it.jpg' },
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

/* dark / light toggle */
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
