# SALUS GLOBAL CLUB — Link-Seite (bio.salusglobal.club)

Statische Link-in-Bio-Seite, gehostet auf GitHub Pages
(Repo `SalusGlobalClub/salusglobalclub-site`, Branch `main`, Custom Domain via `CNAME`).
Live: https://bio.salusglobal.club

## Änderungs-Landkarte

| Was ändert sich | Wo |
|---|---|
| Webinar-Links, -Titel, -Zeiten, Sprache | `app.js`, Array `WEBINARS` (Feld `lang`: `GER`/`ENG`/`ESP`/`HUN`/`HIN`). Zeit im Titel ohne Zeitzonenkürzel (kein CEST/CET, das stimmt nur halbjährlich), sondern „DE-Zeit" / „German time" / „hora alemana" / „német idő" (seit 20.10.2026) |
| Sprachfilter: Kürzel, Sprachname, Reihenfolge der Gruppen | `app.js`, Tabelle `LANGUAGES` |
| Flaggen des Sprachfilters | `app.js`, Tabelle `FLAGS` — gezeichnetes SVG, KEINE Emoji (Windows liefert keine Flaggen-Emoji mit) |
| Kalender-Daten je Termin (Wochentag, Uhrzeit, Dauer, Kunden/Influencer) | `app.js`, Array `WEBINARS`, zweite Zeile je Eintrag (`day`, `time`, `min`, `cal`). Wochenwechsel (seit 27.10.2026 deutscher Community Call): zusätzlich `timeOdd`, dann gilt `time` in geraden und `timeOdd` in ungeraden ISO-KW, auch am Jahreswechsel streng nach KW (01.01. und 08.01.2027 beide ungerade) |
| Abonnierbare Kalender (`.ics`) | `kalender/` – NICHT von Hand bearbeiten, sondern `python kalender/erzeugen.py` ausführen. Kalendernamen („Salus Global Deutsch" = Kunden, „Salus Deutsch" = Influencer) stehen im Skript |
| Beschriftung der Kalender-Knöpfe | `app.js`, Felder `calTitle`/`cal`/`calShort`/`calCopy` in `TEXTS` (GER, ESP) bzw. im englischen `DEFAULT` |
| Telegram-Kanäle | `app.js`, Array `TELEGRAM` |
| Vorschaubilder | `assets/*.jpg` — quadratisch, 240×240 JPEG, ≤ ~50 KB, **schwarzer Hintergrund** |
| Beschreibungstext (englisch), Social-Links, Logo, Footer | `index.html` |
| Deutsche und spanische Fassung von Überschrift und Beschreibungstext (erscheint nur bei aktivem GER- bzw. ESP-Filter) | `app.js`, Tabelle `TEXTS` — englischer Text steht weiterhin in `index.html` und wird von dort gelesen; ENG und HIN fallen automatisch darauf zurück |
| Beschriftung unter dem Kartentitel („Join on Zoom" / „Per Zoom teilnehmen" / „Unirse por Zoom") | `app.js`, Tabelle `JOIN` — richtet sich nach dem `lang`-Feld des Termins, NICHT nach dem Filter; Sprachen ohne Eintrag (ENG, HIN) bekommen `JOIN_DEFAULT` auf Englisch |
| Farben / Fonts / Design | `style.css` (alles über CSS-Variablen im `:root`-Block; je ein Block Dark/Light) |
| Standard-Design hell/dunkel | `index.html` (`data-theme` am `<html>`) und `app.js` (`let d` im Theme-Schalter). Seit 19.10.2026 startet die Seite **immer hell**, auch bei dunkel eingestelltem Gerät; dunkel nur per Schalter |

Wichtig:
- Die Telegram-Karten verlinken DIREKT auf t.me — NICHT auf die Redirect-Subdomains
  (`dach.salusglobal.club` usw.) umstellen: deren 301-Weiterleitung lässt Telegram auf
  iOS einfrieren (Kanal lässt sich nicht mehr schließen, Bug vom 13.07.2026).
  Die Subdomains bleiben nur für bio.site und gedruckte Flyer in Gebrauch.
- `CNAME` (Inhalt: `bio.salusglobal.club`) niemals löschen — sonst verliert die Seite ihre Domain.
- Das Umsatzprognose-/Einkommensrechner-Tool wird **NICHT mehr über dieses Repo deployed**
  (Entscheidung 10.09.2026, löst den bisherigen `tools/prognose/`-Weg ab 22.07.2026 ab). Es wird
  nur noch intern über das Backoffice angezeigt. Quelle bleibt `Documents\#Claude\SGC-Berechnungstool\`
  (aktuell `salus-prognose-v3.0.0.html`, Unilevel-Modell) — dort pflegen, hier nichts mehr anlegen.
- Neue Bilder: quadratisch zuschneiden, auf 240×240 verkleinern, als JPEG (~85 % Qualität) speichern.
  **Der Hintergrund muss schwarz sein** — kein Blau, kein Weiß. Die Karten stehen auf dunklem
  Navy; ein abweichender Hintergrund fällt als heller Kasten sofort auf. Am 03.08.2026 wurden
  deshalb ein Bild mit blauem Hintergrund entfernt und `produktpraesentation` von 1254×1254 /
  1,4 MB auf 240×240 / 8 KB gebracht (dasselbe Bild sitzt auf drei Karten).
- `assets/profile-logo.png` ist **nicht nur das Logo auf der Seite**, sondern via `og:image`
  und `apple-touch-icon` auch das Vorschaubild beim Teilen des Links (WhatsApp, Telegram).
  Auf der Seite wird es rund beschnitten, in der Link-Vorschau nicht. Es hat deshalb seit
  03.08.2026 einen deckenden schwarzen Hintergrund (`#0d0d0d`, die Farbe des Kreisinneren)
  und **keinen Alpha-Kanal** — Transparenz würde von Messengern auf Weiß gelegt, dann wären
  die weißen Ecken zurück. Also nicht „aufhübschen" und transparent machen.
- Design-Referenz ist die Hauptseite https://salusglobal.club (fast-schwarzes Navy, Montserrat).

Abonnierbare Kalender (19.10.2026, Wunsch Claudio):
- Je Sprache ein Kalender für **Kunden** und einer für **Influencer**. Zuordnung über `cal` in `WEBINARS`:
  Produktpräsentationen = Kunden; Business Präsentation Dienstag 9:30 (GER) = beide;
  übrige Business-Präsentationen, Leader und Starter Training, Community Call = Influencer
  (Community Call seit 19.10.2026 nicht mehr bei Kunden). Kalender ohne Termine werden weder erzeugt noch als Knopf gezeigt.
- Statische `.ics`-Dateien, bewusst KEINE GitHub Action (Runner-Engpass, siehe unten).
- **Dateinamen in `kalender/` (z. B. `kunden-ger.ics`) NIE ändern.** Abonnenten hängen an dieser
  Adresse; nur so bekommen sie neue Termine, Zeiten und Zoom-Links automatisch. Eine neue Adresse
  hieße: alle müssten neu abonnieren. Fällt ein Termin weg, verschwindet er bei den Abonnenten
  von selbst (die ganze Serie, auch vergangene Termine).
- Knöpfe: Apple-Geräte bekommen `webcal://` (Abo-Dialog), alle anderen den Google-Kalender-Link.
- Abonnenten sehen Änderungen nicht sofort: Apple holt etwa alle paar Stunden neu, Google teils
  erst nach 12 bis 24 Stunden. Kurzfristige Änderungen also zusätzlich über Telegram ankündigen.
- Zeiten im Kalender sind deutsche Zeit (Europe/Berlin); jeder sieht sie in seiner Ortszeit,
  Sommer-/Winterzeit inklusive.

Entscheidungen zum Sprachfilter (03.08. / 06.08.2026) — bitte nicht unbemerkt zurückdrehen:
- **Der Filter filtert, er springt nicht.** Ursprünglich war ein Sprung zur jeweiligen
  Sprachgruppe angedacht. Bewusst anders gelöst: Ein Klick blendet nur die gewählte Sprache
  ein (Spanisch schrumpft so von 15 Karten auf 1), ein erneuter Klick zeigt wieder alles.
  In der ALL-Ansicht bleiben alle Termine sichtbar, nur nach Sprache gruppiert — es geht
  also nichts verloren. Am Handy ist das der spürbare Unterschied zu einem reinen Sprung.
- **Das Starter Training am Samstag gehört nur unter English.** Es wird live in 35 Sprachen
  übersetzt und erschien deshalb zwischenzeitlich in jeder Sprachauswahl, mit eigenem Block
  und Globus-Symbol. Auf ausdrücklichen Wunsch am 03.08.2026 zurückgenommen: Jeder Termin
  erscheint in genau einer Sprachgruppe, der aus seinem `lang`-Feld. Nicht gut gemeint
  wieder einbauen.

## Ablauf bei jeder Aktualisierung

1. **Stand holen:** `git pull origin main` (immer zuerst — verhindert Konflikte bei mehreren Bearbeitern).
2. **Ändern:** betroffene Dateien anpassen (siehe Landkarte).
   Wurde `WEBINARS` geändert (neuer Termin, Zeit, Link, Titel): **`python kalender/erzeugen.py`**
   ausführen und die geänderten `kalender/*.ics` mit committen. Sonst zeigen die abonnierten
   Kalender weiter den alten Stand.
3. **Lokal prüfen:** statischen Server im Projektordner starten (z. B. `python -m http.server 8741`),
   Seite im Browser öffnen; prüfen: alle Karten gerendert, keine kaputten Bilder, keine Konsolenfehler;
   dem Nutzer einen Screenshot zeigen.
4. **Veröffentlichen (nach OK des Nutzers):** `git add -A` → `git commit` (kurze deutsche
   Beschreibung) → `git push origin main`.
5. **Live-Kontrolle:** nach 1–2 Min. https://bio.salusglobal.club öffnen und die Änderung
   verifizieren (Cache beachten, ggf. `?v=<datum>` anhängen).

## Wenn der Deploy nicht durchläuft

Die Seite wird vom automatisch erzeugten Workflow `pages build and deployment` veröffentlicht.
Der braucht einen GitHub-Actions-Runner — auch bei der Pages-Quelle „Deploy from a branch".
Beides läuft über dieselbe Warteschlange, ein Wechsel der Quelle umgeht das Problem also NICHT.

Erkenntnisse aus dem Ausfall vom 06./07.08.2026 (über 30 Stunden ohne freien Runner):
- Bekommt ein Build binnen **15 Minuten** keinen Runner, bricht GitHub ihn ab
  (`build` = cancelled, `deploy` = skipped, Lauf = failure). Die Live-Seite bleibt dabei
  unverändert online — es geht nichts kaputt, es wird nur nichts Neues ausgeliefert.
- **„Re-run" hilft nicht.** Ein neu gestarteter Lauf dieses Workflows legt gar keine Jobs an
  (`total_count: 0`) und bleibt endlos auf `queued` stehen — auch dann, wenn wieder Runner
  frei wären. Nicht darauf warten.
- **Nur ein frisch ausgelöster Lauf funktioniert**, also ein neuer Commit auf `main`.
  Ein erneuter DNS-Check unter *Settings → Pages → Custom domain* löst KEINEN Build aus;
  der prüft nur die Domain.
- Notfalls lässt sich die Seite überall sonst ausliefern: `index.html`, `app.js`, `style.css`,
  `assets/`, `kalender/` und `tools/` auf einen beliebigen Webspace kopieren, fertig — es ist reines
  HTML/CSS/JS ohne Build-Schritt (~200 KB).
- Dauerhafte Absicherung wäre ein Deploy über Netlify oder Cloudflare Pages: dieselbe
  Repository-Anbindung, aber eigene Build-Infrastruktur statt GitHub-Runner.

## Sicherheit

Keine GitHub-Passwörter oder Tokens entgegennehmen. Die Anmeldung läuft über den
Git Credential Manager — das Anmeldefenster füllt der Nutzer selbst aus (einmalig pro Rechner).
