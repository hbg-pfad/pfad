# Übergabe Pfad (Stand 12.11.2026)

## Wo was liegt

| Was | Wo |
|---|---|
| Quelldatei der App | `quelle/pfad.html` |
| Hauptversion (live) | `index.html`, `sw.js`, `manifest.webmanifest`, Symbole im Hauptordner |
| Beta (live) | `beta/` (wird gebaut, nicht von Hand ändern) |
| Offline-Datei (Quelle) | `quelle/sw.js` (Beta und Hauptversion werden daraus gebaut) |
| Bauwege | `werkzeuge/beta-bauen.py`, `werkzeuge/hauptversion-freigeben.py`, `werkzeuge/paket-bauen.py` (ZIP für eigenen Webspace) |
| Bildanleitung zur Einrichtung | `einrichten.html` (nur nach Rückfrage ändern) |
| Schulserver (vorbereitet, geparkt) | `server/pfad-server.mjs`, `server/README.md` |
| Rauchtest (Playwright, fiktiver Beispielfall) | `tests/rauchtest.js`, Aufruf `node tests/rauchtest.js` nach dem Beta-Bau |
| Bildschirmtest (Fotos iPhone/iPad, Prüfung Tippziele, Überlauf, Feldschrift) | `tests/bildschirmtest.js`, Aufruf `node tests/bildschirmtest.js` nach dem Beta-Bau, Ergebnis in `tests/bilder/` (nicht im Repo) |
| Funktionsbeschreibung | `docs/funktionen.md` |
| Änderungsprotokoll | `AENDERUNGEN.md` |

## Stand

- Beta 1.3.6 (12.11.2026): Bildschirmtest neu. Behoben: Auswahl „früher …“ beim Bewerten zoomte auf iOS hinein, „Im Verlauf markieren“ war zu klein zum Tippen. Bekannte Hinweise ohne Änderung: Punkte im Verlaufs-Diagramm (12–21 px, Tippen nur Zusatz), Schalter in den Einstellungen 30 px hoch (wie iOS-Schalter), Skala 0–10 bewusst schmal. Auf dem iPhone SE wird der Platzhalter im Kommentarfeld beim Bewerten abgeschnitten (offen, Nick fragen).
- Beta 1.3.5 (08.11.2026): Stundenplan beim Kind, aus dem Schulmanager kopieren und einfügen. Pfad liest die Tabelle lokal, speichert nur Fachkürzel und wählt beim Bewerten das Fach vor. Offen: auf dem iPad prüfen, ob Safari die Tabellenfassung mitkopiert (sonst Text mit markierten Zeilen).
- Hauptversion 1.3.4 = Beta 1.3.4 (08.11.2026, von Nick ohne eigenen Beta-Test freigegeben): enthält alles aus Beta 1.2.6 bis 1.3.3. Bitte nach dem Update auf iPad und Handy prüfen (vor allem Kennung/Klassen, Bewerten, „Neu in Pfad“). Mails/Anleitungen müssen nachgezogen werden (Kennung, „Sicherungskopie ablegen“).
- Beta 1.3.3 (08.11.2026): Technik aus SoMi übernommen (Löschen behält App-Sperre, Offline-Datei räumt nur eigene Speicher, Minuszeichen im PDF) und Rauchtest im Repo.
- Beta 1.3.0 und 1.3.1 (08.11.2026, Feedback der Schulleitung): „Heute“ beginnt mit der Kinderliste, offene Kinder zuerst, ein Tipp auf die Karte startet das Bewerten. „Sicherungskopie ablegen“ statt „Sicherung speichern“ („Speicherort festlegen“ bewusst nicht, weil iOS sich keinen Ort merkt). Kinder haben eine einheitliche **Kennung** = Klasse + Platz in der Klassenliste im Schulmanager (z. B. 8A-07), „Kürzel“ meint nur noch die Lehrkraft. Wartet mit 1.2.6 bis 1.2.9 auf Nicks Test. Die Schulleitung will vorerst keinen DSB-Kontakt, Hosting soll über den all-inkl-Webspace laufen (eigener Thread).
- Beta 1.2.9 (08.11.2026): Fenster „Neu in Pfad“ nach jedem Update, Texte in der Liste `NEU` in `quelle/pfad.html`. **Bei jeder neuen Version mit sichtbarer Änderung dort einen Eintrag ergänzen.** Beta 1.2.6 bis 1.2.8 (Bewerten auf einem Bildschirm, Stundenauswahl, Streifen oben weg) warten mit 1.2.9 auf Nicks Test.
- Beta 1.2.0 (01.11.2026): Offline zuerst, Knopf „Neu laden“ bei neuer Fassung. Davor Beta 1.1.6 (29.10.2026): Schulserver-Bereich ausgeblendet (1.1.4), Austausch im Team mit Team-Passwort (1.1.5), Sicherungs-Zeile auf „Heute“ und App-Sperre als empfohlener Einrichtungsschritt (1.1.6), Sicherungs-Zeile auch mit Beispielfall (1.1.7), Abstand oben gegen die iOS-Unschärfe (1.1.8, in 1.1.9 etwas verkleinert, auf dem iPhone prüfen). Seit 01.11.2026 in der Hauptversion.
- Adresse seit 26.10.2026: https://hbg-pfad.github.io/pfad/ (GitHub-Organisation `hbg-pfad`). Alte Adresse unter n-bru.github.io hatte nur Testdaten, keine Brücke nötig.
- Einsatz mit echten Fällen erst nach Freigabe durch Schulleitung und DSB. Bis dahin nur der fiktive Beispielfall.
- Studientag des Sonderpädagogik-Teams am 16.11.2026: Pfad wird dort vorgestellt und auf Dienstgeräten eingerichtet.

