/* SALUS GLOBAL CLUB — Wealth Club
   Static rendering of webinar + Telegram cards.
   Deployed via GitHub Pages to bio.salusglobal.club */

/* Zweite Zeile je Termin = Daten für die abonnierbaren Kalender (Ordner kalender/):
   day  = Wochentag MO TU WE TH FR SA SU
   time = Beginn in deutscher Zeit (Europe/Berlin), wie im Titel („DE-Zeit" / „German time")
   min  = Dauer in Minuten
   cal  = in welche Kalender der Termin kommt: 'kunden' und/oder 'influencer'
   Nach JEDER Änderung hier: python kalender/erzeugen.py — sonst zeigen die Kalender den alten Stand. */
const WEBINARS = [
  { title: 'Auvesta Produktpräsentation und Q&A | MONTAGS 19:00 DE-Zeit | 60 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.jpg',
    day: 'MO', time: '19:00', min: 60, cal: ['kunden'] },
  { title: 'Auvesta Product Presentation, Q&A and onboarding support | MONDAYS 20:00 German time | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation-eng.jpg',
    day: 'MO', time: '20:00', min: 60, cal: ['kunden'] },
  { title: 'Business Präsentation | DIENSTAGS 9:30 DE-Zeit | 50 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-ger.jpg',
    day: 'TU', time: '09:30', min: 50, cal: ['kunden', 'influencer'] },
  { title: 'Leader Training | DIENSTAGS 10:30 DE-Zeit | 2h', lang: 'GER', url: 'https://zoom.us/j/95770825858', thumb: 'assets/leader-ger.jpg',
    day: 'TU', time: '10:30', min: 120, cal: ['influencer'] },
  { title: 'tegasFX Produktpräsentation und Q&A | DIENSTAGS 19:00 DE-Zeit | 60 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.jpg',
    day: 'TU', time: '19:00', min: 60, cal: ['kunden'] },
  { title: 'tegasFX Product Presentation, Q&A and onboarding support | TUESDAYS 20:00 German time | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation-eng.jpg',
    day: 'TU', time: '20:00', min: 60, cal: ['kunden'] },
  { title: 'Leader Training | WEDNESDAYS 10:30 German time | 2h', lang: 'ENG', url: 'https://zoom.us/j/95770825858', thumb: 'assets/leader-eng.jpg',
    day: 'WE', time: '10:30', min: 120, cal: ['influencer'] },
  { title: 'Aionas21 Produktpräsentation und Q&A | MITTWOCHS 19:00 DE-Zeit | 60 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation.jpg',
    day: 'WE', time: '19:00', min: 60, cal: ['kunden'] },
  { title: 'Aionas21 Product Presentation, Q&A and onboarding support | WEDNESDAYS 20:00 German time | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/94836921010', thumb: 'assets/produktpraesentation-eng.jpg',
    day: 'WE', time: '20:00', min: 60, cal: ['kunden'] },
  { title: 'Salus Global Club Prezentáció | SZERDÁNKÉNT 20:00 német idő | 60 perc', lang: 'HUN', url: 'https://zoom.us/j/4363761606', thumb: 'assets/presentation-hun.jpg',
    day: 'WE', time: '20:00', min: 60, cal: ['influencer'] },
  { title: 'Business Präsentation und Q&A | DONNERSTAGS 19:00 DE-Zeit | 90 Min', lang: 'GER', url: 'https://zoom.us/j/94836921010', thumb: 'assets/business-qna-ger.jpg',
    day: 'TH', time: '19:00', min: 90, cal: ['influencer'] },
  { title: 'Business Presentation | THURSDAYS 20:00 German time | 60 Min', lang: 'ENG', url: 'https://zoom.us/j/4363761606', thumb: 'assets/presentation-eng.jpg',
    day: 'TH', time: '20:00', min: 60, cal: ['influencer'] },
  { title: 'Presentación de negocio | JUEVES 21:00 hora alemana | 60 Min', lang: 'ESP', url: 'https://zoom.us/j/94836921010', thumb: 'assets/presentation-esp.jpg',
    day: 'TH', time: '21:00', min: 60, cal: ['influencer'] },
  { title: 'Community Call | FREITAGS 16:00 DE-Zeit | 90 Min', lang: 'GER', url: 'https://us06web.zoom.us/j/85377006655?pwd=OZdDRC0xbWdBJqxbYhLa1JWHIL6N7r.1', thumb: 'assets/update-call-ger.jpg',
    day: 'FR', time: '16:00', min: 90, cal: ['influencer'] },
  { title: 'Community Call | FRIDAYS 17:30 German time | 90 Min', lang: 'ENG', url: 'https://us06web.zoom.us/j/86751323217?pwd=twdahDFW5ol51WpHHQ0l80CNb9WstO.1', thumb: 'assets/update-call-eng.jpg',
    day: 'FR', time: '17:30', min: 90, cal: ['influencer'] },
  { title: 'Starter Training | SAMSTAGS 10:00 DE-Zeit | 55 Min', lang: 'GER', url: 'https://zoom.us/j/95346205331', thumb: 'assets/starter-ger.jpg',
    day: 'SA', time: '10:00', min: 55, cal: ['influencer'] },
  { title: 'Starter Training | SATURDAYS 12:00 German time | 55 Min', lang: 'ENG', url: 'https://zoom.us/j/97676390953', thumb: 'assets/starter-eng.jpg',
    day: 'SA', time: '12:00', min: 55, cal: ['influencer'] },
];

