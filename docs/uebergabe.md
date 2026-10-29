# Übergabe Pfad (Stand 29.10.2026)

## Wo was liegt

| Was | Wo |
|---|---|
| Quelldatei der App | `quelle/pfad.html` |
| Hauptversion (live) | `index.html`, `sw.js`, `manifest.webmanifest`, Symbole im Hauptordner |
| Beta (live) | `beta/` (wird gebaut, nicht von Hand ändern) |
| Bauwege | `werkzeuge/beta-bauen.py`, `werkzeuge/hauptversion-freigeben.py` |
| Bildanleitung zur Einrichtung | `einrichten.html` (nur nach Rückfrage ändern) |
| Schulserver (vorbereitet, geparkt) | `server/pfad-server.mjs`, `server/README.md` |
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
3. **Freigabe der lokalen Variante.** Auch ohne Server braucht der Einsatz mit echten Fällen die Zustimmung der Schulleitung und einen Eintrag ins Verarbeitungsverzeichnis. Anfrage an die Datenschutzstelle der Stadt Köln für Schulen ist vorbereitet (Entwurf im Projekt, Schulleitung in CC). Sie fragt zuerst nach der lokalen Variante, den Server nur als Ausblick.
4. **Austausch im Team per Sicherungsdatei verbessern (vor dem Server).** Das ist auf absehbare Zeit der einzige Weg zum Teilen. Weitergeben und Einlesen einfach halten, ans Sichern erinnern, für den Studientag gut erklären. Vergessener Code oder vergessenes Passwort: Gerät leeren und letzte Sicherung laden. App-Texte und Anleitung müssen dazu passen.
5. **Schulserver Phase 2: geparkt (Stand 29.10.2026).** Laut Schul-IT kommen eigene Geräte heute kaum noch ins Schulnetz. Ein Weg wäre höchstens ein Betrieb über NetCologne (Dienstleister für den Schulserver), auf dem Schulserver oder als VM. Die technische Anfrage dort stellt der IT-Kollege der Schule; Datenschutz läuft getrennt über Punkt 3. Bis dahin nicht weiter am Server bauen; Server-Punkte S1 bis S6 aus der Prüfung sind nachrangig. Falls es weitergeht: Der Server muss die App selbst ausliefern (CSP `connect-src 'self'`), Updates ohne eigenen Serverzugriff klären, Zertifikat per Geräteverwaltung. Wiederherstellung per Dienstmail entfällt bis dahin (kein Mailversand).
6. **ThinkCentre (privates Altgerät).** Nur als Testgerät mit dem fiktiven Beispielfall sinnvoll, nicht für den Echtbetrieb. Falls aufgesetzt: SSD statt alter Festplatte.
7. **iPadOS 27: Weg zum Home-Bildschirm bestätigen.** Echte Safari-Infos fehlen noch, dann ggf. Hinweis in der App und `einrichten.html` anpassen (nach Rückfrage).
8. **Testskript ins Repo.** Bisher liefen Playwright-Prüfungen nur in der Arbeitsumgebung. Ein dauerhaftes Testskript mit Beispielfall unter `tests/` wäre sinnvoll.

## Was außerhalb dieses Repos liegt

- Mails an Kolleg:innen, Info für den Co-Vorsitz, Datenschutz-Beschreibung für Schulleitung/DSB und die Einrichtungsanleitung als Doc pflegt das Projekt „Digitale Förderplanung“. Hier nur in `AENDERUNGEN.md` markieren, wenn sie nachgezogen werden müssen.
- Nicks Ablage der App-Dateien auf dem Mac ist nur eine Kopie. Quelle ist dieses Repo.
