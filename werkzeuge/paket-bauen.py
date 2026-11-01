#!/usr/bin/env python3
"""Packt Pfad als ZIP zum Hochladen auf einen eigenen Webspace (z. B. Schul-Website oder Schulträger) statt GitHub.
Aufruf (im Repo-Ordner): python3 werkzeuge/paket-bauen.py beta   oder   python3 werkzeuge/paket-bauen.py haupt
Ergebnis: paket/pfad-<beta|haupt>-<version>.zip (wird nicht committet). Inhalt unverändert in einen eigenen Ordner hochladen."""
import sys, re, zipfile, pathlib
repo = pathlib.Path(__file__).resolve().parent.parent; art = sys.argv[1]
assert art in ("beta", "haupt"), "beta oder haupt angeben"
src = repo / "beta" if art == "beta" else repo
files = ["index.html", "sw.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"]
if art == "haupt":
    files += ["einrichten.html", "anleitung.webmanifest", "anleitung-x-180.png", "anleitung-x-192.png", "anleitung-x-512.png", "pfad-logo.svg"]
html = (src / "index.html").read_text()
ver = re.search(r'const PFAD_VERSION="([^"]+)"', html).group(1).replace(" Beta", "")
for f in files: assert (src / f).exists(), f"fehlt: {f}"
liesmich = """Pfad – Paket zum Hochladen

1. Alle Dateien unverändert in einen eigenen, leeren Ordner hochladen (z. B. https://pfad.<schule>.de/ oder https://<schule>.de/pfad/).
2. Nur HTTPS. Ohne HTTPS funktionieren Offline-Betrieb und Home-Bildschirm nicht.
3. Am besten eine eigene Subdomain, auf der sonst nichts liegt. Andere Skripte auf derselben Adresse (CMS, Plugins, Statistik) könnten sonst den Speicher von Pfad auf dem Gerät lesen.
4. Keine Zusätze einbauen lassen (Statistik, Cookie-Banner, Werbung, Umschreiben durch ein Baukastensystem).
5. Die Adresse nach dem ersten echten Eintrag nicht mehr ändern: Die Daten auf dem Gerät hängen an der Adresse.
6. Updates: neue Dateien drüberladen. Die Geräte holen die neue Fassung beim nächsten Start mit Internet.
"""
out = repo / "paket"; out.mkdir(exist_ok=True)
z = out / f"pfad-{art}-{ver}.zip"
with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
    for f in files: zf.write(src / f, f)
    zf.writestr("LIESMICH.txt", liesmich)
print("Paket gebaut:", z)
