# Pfad – schulinterne App zur Verhaltensbeobachtung (Version 1.3.3 in der Beta, Hauptversion 1.2.5, Stand 08.11.2026)

(Arbeitstitel bis 23.10.2026: Verlaufsbogen)

Quelldatei: `quelle/pfad.html`. Eine einzelne Datei, die offline im Browser läuft, auf dem Handy, Tablet oder PC.

Gestaltung bewusst eigenständig (Entwurf B „warm und freundlich“, 23.10.2026): eigene Farben, Begriffe, Zahlenleiste statt Regler, Farbstreifen statt Kürzel-Kacheln, keine Filter-Chips.

## Bereiche
- **Heute:** Wen bewerte ich jetzt? Die Kinderliste steht ganz oben, heute noch offene Kinder zuerst. Ein Tipp auf die Kinderkarte startet das Bewerten (ab 1.3.0). Darunter Hinweise (Sicherung, Schuljahr, Löschen fällig), Zähler für heute und die letzten 7 Tage bzw. Wochenziel.
- **Klassen:** Kinder mit Kennung, nach Klassen gefiltert, mit Trend-Hinweis (eher besser / stabil / eher schwieriger / noch sammeln).
- **Kind:** Zielverhalten mit Mini-Verlauf, „Jetzt bewerten“.
- **Zielverhalten bearbeiten:** Titel, „Woran erkennst du es?“, Tipp zum beobachtbaren Formulieren, Richtung (weniger/mehr davon), Skala (10-stufig 0–10, 5-stufig 1–5, ja/nein oder eigene Skala mit frei wählbarem Bereich, z. B. 1 bis 4 oder 0 bis 6), Beschriftung der Enden bzw. Knöpfe, Bezug zum Förderplan, Zielwert, Datum des Förderbeginns (alles außer dem Titel optional).
- **Bewerten:** alle Verhalten eines Kindes nacheinander. Tag (Heute, Gestern, früher bis 7 Tage) und Stunde als Knöpfe mit einem Tipp, das Fach als Auswahlliste (ab 1.2.8, vorher 24 Knöpfe). Die Ansicht springt beim Antippen nicht nach oben und passt auf einen Bildschirm. Auf kleinen iPhones (z. B. SE) startet die Zeile Tag/Stunde/Fach zugeklappt („ändern“). Die laufende Stunde ist nach Uhrzeit vorausgewählt, in Pausen die Stunde davor. Für Beobachtungen in der Pause: „Kleine Pause“, „Große Pause“, „Mittagspause“ (alte Einträge „Pause“ zählen als Große Pause). Ab dem zweiten Verhalten nur noch eine Zeile „Heute · 3. Std. · Mathe – ändern“. Zahlenleiste je nach Skala, Kommentar mit Schalter „Im Verlauf markieren“ (wichtige Kommentare erscheinen dann wie Tagebucheinträge als Markierung im Graphen, Art „Notiz“; nachträglich unter „Alle Einschätzungen“ änderbar), „Heute nicht gesehen“.
- **Tagebuch (pro Kind):** freie Notizen ohne Skala mit Art (Beobachtung, Gespräch, Elternkontakt, Absprache, Vorfall, Erfolg), Datum und Fach. Schnell erreichbar über „Notiz“ auf der Seite Heute. In der Analyse erscheinen die Einträge als nummerierte, farbige Markierungen im Verlaufsgraphen, darunter mit Text.
- **Stundenplan (ab 1.3.5):** beim Kind „Stundenplan → Einfügen“. Tabelle im Schulmanager markieren, kopieren, ins Feld einsetzen. Pfad liest die Tabellenfassung der Zwischenablage (leere Tage bleiben erhalten). Fehlt sie, liest Pfad den Text und markiert Zeilen, in denen ein freier Tag nicht zuzuordnen ist. Gespeichert wird nur das Fachkürzel je Wochentag und Stunde (`k.plan`), die Zuordnung Kürzel → Fach gilt für alle Kinder (`db.planMap`, „kein Fach“ möglich). Beim Bewerten wählt Pfad das Fach nach Tag und Stunde vor, solange man nicht selbst eins wählt. Stunden, die im Stundenraster fehlen (z. B. 6.), werden angezeigt, aber nicht vorausgewählt.
- **Analyse:** Verlauf mit Zielwert und Förderbeginn, Zusammenfassung in Worten, Vergleich nach Fach und Stunde, letzte Kommentare, Text für die Evaluation im Förderplan (kopieren, drucken, CSV).
- **Einstellungen:** ganz oben „Sichern“ (Sicherungskopie ablegen, Sicherung laden, prüfen; Knopf hieß bis 1.2.9 „Sicherung speichern“) und „Austausch im Team“ (Kinder weitergeben, geteilte Datei einlesen, Team-Passwort), dann Kürzel, Fächer (Reihenfolge = Knöpfe), Klassen, Stundenraster (abweichende Zeiten für jeden Wochentag einzeln möglich), Wochenziel, Beispielfall, Datenschutz. Der Bereich Schulserver ist ausgeblendet, solange der Server geparkt ist (ab 1.1.4).

