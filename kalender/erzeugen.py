"""Erzeugt die abonnierbaren Kalender (kalender/*.ics) aus WEBINARS in app.js.

Aufruf im Projektordner:  python kalender/erzeugen.py

Pro Sprache und Zielgruppe entsteht eine Datei, z. B. kunden-ger.ics oder
influencer-eng.ics. Kalender ohne Termine werden nicht erzeugt (und auf der
Seite auch nicht angeboten). Nach jeder Änderung an WEBINARS neu ausführen
und die geänderten .ics mit committen.
"""

import datetime
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'kalender'

# Kalendername so, wie er beim Abonnenten erscheint (Vorgabe Claudio, 19.10.2026):
# Kunden = „Salus Global <Sprache>", Influencer = „Salus <Sprache>".
AUDIENCES = {
    'kunden': 'Salus Global',
    'influencer': 'Salus',
}
LANG_NAMES = {
    'GER': 'Deutsch',
    'ENG': 'English',
    'ESP': 'Español',
    'POR': 'Português',
    'HUN': 'Magyar',
    'HIN': 'Hindi',
}
# gleiche Texte wie JOIN / JOIN_DEFAULT in app.js
JOIN = {'GER': 'Per Zoom teilnehmen', 'ESP': 'Unirse por Zoom', 'POR': 'Entrar no Zoom'}
JOIN_DEFAULT = 'Join on Zoom'

DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
# Fester Startpunkt der Serien (ein Montag). Bewusst NICHT „heute": so bleibt die
# Datei bei unveränderten Terminen identisch und erzeugt keine Schein-Änderungen.
ANCHOR = datetime.date(2026, 10, 19)
# Letzter Tag, bis zu dem die Serien in den Kalendern stehen. Die Termine für 2027
# werden über die Feiertage neu abgestimmt (Entscheidung 28.10.2026). Sobald sie
# feststehen: Datum hier weiterschieben, Termine anpassen, Skript neu ausführen.
END = datetime.date(2026, 12, 31)
# UNTIL muss bei Serien mit TZID in UTC stehen: 31.12. 23:59:59 deutscher Zeit (Winterzeit, UTC+1).
# Gilt auch für Lissabon-Termine: die letzten liegen dort vor 22:59 Ortszeit.
UNTIL = (datetime.datetime.combine(END, datetime.time(23, 59, 59))
         - datetime.timedelta(hours=1)).strftime('%Y%m%dT%H%M%SZ')
STAMP = '20261019T000000Z'

FIELD = {
    'title': r"title:\s*'((?:[^'\\]|\\.)*)'",
    'lang': r"lang:\s*'([A-Z]+)'",
    'url': r"url:\s*'([^']*)'",
    'day': r"day:\s*'([A-Z]{2})'",
    'time': r"time:\s*'(\d{1,2}:\d{2})'",
    'min': r"min:\s*(\d+)",
    'cal': r"cal:\s*\[([^\]]*)\]",
}

# Zeitzonen, die in WEBINARS vorkommen dürfen (Feld tz, Standard Europe/Berlin).
# Beide stellen gleichzeitig um (EU-Regel), nur der Abstand zu UTC unterscheidet sich.
def vtimezone(tzid, std, dst, std_name, dst_name, spring_local, autumn_local):
    return [
        'BEGIN:VTIMEZONE', f'TZID:{tzid}',
        'BEGIN:DAYLIGHT', f'TZOFFSETFROM:{std}', f'TZOFFSETTO:{dst}', f'TZNAME:{dst_name}',
        f'DTSTART:19700329T{spring_local}', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
        'BEGIN:STANDARD', f'TZOFFSETFROM:{dst}', f'TZOFFSETTO:{std}', f'TZNAME:{std_name}',
        f'DTSTART:19701025T{autumn_local}', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD',
        'END:VTIMEZONE',
    ]


TIMEZONES = {
    'Europe/Lisbon': vtimezone('Europe/Lisbon', '+0000', '+0100', 'WET', 'WEST', '010000', '020000'),
}

VTIMEZONE = [
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Berlin',
    'BEGIN:DAYLIGHT',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'DTSTART:19700329T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'DTSTART:19701025T030000',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'END:VTIMEZONE',
]


def fail(msg):
    sys.exit('FEHLER: ' + msg)


def read_webinars():
    src = (ROOT / 'app.js').read_text(encoding='utf-8')
    m = re.search(r'const WEBINARS = \[(.*?)\n\];', src, re.S)
    if not m:
        fail('Array WEBINARS in app.js nicht gefunden.')
    block = m.group(1)
    entries = re.findall(r'\{\s*title:.*?\}', block, re.S)
    if len(entries) != block.count('title:'):
        fail('Nicht alle Einträge in WEBINARS konnten gelesen werden.')
    webinars = []
    for e in entries:
        w = {}
        for key, rx in FIELD.items():
            f = re.search(rx, e)
            if not f:
                fail(f'Feld „{key}" fehlt bei: {e.strip()[:80]}')
            w[key] = f.group(1)
        w['title'] = w['title'].replace("\\'", "'")
        odd = re.search(r"timeOdd:\s*'(\d{1,2}:\d{2})'", e)
        w['timeOdd'] = odd.group(1) if odd else None
        tz = re.search(r"tz:\s*'([^']+)'", e)
        w['tz'] = tz.group(1) if tz else 'Europe/Berlin'
        if w['tz'] != 'Europe/Berlin' and w['tz'] not in TIMEZONES:
            fail(f'Zeitzone „{w["tz"]}" fehlt in TIMEZONES (erzeugen.py).')
        for key in ('sub', 'desc'):
            f = re.search(key + r":\s*'((?:[^'\\]|\\.)*)'", e)
            w[key] = f.group(1).replace("\\'", "'") if f else None
        w['min'] = int(w['min'])
        w['cal'] = re.findall(r"'([a-z]+)'", w['cal'])
        if w['day'] not in DAYS:
            fail(f'Unbekannter Tag „{w["day"]}" bei: {w["title"]}')
        for c in w['cal']:
            if c not in AUDIENCES:
                fail(f'Unbekannter Kalender „{c}" bei: {w["title"]}')
        if w['lang'] not in LANG_NAMES:
            fail(f'Sprache „{w["lang"]}" fehlt in LANG_NAMES (erzeugen.py).')
        webinars.append(w)
    return webinars


