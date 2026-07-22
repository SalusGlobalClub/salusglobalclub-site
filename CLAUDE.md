# SALUS GLOBAL CLUB — Link-Seite (bio.salusglobal.club)

Statische Link-in-Bio-Seite, gehostet auf GitHub Pages
(Repo `SalusGlobalClub/salusglobalclub-site`, Branch `main`, Custom Domain via `CNAME`).
Live: https://bio.salusglobal.club

## Änderungs-Landkarte

| Was ändert sich | Wo |
|---|---|
| Webinar-Links, -Titel, -Zeiten | `app.js`, Array `WEBINARS` |
| Telegram-Kanäle | `app.js`, Array `TELEGRAM` |
| Vorschaubilder | `assets/*.jpg` — quadratisch, 240×240 JPEG, ≤ ~50 KB |
| Beschreibungstext, Social-Links, Logo, Footer | `index.html` |
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

## Sicherheit

Keine GitHub-Passwörter oder Tokens entgegennehmen. Die Anmeldung läuft über den
Git Credential Manager — das Anmeldefenster füllt der Nutzer selbst aus (einmalig pro Rechner).