## Gesprächsblatt für Kind und Eltern
- Aufruf: beim Kind „Gesprächsblatt“ oder im Verlauf unten.
- Pro Verhalten: Symbol und ein Satz („Es wird besser!“, „Es bleibt ungefähr gleich.“, „Daran üben wir weiter.“), „Am Anfang / Jetzt / Ziel“, ein Balken pro Woche mit Ziellinie.
- „Das hat gut geklappt“: nur Tagebucheinträge der Art „Erfolg“, einzeln ausblendbar. Andere Tagebucheinträge und Einzelwerte erscheinen nicht.
- „Das nehmen wir uns vor“ mit Unterschriftszeilen (Kind, Eltern, Lehrkraft). Zeitraum wählbar (4 Wochen, 8 Wochen, alles). Druck auf **einer Seite A4 quer**: Verhalten nebeneinander (bis 3), darunter Erfolge und Vorhaben. Weißer Hintergrund beim Druck. Bei mehr als 3 Verhalten kann es auf zwei Seiten gehen.
- Datenschutz: Auf dem Blatt steht kein Name. Er wird nach dem Ausdruck von Hand eingetragen.

## Nachträglich bearbeiten
- Tagebucheinträge: „bearbeiten“ beim Kind oder in der Analyse unter dem Graphen. Art, Text, Datum und Fach lassen sich ändern.
- Einschätzungen: Analyse → „Alle Einschätzungen“ → „bearbeiten“. Datum, Wert (auch „nicht beobachtbar“), Stunde, Fach und Kommentar lassen sich ändern.
- Geänderte Einträge sind mit „bearbeitet“ gekennzeichnet.

## Begriffe in der App
Heute · Kinder · Verlauf · Einstellungen. „Verhalten“ (statt Zielverhalten), Richtung „weniger davon / mehr davon“, „Heute nicht gesehen“ (statt nicht beobachtbar).

## Wochenziel (in den Einstellungen ganz abschaltbar)
- Genau ein Ziel pro Woche, zur Wahl: „Jedes Kind regelmäßig im Blick“ (jedes Kind mind. 2× pro Woche, einstellbar), „Feste Gewohnheit“ (an mind. 3 Schultagen), „Auf das Gelingen schauen“ (pro Kind ein Erfolg im Tagebuch).
- Anzeige als Ring auf „Heute“, dazu „x Wochen in Folge“. Wochen ganz ohne Einträge (Ferien, Krankheit) unterbrechen die Reihe nicht.
- Feedback: kurzer Haken nach dem Speichern. Konfetti nur, wenn das Wochenziel in dieser Woche zum ersten Mal erreicht ist. Optional ein leiser Ton.
- Keine Punkte, keine Abzeichen, keine Tages-Serie. Ausgeschaltet erscheint nur eine kurze Bestätigung. Der fiktive Beispielfall zählt nicht mit.

