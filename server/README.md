# Pfad-Schulserver (Referenz)

Kleiner Server für den späteren gemeinsamen Betrieb im Schulnetz. Im Prototyp **nicht in Betrieb**. Er dient zum Testen und als Vorlage für IT bzw. Schulträger.

## Was er tut
- Speichert nur Fälle, die eine Lehrkraft in der App ausdrücklich **freigegeben** hat.
- Gibt jeden Fall nur an die eingetragenen Lehrkräfte heraus. Neue Lehrkräfte kommen per **Einladung über das Kürzel** dazu und müssen annehmen.
- Führt Änderungen zusammen wie die App: Einträge mit eigener Kennung, die neuere Fassung gewinnt, Löschungen gelten für alle.
- Die App speichert immer zuerst auf dem Gerät und gleicht ab, sobald der Server erreichbar ist (Schul-WLAN).

## Starten
Voraussetzung: Node.js 18 oder neuer, keine weiteren Pakete.

```
node pfad-server.mjs nutzer NB "Frau B." 'start-passwort'   # Lehrkraft anlegen (Passwort mind. 8 Zeichen)
node pfad-server.mjs liste                                   # Lehrkräfte und Anzahl Fälle
node pfad-server.mjs nutzer-entfernen NB                     # Lehrkraft entfernen (auch aus allen Fällen)
node pfad-server.mjs                                         # Server starten
```

Umgebungsvariablen:

| Variable | Standard | Bedeutung |
|---|---|---|
| `PORT` | 8080 | Port |
| `DATEN` | `pfad-daten.json` | Datendatei |
| `APP` | `app` | Ordner mit der App (Inhalt von `web/`) |
| `TLS_CERT`, `TLS_KEY` | – | Zertifikat und Schlüssel für https |

## Wichtig: https und Adresse der App
Die App auf GitHub Pages läuft über https. Ein Browser erlaubt ihr keine Verbindung zu einem Server mit `http://`. Deshalb:
- **Empfohlen:** Der Schulserver liefert die App selbst aus. Dazu den Inhalt von `web/` in den Ordner `app` legen und die App über die Serveradresse öffnen (z. B. `https://pfad.schule.local/`). Dann gibt es keine Daten bei GitHub und keinen Mischbetrieb.
- Mit Zertifikat (`TLS_CERT`, `TLS_KEY`). Ein schulinternes Zertifikat muss auf den Dienstgeräten als vertrauenswürdig installiert sein (MDM).

## Schnittstelle
Alle Aufrufe außer `ping` und `login` mit `Authorization: Bearer <token>`.

| Aufruf | Inhalt | Antwort |
|---|---|---|
| `GET /api/ping` | – | `{ok:true}` |
| `POST /api/login` | `{kuerzel, passwort}` | `{token, kuerzel, name}` (30 Tage gültig) |
| `POST /api/sync` | `{since, push:[Fälle]}` | `{rev, kids, removed, invites, people}` |
| `POST /api/faelle/:id/einladen` | `{kuerzel}` | Einladung anlegen |
| `POST /api/faelle/:id/entfernen` | `{kuerzel}` | Lehrkraft aus dem Fall nehmen |
| `POST /api/einladungen/:id/annehmen` | – | Fall wird geteilt |
| `POST /api/einladungen/:id/ablehnen` | – | Einladung verworfen |

Fälle neu anlegen darf jede angemeldete Lehrkraft (sie ist dann allein eingetragen). Ändern darf nur, wer eingetragen ist.

## Datenschutz und Betrieb
- Passwörter nur als scrypt-Hash. Die Daten liegen unverschlüsselt in `pfad-daten.json`: Festplattenverschlüsselung und Zugriffsschutz des Servers sind Aufgabe des Betriebs.
- Nur im Schulnetz erreichbar machen, nicht aus dem Internet.
- Datensicherung der Datendatei, Löschfristen (z. B. nach Ende der Förderung), Protokollierung und Rollen klären.
- Vor dem Betrieb: Freigabe durch Schulleitung und DSB, Eintrag ins Verarbeitungsverzeichnis.
- Diese Referenz ist ein Prototyp. Für den echten Betrieb gehört sie geprüft oder durch eine Lösung des Schulträgers ersetzt.

## Geplant: Wiederherstellung vergessener Codes und Passwörter
Nick-Entscheidung 24.10.2026: Bis der Schulserver läuft, gilt „vergessen = Daten auf dem Gerät löschen und letzte Sicherung laden“. Mit dem Server soll eine Wiederherstellung über die verifizierte Dienstmail kommen (App-Sperre und Sicherungs-Passwort). Idee: Die App hinterlegt einen mit einem Server-Schlüssel verpackten Ersatzschlüssel; nach Bestätigung über einen Link an die Dienstmail gibt der Server ihn frei. Braucht Mailversand im Schulnetz, Schlüsselverwaltung und Freigabe durch IT und DSB.
