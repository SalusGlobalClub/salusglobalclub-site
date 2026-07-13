# Anleitung: Link-Seite aktualisieren (ohne Programmierkenntnisse)

Die Seite **https://bio.salusglobal.club** wird aus diesem GitHub-Repository erzeugt.
Jede gespeicherte Änderung hier ist nach ca. 1–2 Minuten automatisch live.

## Voraussetzung

Eigener GitHub-Account, der als **Collaborator** in diesem Repository eingeladen ist
(Einladung durch den Repo-Inhaber: Settings → Collaborators → Add people).

## Weg 1: Mit Claude (empfohlen)

1. Claude Code auf einem Rechner öffnen, auf dem dieses Repository liegt
   (einmalig: `git clone https://github.com/SalusGlobalClub/salusglobalclub-site.git`).
2. Sagen, was sich ändert — z. B. „Das Dienstags-Webinar hat einen neuen Zoom-Link: …"
   oder „Ersetze das Bild des Spanisch-Kanals durch diese Datei: …".
3. Claude ändert die Dateien, zeigt eine Vorschau zur Kontrolle und lädt nach deinem OK hoch.
   Beim allerersten Hochladen öffnet sich ein GitHub-Anmeldefenster — dort selbst einloggen.

## Weg 2: Direkt auf github.com (für schnelle Textänderungen)

### Link oder Titel ändern

1. Auf github.com dieses Repository öffnen → Datei **`app.js`** anklicken.
2. Oben rechts das **Stift-Symbol** (Edit) klicken.
3. Im oberen Bereich stehen zwei Listen:
   - `WEBINARS` = die Webinar-Karten (Titel, Zoom-Link, Bild)
   - `TELEGRAM` = die Telegram-Karten
   Die betreffende Zeile ändern — nur den Text zwischen den Anführungszeichen!
4. Oben rechts **„Commit changes"** → kurze Beschreibung eintragen → bestätigen.
5. 1–2 Minuten warten, dann https://bio.salusglobal.club prüfen (ggf. Seite neu laden).

### Bild austauschen

1. Ordner **`assets`** öffnen und den Dateinamen des alten Bildes merken (z. B. `webinar-ger.jpg`).
2. Neues Bild auf dem eigenen Rechner **exakt gleich benennen** (quadratisch, idealerweise 240×240 Pixel).
3. Im Ordner `assets`: **„Add file" → „Upload files"** → Datei hineinziehen → „Commit changes".
   Gleicher Dateiname = das alte Bild wird ersetzt, sonst ist keine Änderung nötig.

### Neue Karte hinzufügen (z. B. neuer Telegram-Kanal)

1. Bild wie oben in `assets` hochladen (neuer, sprechender Dateiname, z. B. `tg-hindi.jpg`).
2. In `app.js` in der passenden Liste eine Zeile nach dem Muster der vorhandenen ergänzen:
   `{ title: 'SGC - Hindi Official', url: 'https://…', thumb: 'assets/tg-hindi.jpg' },`

## Was man NICHT anfassen darf

- Datei **`CNAME`** — verbindet die Domain. Löschen = Seite verliert ihre Adresse.
- Die Struktur von `index.html`/`app.js` unterhalb der Listen (Render-Code).

## Bei Problemen

Änderung rückgängig machen: Repository → „Commits" (Uhr-Symbol) → betroffenen Commit öffnen →
„Revert" — oder Claude bitten: „Mach die letzte Änderung an der Bio-Seite rückgängig."