## Skalen
- Eigene Skala: kleinster Wert 0 oder 1, größter Wert bis 10 (mindestens 3 Stufen).
- Gespeichert wird intern immer 0–10, damit Graph und Trend gleich funktionieren. 5-stufig: 1 = 0, 2 = 2,5 … 5 = 10. Ja/nein: 0 oder 10.
- Anzeige passend zur Skala: 5-stufig als 1–5, ja/nein als „% der Stunden“. Das Ziel bei ja/nein wird in Prozent angegeben (z. B. mind. 80 %).
- Sobald es Einschätzungen gibt, ist die Skala eines Verhaltens fest. Für eine andere Skala ein neues Verhalten anlegen.

## So rechnet die App (bewusst einfach)
- Trend: Mittelwert der letzten 5 Einschätzungen gegen die 5 davor. Ist ein Förderbeginn eingetragen, werden die letzten 5 Werte vor dem Förderbeginn mit den letzten 5 seitdem verglichen. Ab 1 Punkt Unterschied heißt es „eher besser“ oder „eher schwieriger“, sonst „stabil“. Unter 6 Einschätzungen: „Noch sammeln“.
- Ziel erreicht: Zielwert in mindestens 4 der letzten 5 Einschätzungen.
- Trend-Schwelle 1 Punkt auf der 0–10-Skala, also eine halbe Stufe bei 5-stufig und 10 Prozentpunkte bei ja/nein.
- „Nicht beobachtbar“ zählt nicht in die Mittelwerte.

## Bewusst weggelassen
- Punkte pro Einschätzung und Ranglisten.
- Statistische Kennwerte (Tau-U, NAP), Baseline-Phasen.
- Ein Schulserver ist vorbereitet, aber im Prototyp nicht in Betrieb (siehe unten).

## Spracheingabe im Tagebuch
- Nicht eingebaut. Die Spracherkennung des Browsers schickt Audio an Google- bzw. Apple-Server, das ist für Förderdaten nicht vertretbar.
- Empfehlung: Diktierfunktion der iPhone-Tastatur. Auf neueren iPhones läuft Deutsch auf dem Gerät (Einstellungen → Allgemein → Tastatur → Diktierfunktion). Vorher mit der:dem Datenschutzbeauftragten klären.

## Installation auf iPad und Handy (wichtig für sicheres Speichern)
- Die App wird über eine feste Internetadresse geöffnet (derzeit GitHub Pages, Hauptordner: `index.html`, `manifest.webmanifest`, `sw.js`, Symbole). Auf dem Server liegt nur der App-Code, keine Förderdaten.
- Offline zuerst (ab 1.2.0): Pfad startet aus dem Zwischenspeicher des Geräts. Der Browser prüft nur `sw.js` auf eine neue Fassung. Ist eine da, erscheint unten „Neue Version von Pfad geladen. Tippe hier zum Aktualisieren.“
- In Safari öffnen → Teilen → „Zum Home-Bildschirm“. Dann startet sie wie eine App, läuft offline, und Safari löscht die Daten nicht nach Wochen ohne Nutzung. Die App fordert außerdem dauerhaften Speicher an.
- Gespeichert wird automatisch nach jeder Eingabe, auf dem Gerät.
- **Achtung iOS:** Die App auf dem Home-Bildschirm hat einen eigenen Speicher, getrennt vom Safari-Tab. Was im Safari-Tab eingetragen wurde, erscheint nicht in der Home-Bildschirm-App. Wird das Symbol gelöscht, löscht iOS auch die Daten. Vor dem Löschen oder Neu-Hinzufügen (z. B. für ein neues Symbol) deshalb immer eine Sicherung speichern und danach wieder laden.
- Als Datei geöffnet (z. B. in der Vorschau der Dateien-App), zeigt die App eine Warnung: Dort kann das Gerät die Daten jederzeit löschen.
- Auf „Heute“ steht unter der Kinderliste (ab 1.3.0, vorher darüber) nach der Einrichtung (auch nur mit dem Beispielfall, ab 1.1.7) eine Zeile „Letzte Sicherung am … Nächste in x Tagen fällig.“ mit Knopf „Sichern“ (ab 1.1.6). Nach 5 Tagen ohne Sicherung wird daraus ab 5 eigenen Einträgen ein deutlicher Hinweis.
- Updates: Eine neue Version auf GitHub Pages wird beim nächsten Start mit Internet geladen. Die Daten bleiben dabei erhalten.

