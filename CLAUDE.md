# Pfad – Regeln für die Arbeit mit Claude

Pfad ist die schulinterne Web-App des Sonderpädagogik-Teams zur alltagsnahen Verhaltensbeobachtung im Gemeinsamen Lernen.
Hauptversion: https://hbg-pfad.github.io/pfad/ · Beta: https://hbg-pfad.github.io/pfad/beta/

Lies zu Beginn jeder Sitzung zusätzlich `docs/uebergabe.md` (Stand und offene Punkte) und bei Fragen zu Funktionen `docs/funktionen.md`.
Weicht der Code von diesen Dateien ab, gilt der Code. Weise auf die Abweichung hin.

## Mit wem du arbeitest

- Die Projektleitung (Nick) ist Lehrkraft und Sonderpädagoge, kein Entwickler.
- Antworte auf Deutsch, knapp und direkt, ohne Fachjargon. Erkläre Schritte, die er selbst machen muss, einzeln und warte auf Bestätigung.
- Sprich Schwächen in Wünschen oder Entwürfen offen an und begründe kurz.
- Das Team (ca. 25 Kolleg:innen) hat in der Regel KEIN Claude-Konto. Alles, was Kolleg:innen bekommen (Anleitungen, Links, Seiten), darf kein Claude-Login voraussetzen.
- Texte für Kolleg:innen: gendern mit Doppelpunkt, klare kurze Sätze, locker statt förmlich.

## Veröffentlichen: Beta zuerst

1. Jede Änderung an der App passiert in `quelle/pfad.html`. Das ist die einzige Quelldatei.
2. Beta bauen: `python3 werkzeuge/beta-bauen.py pfad-beta-<version>` und nur `beta/` plus `quelle/` committen.
3. Die Projektleitung prüft die Beta selbst auf iPad und Handy (github.io ist aus der Cloud-Umgebung meist nicht erreichbar).
4. Die Hauptversion (`index.html`, `sw.js` im Repo-Hauptordner) wird NUR auf ausdrückliches Kommando der Projektleitung aktualisiert:
   `python3 werkzeuge/hauptversion-freigeben.py pfad-<version>`.
- Bei jeder Version `PFAD_VERSION` und `PFAD_STAND` in `quelle/pfad.html` anpassen.
- Speicher-Schlüssel nie umbenennen: Hauptversion `verlaufsbogen-v2`, Beta `pfad-beta`. Sonst sind alte Daten unsichtbar.
- Caches getrennt lassen: Haupt-`sw.js` löscht keine `pfad-beta*`-Caches, Beta-`sw.js` nur eigene.
- `einrichten.html` (Bildanleitung) nur nach Rückfrage bei der Projektleitung ändern.
- Vor dem Push `main` holen. Arbeit über Pull Requests, nicht direkt auf `main`.
- Jede Änderung in `AENDERUNGEN.md` eintragen, mit der Spalte „Mails/Anleitungen betroffen?“.

## Sicherheit im Code

- Kennungen (k.id, g.id, e.id usw.) in `onclick` und anderen Inline-Handlern IMMER über `${ja(...)}` einsetzen, nie roh.
- Fremddaten (Datei-Import, Sicherungen, Server-Sync) vor der Übernahme mit `okKid`, `okSetting` und den übrigen `ok…`-Helfern prüfen. Text immer über `esc()` ausgeben.
- Die Content-Security-Policy (Meta-Tag in `quelle/pfad.html`) erhalten und nicht aufweichen. `connect-src 'self'`: Ein Schulserver geht nur, wenn er die App selbst ausliefert.
- Keine externen Abrufe in der App: keine Webfonts, keine CDNs, kein Tracking.
- Details zu offenen Sicherheitsbefunden NICHT ins Repo schreiben. Das Repo ist öffentlich. Befunde stehen im privaten Prüfbericht (Link in `docs/uebergabe.md`).

## Datenschutz (feste Regeln)

- Daten bleiben nur lokal auf dem Dienstgerät. Später ggf. ein interner Schulserver, erst nach Klärung mit Schul-IT, Schulleitung und DSB.
- OneDrive wird NICHT genutzt, weder als Speicher noch als Sicherungsort. OneDrive auch nicht in App-Texten, Anleitungen oder Mails erwähnen.
- Keine Namen, keine Initialen. Nur Kürzel `Klasse-Nummer` (z. B. `8A-01`) plus neutrales Symbol.
- Keine echten Schülerdaten in Code, Repo, Tests oder Chat. Nur der fiktive Beispielfall. Tauchen echte Daten auf: sofort darauf hinweisen.
- Keine eigene Spracheingabe in der App, nur Verweis auf die Diktierfunktion der Tastatur.
- Das Repo enthält nur Code, keine Daten.

## Mails und Anleitungen

- Mails und Infotexte immer als Claude Doc liefern (mit Formatierung kopierbar nach Apple Mail), nicht als Markdown oder nur im Chat.
- Mails an Kolleg:innen: kurz und locker, „Hallo …“, Fließtext plus wenige Stichpunkte, „Liebe Grüße, Nick“, etwa 150 Wörter.
- Ändert sich Adresse, Einrichtung, Sicherung, Datenschutz, Server oder Freigabestand, in `AENDERUNGEN.md` „Mails/Anleitungen betroffen: ja“ eintragen und die Projektleitung am Ende der Sitzung darauf hinweisen. Die Mails selbst pflegt das Projekt „Digitale Förderplanung“.

## Gestaltung

- Design B „warm und freundlich“ (Terrakotta/Creme), Signalfarbe Senfgelb (`--sig`), keine sichtbaren Parallelen zu kommerziellen Produkten.
- Systemschrift, Tippziele mind. 40 px, Schrift in Feldern mind. 16 px, eigene Dialoge statt `confirm`/`prompt`.
- PDFs erzeugt die App selbst (Drucken geht in iOS-Home-Bildschirm-Apps nicht). Farbpunkte statt Emoji in PDFs.
- Gamification sparsam und abschaltbar: keine Punkte, keine Abzeichen, keine Ranglisten.

## Wissen weitergeben

- Account-Skill `schul-app-pfad` enthält das gemeinsame Wissen aller Schul-Apps. Am Ende einer Sitzung prüfen, ob er mitwachsen muss, und ein Update nur nach Zustimmung vorschlagen.
- Am Ende einer Sitzung `docs/uebergabe.md` aktualisieren.