/* Sprachen für Filter-Knöpfe und Gruppen-Überschriften.
   Die Reihenfolge hier bestimmt die Reihenfolge der Knöpfe UND der Gruppen.
   Ein Knopf erscheint nur, wenn es zu der Sprache auch Webinare gibt.
   Die zugehörige Flagge steht unten in FLAGS. */
const LANGUAGES = [
  { code: 'GER', heading: 'Deutsch' },
  { code: 'ENG', heading: 'English' },
  { code: 'ESP', heading: 'Español' },
  { code: 'HUN', heading: 'Magyar' },
  { code: 'HIN', heading: 'हिन्दी · Hindi' },
];

/* Übersetzung des Webinar-Bereichs. Nur Sprachen, die hier stehen, schalten um —
   alles andere (ALL, ENG, HIN) bleibt automatisch englisch.
   ACHTUNG: Der englische Text steht NICHT hier, sondern in index.html; er wird von
   dort gelesen. Wer den englischen Absatz dort ändert, sollte die Übersetzungen hier
   mitziehen, sonst sagen die Fassungen etwas Unterschiedliches.
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
    calTitle: 'Termine in deinen Kalender',
    cal: { kunden: 'Kalender für Kunden', influencer: 'Kalender für Influencer' },
    calShort: { kunden: 'Kunden', influencer: 'Influencer' },
    calCopy: 'Link kopieren (Outlook & andere)',
    calCopied: 'Link kopiert',
  },
  ESP: {
    htmlLang: 'es',
    title: 'Webinars y Canales',
    desc: 'Te damos la bienvenida. El conocimiento es la clave de tu éxito. Participa en '
        + 'nuestros webinars semanales y entrenamientos en vivo para hacer crecer tu negocio, '
        + 'desarrollar tu equipo e invitar a nuevos prospectos con seguridad. Asiste con '
        + 'constancia y verás cómo crece el impulso. No te pierdas ninguna actualización, '
        + 'novedad o anuncio del Salus Global Club. Sigue nuestros canales de Telegram y '
        + 'mantente al tanto, estés donde estés. Rápido, directo y siempre actualizado.',
    inWord: 'en',                                         /* „1 sesión en Español" */
    sessions: (n) => (n === 1 ? '1 sesión' : n + ' sesiones'),
    calTitle: 'Las sesiones en tu calendario',
    cal: { kunden: 'Calendario para clientes', influencer: 'Calendario para influencers' },
    calShort: { kunden: 'Clientes', influencer: 'Influencers' },
    calCopy: 'Copiar enlace (Outlook y otros)',
    calCopied: 'Enlace copiado',
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