## Sicherungen und Kennungen
- Speichern: Einstellungen → Sichern → „Sicherungskopie ablegen“. Beim ersten Mal legst du ein Sicherungs-Passwort fest (mind. 8 Zeichen) und kannst es auf dem Gerät merken lassen. Dann geht jede weitere Sicherung mit einem Tipp. „Passwort vergessen“ löscht es nur auf diesem Gerät.
- Vor der ersten Sicherung erklärt die App, wohin die Datei gehört: iPad/iPhone „In Dateien sichern“ → „Auf meinem iPad“ → Ordner „Pfad“ → „Sichern“. Spätere Sicherungen kommen in denselben Ordner, jede als eigene Datei mit Datum.
- Die Datei (`pfad-sicherung-NB-2026-10-23.json`) ist verschlüsselt und enthält alle eigenen Kinder und Einstellungen. Ablage nur lokal auf dem Dienstgerät (z. B. „Dateien“ → „Auf meinem iPad“), nicht in einer Cloud.
- Das Passwort ist nicht wiederherstellbar. Ohne Passwort lässt sich die Sicherung nicht öffnen.
- Empfehlung: spätestens alle 5 Tage sichern (die App erinnert daran), zusätzlich vor jedem Gerätewechsel und vor dem Löschen des App-Symbols.
- Symbol pro Kind (z. B. 🦊) zum schnellen Wiedererkennen: 46 neutrale Motive (Tiere, Pflanzen, Dinge), die App schlägt ein freies zufällig vor, änderbar per Tipp auf das Symbol beim Kind. Nicht passend zum Kind wählen (kein Fußball für das Fußballkind). Das Symbol wird beim Teilen und am Server mitgegeben und steht auch auf dem Gesprächsblatt.
- Kinder haben eine **Kennung** (ab 1.3.1, vorher „Kürzel“; „Kürzel“ meint nur noch die Lehrkraft): Klasse und Platz in der Klassenliste im Schulmanager, z. B. `8.1-07` oder `EF-112`. Klassen wie im Schulmanager (ab 1.3.2): 5.1 bis 10.9 sowie EF, Q1, Q2; Eingaben werden vereinheitlicht („8 1“, „8/1“, „81“ → 8.1). Beim Anlegen wählt man die Klasse und trägt die Nummer ein (1 bis 199, wegen der Stufenlisten der Oberstufe). Freitext gibt es nicht mehr, doppelte Kennungen lehnt die App ab. Die Kennung bleibt fest, auch wenn sich die Klassenliste später ändert; beim Kind „Kennung ändern“ (Klasse und Nummer). Ältere Kennungen, die nicht ins Schema passen, zeigen beim Kind den Hinweis „Kennung anpassen“. Jedes Kind hat ein Symbol (fehlende werden beim Start zufällig ergänzt). Der Beispielfall heißt ab 1.3.2 `7.2-99`.
- Auf dem Gerät selbst liegen die Daten unverschlüsselt im Browser. Deshalb nur dienstliche Geräte mit Code-Sperre nutzen.

