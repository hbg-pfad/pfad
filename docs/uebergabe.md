# Übergabe Pfad (Stand 26.10.2026)

## Wo was liegt

| Was | Wo |
|---|---|
| Quelldatei der App | `quelle/pfad.html` |
| Hauptversion (live) | `index.html`, `sw.js`, `manifest.webmanifest`, Symbole im Hauptordner |
| Beta (live) | `beta/` (wird gebaut, nicht von Hand ändern) |
| Bauwege | `werkzeuge/beta-bauen.py`, `werkzeuge/hauptversion-freigeben.py` |
| Bildanleitung zur Einrichtung | `einrichten.html` (nur nach Rückfrage ändern) |
| Schulserver (vorbereitet, nicht in Betrieb) | `server/pfad-server.mjs`, `server/README.md` |
| Funktionsbeschreibung | `docs/funktionen.md` |
| Änderungsprotokoll | `AENDERUNGEN.md` |

## Stand

- Version 1.1.3 (26.10.2026) ist Hauptversion und Beta. Enthält Sicherheitspaket A (CSP, Prüfhelfer `ja()`, `okKid`, `okSetting`).
- Adresse seit 26.10.2026: https://hbg-pfad.github.io/pfad/ (GitHub-Organisation `hbg-pfad`). Alte Adresse unter n-bru.github.io hatte nur Testdaten, keine Brücke nötig.
- Einsatz mit echten Fällen erst nach Freigabe durch Schulleitung und DSB. Bis dahin nur der fiktive Beispielfall.
- Studientag des Sonderpädagogik-Teams am 16.11.2026: Pfad wird dort vorgestellt und auf Dienstgeräten eingerichtet.

## Offene Punkte

1. **Sicherheitsprüfung (Bericht aktualisiert 26.10.2026 auf Stand bb27134), offene Befunde 4, 5, 7, 8 und 9 sowie Server-Punkte S1 bis S6.** Details nur im privaten Prüfbericht (Claude Doc „Pfad – Sicherheitsprüfung“, https://claude.ai/artifact/YY9e6RyosL8Ca9FpRMiQCW). Nicht im öffentlichen Repo ausführen. Befund 4: soll die App-Sperre Pflicht werden? Befund 5 betrifft die GitHub-Konten inkl. Organisation hbg-pfad (Zwei-Faktor-Anmeldung), Befund 7 betrifft Webfonts in `einrichten.html`.
2. **Druck auf dem iPad prüfen.** Bericht und Gesprächsblatt als PDF über das Teilen-Fenster auf einem echten iPad testen.
3. **Schulserver Phase 2.** Gemeinsame Datenbank im Schulnetz, Freigabe pro Fall per Einladung über Kürzel. Vorher Server-Punkte aus der Prüfung erledigen und mit Schul-IT und DSB klären. Wiederherstellung der App-Sperre über die Dienstmail erst mit Server.
4. **ThinkCentre als möglicher Schulserver.** Klärung mit dem IT-Kollegen läuft über das Projekt „Digitale Förderplanung“.
5. **iPadOS 27: Weg zum Home-Bildschirm bestätigen.** Echte Safari-Infos fehlen noch, dann ggf. Hinweis in der App und `einrichten.html` anpassen (nach Rückfrage).
6. **Testskript ins Repo.** Bisher liefen Playwright-Prüfungen nur in der Arbeitsumgebung. Ein dauerhaftes Testskript mit Beispielfall unter `tests/` wäre sinnvoll.

## Was außerhalb dieses Repos liegt

- Mails an Kolleg:innen, Info für den Co-Vorsitz, Datenschutz-Beschreibung für Schulleitung/DSB und die Einrichtungsanleitung als Doc pflegt das Projekt „Digitale Förderplanung“. Hier nur in `AENDERUNGEN.md` markieren, wenn sie nachgezogen werden müssen.
- Nicks Ablage der App-Dateien auf dem Mac ist nur eine Kopie. Quelle ist dieses Repo.
