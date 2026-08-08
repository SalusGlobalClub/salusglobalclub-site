# SALUS GLOBAL CLUB — Link-Seite (bio.salusglobal.club)

Statische Link-in-Bio-Seite, gehostet auf GitHub Pages
(Repo `SalusGlobalClub/salusglobalclub-site`, Branch `main`, Custom Domain via `CNAME`).
Live: https://bio.salusglobal.club

## Änderungs-Landkarte

| Was ändert sich | Wo |
|---|---|
| Webinar-Links, -Titel, -Zeiten, Sprache | `app.js`, Array `WEBINARS` (Feld `lang`: `GER`/`ENG`/`ESP`/`HIN`) |
| Sprachfilter: Kürzel, Sprachname, Reihenfolge der Gruppen | `app.js`, Tabelle `LANGUAGES` |
| Flaggen des Sprachfilters | `app.js`, Tabelle `FLAGS` — gezeichnetes SVG, KEINE Emoji (Windows liefert keine Flaggen-Emoji mit) |
| Telegram-Kanäle | `app.js`, Array `TELEGRAM` |
| Vorschaubilder | `assets/*.jpg` — quadratisch, 240×240 JPEG, ≤ ~50 KB |
| Beschreibungstext (englisch), Social-Links, Logo, Footer | `index.html` |
| Deutsche Fassung von Überschrift, Beschreibungstext und „Per Zoom teilnehmen" (erscheint nur bei aktivem GER-Filter) | `app.js`, Tabelle `TEXTS` — englischer Text steht weiterhin in `index.html` und wird von dort gelesen |
| Farben / Fonts / Design | `style.css` (alles über CSS-Variablen im `:root`-Block; je ein Block Dark/Light) |
| Umsatzprognose-Tool (unverlinkt) | `tools/prognose/salus-prognose-v<VERSION>.html` — Quelle: `Documents\#Claude\SGC-Berechnungstool\Umsatzprognose-Vertriebstool.html`; Update = Datei neu herüberkopieren (inkl. `noindex`-Meta), Dateiname trägt IMMER die aktuelle Version; alte Versions-Datei per `git rm` entfernen, sonst bleibt der alte Link erreichbar |

Wichtig:
- Die Telegram-Karten verlinken DIREKT auf t.me — NICHT auf die Redirect-Subdomains
  (`dach.salusglobal.club` usw.) umstellen: deren 301-Weiterleitung lässt Telegram auf
  iOS einfrieren (Kanal lässt sich nicht mehr schließen, Bug vom 13.07.2026).
  Die Subdomains bleiben nur für bio.site und gedruckte Flyer in Gebrauch.
- `CNAME` (Inhalt: `bio.salusglobal.club`) niemals löschen — sonst verliert die Seite ihre Domain.
- `tools/prognose/` ist ein **bewusst unverlinktes** internes Tool („Unlisted", Entscheidung 22.07.2026):
  NICHT auf der Bio-Seite verlinken, NICHT als verwaist aufräumen. Der Link wird nur intern
  (Telegram) geteilt; `noindex` ist gesetzt. Dateiname seit 22.07.2026 versioniert
  (`salus-prognose-v<VERSION>.html` statt `index.html`) — erschwert zufälliges Aufrufen über
  den nackten Ordnerpfad (kein Directory-Listing + kein Default-Index mehr) und veraltet den
  geteilten Link automatisch bei jedem Versions-Bump. Bei jedem Update: alte Versions-Datei per
  `git rm` löschen, neue mit aktueller Version anlegen, neuen Link intern teilen.
- Neue Bilder: quadratisch zuschneiden, auf 240×240 verkleinern, als JPEG (~85 % Qualität) speichern.
- Design-Referenz ist die Hauptseite https://salusglobal.club (fast-schwarzes Navy, Montserrat).

## Ablauf bei jeder Aktualisierung

1. **Stand holen:** `git pull origin main` (immer zuerst — verhindert Konflikte bei mehreren Bearbeitern).
2. **Ändern:** betroffene Dateien anpassen (siehe Landkarte).
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
  `assets/` und `tools/` auf einen beliebigen Webspace kopieren, fertig — es ist reines
  HTML/CSS/JS ohne Build-Schritt (~200 KB).
- Dauerhafte Absicherung wäre ein Deploy über Netlify oder Cloudflare Pages: dieselbe
  Repository-Anbindung, aber eigene Build-Infrastruktur statt GitHub-Runner.

## Sicherheit

Keine GitHub-Passwörter oder Tokens entgegennehmen. Die Anmeldung läuft über den
Git Credential Manager — das Anmeldefenster füllt der Nutzer selbst aus (einmalig pro Rechner).