## Offene Punkte

1. **Sicherheitsprüfung (Bericht aktualisiert 26.10.2026 auf Stand bb27134), offene Befunde 4, 5, 7, 8 und 9 sowie Server-Punkte S1 bis S6.** Details nur im privaten Prüfbericht (Claude Doc „Pfad – Sicherheitsprüfung“, https://claude.ai/artifact/YY9e6RyosL8Ca9FpRMiQCW). Nicht im öffentlichen Repo ausführen. Befund 4: App-Sperre vorerst nicht Pflicht, sondern in der Einrichtung empfohlen (Nick, 29.10.2026). Pflicht erwägen, falls Dienstgeräte an Schüler:innen gehen oder die Datenschutzstelle es verlangt. Befund 5 betrifft die GitHub-Konten inkl. Organisation hbg-pfad (Zwei-Faktor-Anmeldung), Befund 7 betrifft Webfonts in `einrichten.html`.
2. **Druck auf dem iPad prüfen.** Bericht und Gesprächsblatt als PDF über das Teilen-Fenster auf einem echten iPad testen.
3. **Freigabe der lokalen Variante.** Auch ohne Server braucht der Einsatz mit echten Fällen die Zustimmung der Schulleitung und einen Eintrag ins Verarbeitungsverzeichnis. Anfrage an die Datenschutzstelle der Stadt Köln für Schulen ist vorbereitet (Entwurf im Projekt, Schulleitung in CC). Sie fragt zuerst nach der lokalen Variante, den Server nur als Ausblick.
4. **Austausch im Team per Datei (Beta 1.1.5, 29.10.2026).** Team-Passwort, Bereiche „Sichern“ und „Austausch im Team“, Hinweis AirDrop/Dienstmail. Offen: auf echtem iPad testen (AirDrop-Empfang, Einlesen aus „Downloads“), Team-Passwort beim Studientag 16.11. vereinbaren (persönlich, nicht per Mail), Hauptversion erst nach Nicks Freigabe. Klären: Ist AirDrop auf den Dienstgeräten erlaubt (Geräteverwaltung)? Anleitung für das Team: Claude Doc „Pfad – Austausch im Team“.
5. **Schulserver Phase 2: geparkt (Stand 29.10.2026).** Laut Schul-IT kommen eigene Geräte heute kaum noch ins Schulnetz. Ein Weg wäre höchstens ein Betrieb über NetCologne (Dienstleister für den Schulserver), auf dem Schulserver oder als VM. Die technische Anfrage dort stellt der IT-Kollege der Schule; Datenschutz läuft getrennt über Punkt 3. Bis dahin nicht weiter am Server bauen; Server-Punkte S1 bis S6 aus der Prüfung sind nachrangig. Falls es weitergeht: Der Server muss die App selbst ausliefern (CSP `connect-src 'self'`), Updates ohne eigenen Serverzugriff klären, Zertifikat per Geräteverwaltung. Wiederherstellung per Dienstmail entfällt bis dahin (kein Mailversand).
6. **ThinkCentre (privates Altgerät).** Nur als Testgerät mit dem fiktiven Beispielfall sinnvoll, nicht für den Echtbetrieb. Falls aufgesetzt: SSD statt alter Festplatte.
7. **iPadOS 27: Weg zum Home-Bildschirm bestätigen.** Echte Safari-Infos fehlen noch, dann ggf. Hinweis in der App und `einrichten.html` anpassen (nach Rückfrage).
8. **Testskript ins Repo: erledigt (1.3.3).** `tests/rauchtest.js` prüft Einrichtung, Kind anlegen, Bewerten, Sicherung, App-Sperre und Löschen. Neue Funktionen dort ergänzen.
9. **Auslieferung ohne GitHub (Prüfung 01.11.2026).** Schülerdaten berühren GitHub nicht, GitHub sieht beim Laden nur Daten der Lehrkraft (IP). Empfehlung: Pfad auf eigener Subdomain beim Schulträger oder auf der Schul-Website ausliefern (statisch, Paket aus `werkzeuge/paket-bauen.py`). Eigene Subdomain, weil andere Skripte auf derselben Adresse den Speicher lesen könnten. Adresse vor dem ersten echten Fall festlegen, weil die Daten an der Adresse hängen. Anfragen an Website-Kollegen, Medienberatung und Datenschutzstelle liegen als Claude Docs vor. Dienst-iPads: laut Nick keine iCloud-Sicherung der Daten. Rein lokale HTML-Datei ist auf iOS nicht tragfähig.
10. **Stundenplan-Import (Beta 1.3.5) auf dem iPad testen.** Im Schulmanager eine normale Woche markieren, kopieren, beim Kind einsetzen. Prüfen: Kommen leere Tage richtig an (Tabellenfassung) oder erscheinen markierte Zeilen (nur Text)? Die 6. Stunde fehlt im HBG-Raster, dort wählt Pfad nichts vor. Kürzel wie PA, SZ, GE, S1 ordnet Nick selbst zu. Datenschutz-Beschreibung um „Stundenplan (nur Fachkürzel)“ ergänzen (Projekt „Digitale Förderplanung“).

## Was außerhalb dieses Repos liegt

- Mails an Kolleg:innen, Info für den Co-Vorsitz, Datenschutz-Beschreibung für Schulleitung/DSB und die Einrichtungsanleitung als Doc pflegt das Projekt „Digitale Förderplanung“. Hier nur in `AENDERUNGEN.md` markieren, wenn sie nachgezogen werden müssen.
- Nicks Ablage der App-Dateien auf dem Mac ist nur eine Kopie. Quelle ist dieses Repo.