## Laden und selektiv ergänzen
- Einstellungen → „Sicherung laden“ oder „Geteilte Datei einlesen“ (beide Knöpfe öffnen denselben Weg) → Passwort, bei Dateien mit Team-Passwort ohne Abfrage. Mehrere Dateien auf einmal gehen auch (z. B. mehrere eigene Sicherungen oder Stände von Kolleg:innen): Pfad fragt pro Datei nach dem Passwort, führt die Stände untereinander zusammen (jeder Eintrag nur einmal, die neuere Fassung gilt) und zeigt dann die Auswahl. Einstellungen kommen dabei aus der neuesten Sicherung.
- „Sicherung prüfen“ öffnet eine Datei nur zur Ansicht (Kinder, Einträge, letzter Eintrag) und übernimmt nichts.
-  Danach zeigt die App jedes Kind aus der Datei mit dem, was neu wäre: „neu · 2 Verhalten · 14 Einschätzungen“, „vorhanden: +3 Einschätzungen · +1 Tagebuch“ oder „nichts Neues“.
- Du wählst die Kinder aus, die übernommen werden. Nicht ausgewählte Kinder bleiben unverändert.
- Übernehmen heißt **ergänzen**, nie ersetzen: Neue Einträge kommen dazu, eigene bleiben. Bei demselben Eintrag gilt die neuere Fassung, Löschungen werden mit übernommen.
- Bei einer eigenen Sicherung lassen sich zusätzlich die Einstellungen übernehmen (Fächer, Stundenraster, Wochenziel). Auf einem leeren Gerät ist das vorausgewählt.

## Mit Kolleg:innen austauschen (ohne Server, ab 1.1.5)
- Einstellungen → „Austausch im Team“ → „Kinder weitergeben“ oder beim Kind „Weitergeben“. Du wählst die Kinder aus, nur diese kommen in die Datei. So bekommt niemand alle Fälle, sondern nur die, an denen er:sie mitarbeitet.
- **Team-Passwort (Standard):** Das Team vereinbart ein gemeinsames Passwort, persönlich und nicht per Mail. Jede:r trägt es einmal ein („Eintragen“), Pfad merkt es sich als nicht auslesbaren Schlüssel auf dem Gerät. Danach geht Weitergeben ohne Passwort-Tippen, und Dateien mit Team-Passwort lassen sich ohne Abfrage einlesen. Wer das Team-Passwort noch nicht eingetragen hat, wird beim Einlesen danach gefragt und kann es dann merken lassen.
- **Eigenes Passwort:** Für heikle Fälle lässt sich weiter ein Passwort nur für diese Datei festlegen. Das sagst du der Kollegin oder dem Kollegen persönlich.
- Grenze des Team-Passworts: Wer zum Team gehört, kann jede Datei mit Team-Passwort öffnen. Verlässt jemand das Team, vereinbart ihr ein neues und tragt es neu ein („Ändern“).
- Ältere Pfad-Versionen können Dateien mit Team-Passwort öffnen, sie fragen dann einfach nach dem Passwort.
- Vor dem ersten Weitergeben erklärt Pfad den Weg: iPad/iPhone per AirDrop ans Dienstgerät, wenn ihr zusammensitzt, sonst per Dienstmail. Nicht über Messenger, nicht in eine private Cloud.
- Die Kollegin oder der Kollege sichert die Datei in „Dateien“ (AirDrop legt sie unter „Downloads“ ab) und tippt in Pfad auf „Geteilte Datei einlesen“. Dann ergänzt die Datei den eigenen Stand (siehe oben). So entsteht ein Austausch in beide Richtungen.
- Beim Kind steht „Zuletzt weitergegeben am …“ (nur auf dem eigenen Gerät).
- Jeder Eintrag trägt das Kürzel der Lehrkraft, die ihn gemacht hat.
- Passwort vergessen: Das Team-Passwort fragst du im Team nach. Ein vergessenes Sicherungs-Passwort lässt sich nicht wiederherstellen: „Vergessen“, neues festlegen und sofort neu sichern. Code der App-Sperre vergessen: alles auf dem Gerät löschen und die letzte Sicherung laden.

## Schulserver (vorbereitet, noch nicht in Betrieb)
Ziel: eine gemeinsame Datenbank auf einem internen Schulserver, erreichbar im Schul-WLAN. Die App ist dafür fertig vorbereitet, der Server muss aber noch von IT bzw. Schulträger eingerichtet und freigegeben werden. Ein lauffähiger Referenz-Server liegt unter `server/` (Anleitung in `server/README.md`).

