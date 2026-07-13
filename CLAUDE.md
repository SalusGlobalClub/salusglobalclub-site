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

Wichtig:
- Die Telegram-Karten verlinken auf Redirect-Subdomains (`dach.salusglobal.club` usw.,
  GoDaddy-Forwarding) — NICHT direkt auf t.me umstellen, die Subdomains sind zentral gepflegt.
- `CNAME` (Inhalt: `bio.salusglobal.club`) niemals löschen — sonst verliert die Seite ihre Domain.
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