def esc(text):
    return (text.replace('\\', '\\\\').replace(';', '\\;')
            .replace(',', '\\,').replace('\n', '\\n'))


def fold(line):
    """Zeilen nach RFC 5545 bei 75 Byte umbrechen, ohne UTF-8-Zeichen zu teilen."""
    out, cur = [], ''
    for ch in line:
        limit = 75 if not out else 74
        if len((cur + ch).encode('utf-8')) > limit:
            out.append(cur)
            cur = ch
        else:
            cur += ch
    out.append(cur)
    return '\r\n '.join(out)


def alternating_runs(first, parity):
    """Alle Termine einer KW-Parität (0 = gerade, 1 = ungerade) als Läufe mit genau
    14 Tagen Abstand. Ein Lauf reißt nur in Jahren mit 53 KW (z. B. 2026), wo zwei
    ungerade Wochen aufeinander folgen. Liefert (Startdatum, Anzahl) bis END."""
    dates = []
    d = first
    while d <= END:
        if d.isocalendar()[1] % 2 == parity:
            dates.append(d)
        d += datetime.timedelta(days=7)
    runs = []
    for d in dates:
        if runs and (d - runs[-1][-1]).days == 14:
            runs[-1].append(d)
        else:
            runs.append([d])
    return [(r[0], len(r)) for r in runs]


def event(w):
    """VEVENTs eines Termins: eine Wochen-Serie, bei timeOdd je KW-Parität mehrere."""
    first = ANCHOR + datetime.timedelta(days=DAYS.index(w['day']))
    summary = w['title'].split('|')[0].strip()
    base = '|'.join([w['lang'], w['day'], w['time'], summary])
    if not w['timeOdd']:
        return vevent(w, summary, base, first, w['time'], f'FREQ=WEEKLY;BYDAY={w["day"]};UNTIL={UNTIL}')
    lines = []
    for parity, time in ((0, w['time']), (1, w['timeOdd'])):
        for i, (start, count) in enumerate(alternating_runs(first, parity)):
            rule = f'FREQ=WEEKLY;INTERVAL=2;BYDAY={w["day"]};COUNT={count}'
            lines += vevent(w, summary, f'{base}|kw{parity}|{i}', start, time, rule)
    return lines


def vevent(w, summary, uid_src, start, time, rule):
    hh, mm = (int(x) for x in time.split(':'))
    join = JOIN.get(w['lang'], JOIN_DEFAULT)
    uid = hashlib.sha1(uid_src.encode('utf-8')).hexdigest()[:16]
    return [
        'BEGIN:VEVENT',
        f'UID:{uid}@bio.salusglobal.club',
        f'DTSTAMP:{STAMP}',
        f'DTSTART;TZID={w["tz"]}:{start:%Y%m%d}T{hh:02d}{mm:02d}00',
        f'DURATION:PT{w["min"]}M',
        f'RRULE:{rule}',
        f'SUMMARY:{esc(summary)}',
        f'LOCATION:{esc(w["url"])}',
        f'URL:{w["url"]}',
        f'DESCRIPTION:{esc(description(w, join))}',
        'END:VEVENT',
    ]


def description(w, join):
    """Untertitel, Beschreibung und Zusatzzeilen des Titels (z. B. Referent), dann Zoom-Link."""
    extra = [p.strip() for p in w['title'].split('|')[3:] if p.strip()]
    head = [x for x in (w['sub'], w['desc'], *extra) if x]
    return '\n\n'.join(head + [f'{join}: {w["url"]}', 'https://bio.salusglobal.club'])


def calendar(name, items):
    lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Salus Global Club//bio.salusglobal.club//DE',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        f'X-WR-CALNAME:{esc(name)}',
        'X-WR-TIMEZONE:Europe/Berlin',
        'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
        'X-PUBLISHED-TTL:PT12H',
        *VTIMEZONE,
        *[l for tz in sorted({w['tz'] for w in items}) if tz in TIMEZONES for l in TIMEZONES[tz]],
    ]
    for w in items:
        lines += event(w)
    lines.append('END:VCALENDAR')
    return '\r\n'.join(fold(l) for l in lines) + '\r\n'


def main():
    webinars = read_webinars()
    written = set()
    for lang, lang_name in LANG_NAMES.items():
        for aud, prefix in AUDIENCES.items():
            items = [w for w in webinars if w['lang'] == lang and aud in w['cal']]
            if not items:
                continue
            path = OUT / f'{aud}-{lang.lower()}.ics'
            path.write_bytes(calendar(f'{prefix} {lang_name}', items).encode('utf-8'))
            written.add(path.name)
            print(f'{path.name:24} {prefix} {lang_name}: {len(items)} Termin{"" if len(items) == 1 else "e"}')
    for old in OUT.glob('*.ics'):
        if old.name not in written:
            old.unlink()
            print(f'{old.name:24} gelöscht (keine Termine mehr)')


if __name__ == '__main__':
    main()