So arbeitet die App mit Server:
- Einmalig: Einstellungen → Schulserver → Adresse, Kürzel, Passwort → Verbinden. Die Konten legt die Server-Verwaltung an.
- Gespeichert wird weiter sofort auf dem Gerät. Ist der Server erreichbar (Schul-WLAN), gleicht die App ab: beim Öffnen, etwa 5 Sekunden nach jeder Änderung und jede Minute. Ohne Verbindung sammelt sie die Änderungen und schickt sie später. Der Status steht beim Kind („Schulserver nicht erreichbar, 2 Kinder warten auf Übertragung. Alles ist auf dem Gerät gespeichert.“).
- Kinder bleiben zunächst nur auf dem Gerät. Erst „Freigeben“ beim Kind legt den Fall auf dem Server an.
- Zugriff per Einladung: beim Kind „+ Kolleg:in einladen“ → Kürzel. Die eingeladene Person sieht die Einladung auf „Heute“ und nimmt sie an oder lehnt ab. Erst danach bekommt sie den Fall.
- Wer eingetragen ist, sieht alle Einträge zum Kind und ergänzt eigene. Entfernen per ✕: Der Fall verschwindet beim nächsten Abgleich vom Gerät der Person.
- Wer nicht eingeladen ist, sieht den Fall nicht, auch nicht das Kürzel.
- Der Server führt nach derselben Regel zusammen wie die App (neuere Fassung gewinnt, Löschungen gelten für alle).

Offene Punkte für den Betrieb: Wer betreibt den Server (Schulträger, Medienzentrum)? Verschlüsselte Verbindung (https) mit Zertifikat. Datensicherung des Servers. Löschfristen. Freigabe durch Schulleitung und DSB.

## Datenschutz
- Im Prototyp liegen die Daten nur im Browser des Dienstgeräts. Es gibt keinen Server, die App sendet nichts.
- Sicherungen und geteilte Dateien sind verschlüsselt (AES-256-GCM, Schlüssel per PBKDF2 mit 310.000 Runden aus dem Passwort). Sie gehören trotzdem nur auf dienstlichen Speicher.
- Teilen nur mit Lehrkräften, die am Fall mitarbeiten, und nur die Kinder, um die es geht.
- Wird der Browserspeicher gelöscht, sind die Daten weg. Deshalb regelmäßig eine Sicherung speichern.
- Kinder nur mit Kennung anlegen, keine Namen in Kommentare schreiben. Die Zuordnung (Kennung ↔ Name) ergibt sich aus der Klassenliste im Schulmanager zum Zeitpunkt des Anlegens und gehört zusätzlich in die Förderakte, weil sich die Liste im Laufe des Jahres ändern kann.
- Vor dem Einsatz mit echten Fällen: Freigabe durch Schulleitung und Datenschutzbeauftragte:n (VO-DV I). Für den späteren Schulserver ist eine eigene Abstimmung nötig.

## Förderbeginn
- „Förderung startet am“: der Tag, ab dem eine neue Maßnahme gilt. Davor wird nur beobachtet. Im Verlauf erscheint eine Linie, der Trend vergleicht die 5 Werte davor mit den 5 danach.

## Einrichtung
- Kürzel (mit „Weiter“), Beispielfall, erste Sicherung, App-Sperre (ab 1.1.6, empfohlen, mit „Ohne Sperre weiter“ überspringbar). Danach Konfetti und „Geschafft, Pfad ist eingerichtet!“ mit Knopf „Anleitung starten“.
- Der Beispielfall lässt sich in den Einstellungen mit „Beispielfall entfernen“ löschen.

