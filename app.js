/* SALUS GLOBAL CLUB — Wealth Club
   Static rendering of webinar + Telegram cards.
   Deployed via GitHub Pages to bio.salusglobal.club */

const WEBINARS = [
  { title: 'Business Presentation | MONDAYS 17:30 CEST | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Auvesta Produktpräsentation und Q&A | MONTAGS 19:00 CEST | 90 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.jpg' },
  { title: 'Business Präsentation | DIENSTAGS 9:30 CEST | 50 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-ger.jpg' },
  { title: 'Leader Training | DIENSTAGS 10:30 CEST | 2h', lang: 'GER', url: 'https://zoom.us/j/95770825858', thumb: 'assets/leader-ger.jpg' },
  { title: 'tegasFX Produktpräsentation und Q&A | DIENSTAGS 19:00 CEST | 90 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.jpg' },
  { title: 'Business Presentation | WEDNESDAYS 9:30 CEST | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Aionas21 Produktpräsentation und Q&A | MITTWOCHS 19:00 CEST | 90 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.jpg' },
  { title: 'Business Presentation | WEDNESDAYS 20:00 CEST | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-eng.jpg' },
  { title: 'Business Präsentation und Q&A | DONNERSTAGS 19:00 CEST | 90 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/business-qna-ger.jpg' },
  { title: 'Presentación de Negocio | JUEVES 21:00 CEST | 60 Min', lang: 'ESP', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-esp.jpg' },
  { title: 'Business Presentation in Hindi | FRIDAYS 17:00 CEST | 60 Min', lang: 'HIN', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-hin.jpg' },
  { title: 'Starter Training | SAMSTAGS 10:00 CEST | 2h', lang: 'GER', url: 'https://zoom.us/j/95346205331', thumb: 'assets/starter-ger.jpg' },
  { title: 'Starter Training | SATURDAYS 10:00 CEST | 90 Min | (Auto translation in 35 languages)', lang: 'ENG', url: 'https://zoom.us/j/91355320262', thumb: 'assets/starter-eng.jpg' },
];

/* Sprachen für Filter-Knöpfe und Gruppen-Überschriften.
   Die Reihenfolge hier bestimmt die Reihenfolge der Knöpfe UND der Gruppen.
   Ein Knopf erscheint nur, wenn es zu der Sprache auch Webinare gibt.
   Die zugehörige Flagge steht unten in FLAGS. */
const LANGUAGES = [
  { code: 'GER', heading: 'Deutsch' },
  { code: 'ENG', heading: 'English' },
  { code: 'ESP', heading: 'Español' },
  { code: 'HIN', heading: 'हिन्दी · Hindi' },
];

/* Übersetzung des Webinar-Bereichs. Nur Sprachen, die hier stehen, schalten um —
   alles andere (ALL, ENG, ESP, HIN) bleibt automatisch englisch.
   ACHTUNG: Der englische Text steht NICHT hier, sondern in index.html; er wird von
   dort gelesen. Wer den englischen Absatz dort ändert, sollte den deutschen hier
   mitziehen, sonst sagen die beiden Fassungen etwas Unterschiedliches.
   Telegram-Block und Fußzeile bleiben immer englisch. */
const TEXTS = {
  GER: {
    htmlLang: 'de',
    title: 'Webinare & Kanäle',
    desc: 'Willkommen. Wissen ist der Schlüssel zu deinem Erfolg. Nimm an unseren wöchentlichen '
        + 'Webinaren und Live-Trainings teil, um dein Geschäft aufzubauen, dein Team zu entwickeln '
        + 'und neue Interessenten souverän einzuladen. Sei regelmäßig dabei – und erlebe, wie die '
        + 'Dynamik wächst. Verpasse keine wichtigen Updates, Neuigkeiten oder Ankündigungen vom '
        + 'Salus Global Club. Folge unseren Telegram-Kanälen und bleib informiert, wo immer du '
        + 'bist. Schnell, direkt und immer aktuell.',
    inWord: 'auf',                                        /* „7 Termine auf Deutsch" */
    sessions: (n) => (n === 1 ? '1 Termin' : n + ' Termine'),
  },
};

/* Beschriftung unter dem Kartentitel. Sie richtet sich nach der Sprache des
   Termins (Feld `lang`), NICHT nach dem gewählten Filter — sonst stünde in der
   ALL-Ansicht über einer spanischen Karte eine englische Zeile. Sprachen ohne
   Eintrag bekommen den englischen Standard, so auch Hindi. */
const JOIN_DEFAULT = 'Join on Zoom';
const JOIN = {
  GER: 'Per Zoom teilnehmen',
  ESP: 'Unirse por Zoom',
};

const TELEGRAM = [
  { title: 'SGC - International Official \u{1F30D}', url: 'https://t.me/SGC_international', thumb: 'assets/tg-int.jpg' },
  { title: 'SGC - Español Oficial \u{1F1EA}\u{1F1F8}', url: 'https://t.me/SGC_espanol', thumb: 'assets/tg-es.jpg' },
  { title: 'SGC - DACH Offiziell \u{1F1E9}\u{1F1EA}\u{1F1E6}\u{1F1F9}\u{1F1E8}\u{1F1ED}', url: 'https://t.me/SGC_DACH', thumb: 'assets/tg-dach.jpg' },
];

/* Flaggen bewusst als gezeichnetes SVG, NICHT als Emoji (🇩🇪 …):
   Windows liefert keine Flaggen-Emoji mit — dort erschiene nur „DE" oder gar nichts.
   So sehen Handy, Mac und Windows dieselben Flaggen. Neue Sprache = hier eine
   Flagge unter dem Kürzel aus LANGUAGES ergänzen (Seitenverhältnis 21 × 15). */
const FLAGS = {
  GER: '<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#ffce00"/><rect width="21" height="10" fill="#d00"/><rect width="21" height="5"/></svg>',
  ENG: '<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#012169"/>'
     + '<path d="M0 0 21 15M21 0 0 15" stroke="#fff" stroke-width="3"/>'
     + '<path d="M0 0 21 15M21 0 0 15" stroke="#c8102e" stroke-width="1.8"/>'
     + '<path d="M10.5 0V15M0 7.5H21" stroke="#fff" stroke-width="5"/>'
     + '<path d="M10.5 0V15M0 7.5H21" stroke="#c8102e" stroke-width="3"/></svg>',
  ESP: '<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#aa151b"/><rect y="3.75" width="21" height="7.5" fill="#f1bf00"/></svg>',
  HIN: '<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#138808"/><rect width="21" height="10" fill="#fff"/><rect width="21" height="5" fill="#f93"/>'
     + '<circle cx="10.5" cy="7.5" r="1.8" fill="none" stroke="#008" stroke-width="0.55"/><circle cx="10.5" cy="7.5" r="0.45" fill="#008"/></svg>',
};

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

  /* „Titel | Tag Uhrzeit | Dauer" wird zeilenweise gesetzt: der Titel fett obenauf,
     jeder weitere Abschnitt hinter einem | bekommt seine eigene Zeile. Titel ohne |
     (Telegram-Karten) bleiben unverändert einzeilig. */
  const parts = item.title.split('|').map((s) => s.trim()).filter(Boolean);

  const title = document.createElement('p');
  title.className = 'card__title';
  title.textContent = parts[0];
  body.appendChild(title);

  if (parts.length > 1) {
    const when = document.createElement('p');
    when.className = 'card__when';
    parts.slice(1).forEach((line, i) => {
      if (i) when.appendChild(document.createElement('br'));
      when.appendChild(document.createTextNode(line));
    });
    body.appendChild(when);
  }

  const meta = document.createElement('span');
  meta.className = 'card__meta';
  meta.textContent = kind === 'zoom' ? (JOIN[item.lang] || JOIN_DEFAULT) : 'Open on Telegram';
  body.appendChild(meta);

  a.appendChild(img);
  a.appendChild(body);
  a.insertAdjacentHTML('beforeend', ARROW);
  li.appendChild(a);
  return li;
}

/* ---- Sprachfilter für die Webinare ---- */
(function () {
  const ALL = 'ALL';
  const list = document.getElementById('webinar-list');
  const bar = document.getElementById('lang-filter');
  const status = document.getElementById('lang-status');
  const anchor = document.getElementById('webinars-title');
  const descEl = document.getElementById('webinars-desc');
  const section = anchor.closest('.section');

  /* Englisch ist der Standard. Überschrift und Absatz kommen aus index.html —
     dort werden sie gepflegt, deshalb hier nur einmal beim Start ablesen. */
  const DEFAULT = {
    htmlLang: 'en',
    title: anchor.textContent,
    desc: descEl.textContent,
    inWord: 'in',
    sessions: (n) => (n === 1 ? '1 session' : n + ' sessions'),
  };

  /* nur Sprachen anbieten, zu denen es tatsächlich Webinare gibt */
  const langs = LANGUAGES.filter((l) => WEBINARS.some((w) => w.lang === l.code));
  let active = ALL;

  /* kleines Flaggen-Kästchen — rein dekorativ, die Bedeutung trägt der
     Text daneben. Fehlt zu einer Sprache die Flagge, bleibt der Platz leer. */
  function makeIcon(svg, cls) {
    const s = document.createElement('span');
    s.className = cls;
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = svg;
    return s;
  }

  function makeHeading(lang, count, t) {
    const h = document.createElement('h3');
    h.className = 'group__title';
    if (FLAGS[lang.code]) h.appendChild(makeIcon(FLAGS[lang.code], 'group__flag'));
    const s = document.createElement('span');
    s.textContent = lang.heading;
    const c = document.createElement('span');
    c.className = 'group__count';
    c.textContent = t.sessions(count);
    h.append(s, c);
    return h;
  }

  function makeGroup(heading, items) {
    const g = document.createElement('div');
    g.className = 'group';
    if (heading) g.appendChild(heading);
    const ul = document.createElement('ul');
    ul.className = 'cards';
    ul.setAttribute('role', 'list');
    items.forEach((w) => ul.appendChild(renderCard(w, 'zoom')));
    g.appendChild(ul);
    return g;
  }

  function render() {
    /* Sprachen ohne eigenen TEXTS-Eintrag bleiben englisch */
    const t = TEXTS[active] || DEFAULT;
    anchor.textContent = t.title;
    descEl.textContent = t.desc;
    section.lang = t.htmlLang;

    list.textContent = '';

    if (active === ALL) {
      let shown = 0;
      langs.forEach((l) => {
        const items = WEBINARS.filter((w) => w.lang === l.code);
        list.appendChild(makeGroup(makeHeading(l, items.length, t), items));
        shown += items.length;
      });
      status.textContent = t.sessions(shown) + ' in all languages';
      return;
    }

    const lang = langs.find((l) => l.code === active);
    const items = WEBINARS.filter((w) => w.lang === active);
    list.appendChild(makeGroup(null, items));
    status.textContent = t.sessions(items.length) + ' ' + t.inWord + ' ' + lang.heading;
  }

  function makeChip(code, label, description) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'langbar__chip';
    b.dataset.lang = code;
    b.setAttribute('aria-label', description);
    if (FLAGS[code]) b.appendChild(makeIcon(FLAGS[code], 'langbar__flag'));
    const t = document.createElement('span');
    t.textContent = label;
    b.appendChild(t);
    return b;
  }

  bar.appendChild(makeChip(ALL, 'ALL', 'Show sessions in all languages'));
  langs.forEach((l) => bar.appendChild(makeChip(l.code, l.code, 'Show ' + l.heading + ' sessions')));

  function syncChips() {
    bar.querySelectorAll('.langbar__chip').forEach((c) => {
      const on = c.dataset.lang === active;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', String(on));
    });
  }

  bar.addEventListener('click', (e) => {
    const chip = e.target.closest('.langbar__chip');
    if (!chip) return;
    const code = chip.dataset.lang;
    active = code === active ? ALL : code;
    syncChips();
    render();
    /* ohne Sprung sähe man am Handy das Ergebnis nicht — die Beschreibung steht dazwischen.
       behavior bewusst nicht gesetzt: so greift prefers-reduced-motion aus style.css */
    if (active !== ALL) anchor.scrollIntoView({ block: 'start' });
  });

  syncChips();
  render();
})();

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
