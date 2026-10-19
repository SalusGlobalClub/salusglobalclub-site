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
    'HUN': 'Magyar',
    'HIN': 'Hindi',
}
# gleiche Texte wie JOIN / JOIN_DEFAULT in app.js
JOIN = {'GER': 'Per Zoom teilnehmen', 'ESP': 'Unirse por Zoom'}
JOIN_DEFAULT = 'Join on Zoom'

DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
# Fester Startpunkt der Serien (ein Montag). Bewusst NICHT „heute": so bleibt die
# Datei bei unveränderten Terminen identisch und erzeugt keine Schein-Änderungen.
ANCHOR = datetime.date(2026, 10, 19)
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


def event(w):
    first = ANCHOR + datetime.timedelta(days=DAYS.index(w['day']))
    hh, mm = (int(x) for x in w['time'].split(':'))
    summary = w['title'].split('|')[0].strip()
    join = JOIN.get(w['lang'], JOIN_DEFAULT)
    uid_src = '|'.join([w['lang'], w['day'], w['time'], summary])
    uid = hashlib.sha1(uid_src.encode('utf-8')).hexdigest()[:16]
    return [
        'BEGIN:VEVENT',
        f'UID:{uid}@bio.salusglobal.club',
        f'DTSTAMP:{STAMP}',
        f'DTSTART;TZID=Europe/Berlin:{first:%Y%m%d}T{hh:02d}{mm:02d}00',
        f'DURATION:PT{w["min"]}M',
        f'RRULE:FREQ=WEEKLY;BYDAY={w["day"]}',
        f'SUMMARY:{esc(summary)}',
        f'LOCATION:{esc(w["url"])}',
        f'URL:{w["url"]}',
        f'DESCRIPTION:{esc(join + ": " + w["url"] + chr(10) + chr(10) + "https://bio.salusglobal.club")}',
        'END:VEVENT',
    ]


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