## Neu in Pfad (ab 1.2.9)
- Nach einem Update zeigt Pfad beim nächsten Start einmal das Fenster „Neu in Pfad“ mit allen Neuerungen seit der zuletzt gesehenen Version (höchstens fünf Versionen). „Alles klar“ schließt es, danach erscheint es erst nach dem nächsten Update wieder.
- Auf einem neuen Gerät ohne Daten erscheint nichts, dort reichen Einrichtung und Anleitung. Mit App-Sperre erscheint das Fenster erst nach dem Entsperren.
- Jederzeit wieder: Einstellungen ganz unten → „Was ist neu?“.
- Pflege: Die Texte stehen in `quelle/pfad.html` in der Liste `NEU` (neueste oben). Bei jeder Version mit sichtbarer Änderung einen kurzen Eintrag ohne Fachbegriffe ergänzen. Gemerkt wird nur die zuletzt gesehene Versionsnummer unter einem eigenen Schlüssel (`…-gesehen`), keine Daten.

## Anleitung in der App
- Start: Einstellungen → „Anleitung“ → „Starten“. Nach der Einrichtung erscheint auf „Heute“ der Hinweis „Einrichtung fertig. Jetzt die Anleitung“.
- 8 Schritte. Die Anleitung öffnet die echten Bildschirme mit dem fiktiven Beispielfall (wird bei Bedarf geladen) und markiert in Senfgelb die Stelle, um die es geht. Unten steht ein Feld mit Erklärung, „Zurück“, „Weiter“ und „Beenden“.
- Während der Anleitung lässt sich in der App nichts verändern.

## Erscheinungsbild
- iPad quer: breitere Darstellung.
- Home-Bildschirm-App: Der Inhalt beginnt etwas tiefer (ab 1.1.8), damit Datum und Überschrift scharf bleiben, obwohl iOS den oberen Rand verwischt. Der feste Streifen oben ist seit 1.2.6 weg, weil der Inhalt beim Scrollen dahinter verschwand.
- Die Seite federt am Ende nicht nach (ab 1.2.5). Sonst zog das iPad die Menüleiste unten mit nach oben.
- Einstellungen → „Erscheinungsbild“: „Wie Gerät“ (Standard), „Hell“ oder „Dunkel“.
- Markierungen (Einrichtung, Anleitung) in Senfgelb, passend zur Palette.
- Schriftgröße: Normal, Groß, Sehr groß. Knöpfe ohne Text haben Beschriftungen für VoiceOver.

## Bewerten: mehrere Kinder, Rückgängig, Erinnerung
- „Heute“ → „Mehrere nacheinander“: Kinder auswählen, mit einem Tipp „Alle aus 8A“. Tag, Stunde und Fach bleiben für alle gleich, „Überspringen“ geht zum nächsten Kind. Ist keine Stunde hinterlegt, gibt es im Dialog eine Auswahlliste „Stunde“ (gilt für alle). Fehlt die Stunde weiter, steht die Auswahlliste beim Bewerten unter der Zeile „ohne Stunde“.
- Nach dem Speichern erscheint einige Sekunden „Rückgängig“. Das nimmt alle Einschätzungen dieses Durchgangs zurück.
- Wurde ein Kind 7 Tage nicht eingeschätzt, steht das auf „Heute“ bei dem Kind.

## Schuljahreswechsel
- Einstellungen → „Schuljahreswechsel“ → „Klassen hochsetzen“: 7.2 wird 8.2, Kennung 7.2-01 wird 8.2-01, EF wird Q1, Q1 wird Q2 (ab 1.3.2). Jahrgang 10 und Q2 bleiben. Einträge bleiben unverändert. Jahrgang 10 und Klassen ohne Zahl bleiben.
- Vorher zeigt Pfad, welche Klasse wohin geht. Danach kurz „Rückgängig“ im Hinweis und dauerhaft in den Einstellungen („Wechsel vom … rückgängig machen“), bis zum nächsten Wechsel.
- Ab August erinnert „Heute“ einmal an das neue Schuljahr („Nicht nötig“ blendet es aus).