/* Abonnierbare Kalender: je Sprache einer pro Zielgruppe (Feld `cal` in WEBINARS).
   Die Dateien in kalender/ erzeugt `python kalender/erzeugen.py`, dort stehen auch
   die Kalendernamen („Salus Global Deutsch" / „Salus Deutsch" …). Ein Knopf erscheint
   nur, wenn es für Sprache und Zielgruppe Termine gibt, genau wie die Datei. */
const CAL_BASE = 'bio.salusglobal.club/kalender/';
const CAL_AUDIENCES = ['kunden', 'influencer'];
const CAL_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';

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
  HUN: '<svg viewBox="0 0 21 15"><rect width="21" height="15" fill="#477050"/><rect width="21" height="10" fill="#fff"/><rect width="21" height="5" fill="#ce2939"/></svg>',
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
    calTitle: 'Add the sessions to your calendar',
    cal: { kunden: 'Calendar for customers', influencer: 'Calendar for influencers' },
    /* ALL-Ansicht: Flagge + zwei Knöpfe je Zeile, lange Texte passen am Handy nicht */
    calShort: { kunden: 'Customers', influencer: 'Influencers' },
    calCopy: 'Copy link (Outlook & others)',
    calCopied: 'Link copied',
  };

  /* Apple-Geräte öffnen webcal:// direkt im Kalender mit Abo-Dialog,
     alle anderen landen bei Google Kalender („Kalender hinzufügen"). */
  const APPLE = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  const calBox = document.getElementById('calendar-subscribe');

  function calLinks(code, t, labels) {
    return CAL_AUDIENCES
      .filter((aud) => WEBINARS.some((w) => w.lang === code && w.cal && w.cal.includes(aud)))
      .map((aud) => {
        const file = CAL_BASE + aud + '-' + code.toLowerCase() + '.ics';
        const a = document.createElement('a');
        a.className = 'calbtn';
        a.href = APPLE ? 'webcal://' + file
          : 'https://calendar.google.com/calendar/render?cid=' + encodeURIComponent('webcal://' + file);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.dataset.https = 'https://' + file;
        a.insertAdjacentHTML('afterbegin', CAL_ICON);
        const s = document.createElement('span');
        s.textContent = labels[aud];
        a.appendChild(s);
        return a;
      });
  }

  function renderCalendars(t) {
    calBox.textContent = '';
    const codes = active === ALL ? langs.map((l) => l.code) : [active];
    const rows = codes.map((code) => {
      const links = calLinks(code, t, active === ALL ? t.calShort : t.cal);
      if (!links.length) return null;
      const row = document.createElement('div');
      row.className = 'calrow';
      /* in der ALL-Ansicht zeigt die Flagge, welche Sprache die Knöpfe meinen */
      if (active === ALL && FLAGS[code]) row.appendChild(makeIcon(FLAGS[code], 'group__flag calrow__flag'));
      row.append(...links);
      return row;
    }).filter(Boolean);
    if (!rows.length) return;

    const h = document.createElement('p');
    h.className = 'calbox__title';
    h.textContent = t.calTitle;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'calbox__copy';
    copy.textContent = t.calCopy;
    /* für Outlook & Co.: kopiert die https-Adressen aller gerade sichtbaren Kalender
       (dort unter „Kalender hinzufügen > Aus dem Internet" einfügen) */
    copy.addEventListener('click', () => {
      const urls = [...calBox.querySelectorAll('.calbtn')].map((a) => a.dataset.https);
      const done = () => { copy.textContent = t.calCopied; };
      if (navigator.clipboard) navigator.clipboard.writeText(urls.join('\n')).then(done, () => prompt('', urls.join(' ')));
      else prompt('', urls.join(' '));
    });
    calBox.append(h, ...rows, copy);
  }

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
    renderCalendars(t);

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
  /* Hell ist Standard, auch wenn das Gerät auf dunkel steht (wie auf der ursprünglichen Seite).
     Dunkel nur über den Schalter oben rechts. */
  let d = 'light';
  r.setAttribute('data-theme', d);
  const sun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  function apply() { t.innerHTML = d === 'dark' ? moon : sun; t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode'); }
  apply();
  t && t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; r.setAttribute('data-theme', d); apply(); });
})();