## Förderung abschließen und Bericht
- Beim Kind → „Förderung abschließen“: Das Kind verschwindet von „Heute“, Pfad öffnet den Bericht und erinnert nach 4 Wochen auf „Heute“ ans Löschen. „Wieder aufnehmen“ macht es rückgängig.
- Bericht für die Förderakte (beim Kind oder im Verlauf): Kopf mit Kennung, Zeitraum, wer eingeschätzt hat; pro Verhalten Graph, Auswertung, Nach Fach; dazu das Tagebuch. A4 hoch, über „PDF erstellen“. Pfad baut die PDF selbst, weil iOS in der Home-Bildschirm-App kein Druckfenster öffnet. Auf iPhone und iPad öffnet sich das Teilen-Fenster mit „Drucken“ und „In Dateien sichern“, am Rechner lädt die Datei herunter. Das Gesprächsblatt geht genauso („PDF / Drucken“, A4 quer). Den Namen trägst du nur auf dem Ausdruck von Hand ein.

## App-Sperre mit Verschlüsselung (optional, Standard aus, in der Einrichtung empfohlen)
- Einstellungen → „App-Sperre und Verschlüsselung“: Code mit 4 bis 6 Ziffern (entschieden 24.10.2026), Sperre sofort, nach 1 oder nach 5 Minuten im Hintergrund, beim Start immer.
- „Alle Daten auf diesem Gerät löschen“ lässt die App-Sperre an (ab 1.3.3). Neue Einträge danach sind weiter verschlüsselt.
- Ist sie an, liegen die Daten im Browserspeicher nur verschlüsselt (AES-GCM, Schlüssel per PBKDF2 mit 600 000 Runden aus dem Code). Ohne Code sind sie nicht lesbar.
- Grenze: Ein Ziffern-Code lässt sich mit viel Aufwand durchprobieren, wenn jemand den Speicher kopiert. Der Gerätecode bleibt Pflicht.
- Nach 5 Fehlversuchen Wartezeit (30 Sekunden, dann länger). Code vergessen: alles auf dem Gerät löschen und die letzte Sicherung laden. Der Code steckt nicht in Sicherungen.

## Bedienung (ab 1.1)
- Beim Kind und im Verlauf: zwei Kacheln „Gesprächsblatt“ (für Kind und Eltern) und „Bericht“ (PDF für die Förderakte).
- „Zurück“ führt immer zur Ansicht, aus der du gekommen bist (z. B. vom Bericht zurück in den Verlauf). Die Menüleiste unten startet den Bereich neu.
- Im Verlauf steht „Text für den Förderplan kopieren“ direkt unter „Was zeigt sich?“. Der eigene Abschnitt „Für den Förderplan“ ist entfallen, der Bericht ersetzt den Ausdruck.
- Überschriften mit Linien-Icons, Menüleiste mit hervorgehobenem aktivem Bereich (Varianten in varianten/).

## Sicherheit beim Laden fremder Dateien (ab 1.1.3)
- Pfad prüft beim Laden von Sicherungen, geteilten Dateien und beim Server-Abgleich alle internen Kennungen, Datumsangaben und Einstellungen. Ungültige Einträge werden nicht übernommen.
- Bei alten, unverschlüsselten Dateien fragt Pfad vor dem Laden nach.
- Eine Inhaltsrichtlinie (CSP) erlaubt Verbindungen nur zur eigenen Adresse.
- Fehlversuche bei der App-Sperre werden dauerhaft gezählt, auch nach einem Neustart.
- In CSV-Exporten werden Formeln entschärft.
- Neue Versionen erscheinen zuerst als Beta unter https://hbg-pfad.github.io/pfad/beta/ (eigener Speicher). Die Hauptversion wird erst nach Freigabe aktualisiert.

## Neue Adresse (ab 26.10.2026)
- Pfad liegt jetzt in der GitHub-Organisation hbg-pfad: https://hbg-pfad.github.io/pfad/ (Beta: https://hbg-pfad.github.io/pfad/beta/).
- Grund: eigener Browserspeicher, getrennt von anderen Seiten unter der alten Adresse.
- Wer Pfad unter n-bru.github.io installiert hat: in der alten App eine Sicherung speichern, Pfad unter der neuen Adresse neu zum Home-Bildschirm hinzufügen und dort die Sicherung laden. Danach das alte Symbol löschen.
