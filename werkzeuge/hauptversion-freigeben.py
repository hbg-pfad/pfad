#!/usr/bin/env python3
"""Übernimmt quelle/pfad.html als Hauptversion (index.html) und zählt den Offline-Zwischenspeicher hoch.
Nur auf ausdrückliches Kommando der Projektleitung ausführen, nachdem die Beta geprüft ist.
Aufruf (im Repo-Ordner): python3 werkzeuge/hauptversion-freigeben.py <cache-name, z. B. pfad-1.1.4>"""
import sys, re, shutil, pathlib
repo = pathlib.Path(__file__).resolve().parent.parent; cache = sys.argv[1]
assert cache.startswith("pfad-") and not cache.startswith("pfad-beta"), "Cache-Name wie pfad-1.1.4"
src = repo / "quelle" / "pfad.html"
assert 'const KEY="verlaufsbogen-v2";' in src.read_text(), "Speicher-Schlüssel der Hauptversion fehlt"
shutil.copy(src, repo / "index.html")
sw = (repo / "sw.js").read_text()
sw, n = re.subn(r'const C="[^"]+"', f'const C="{cache}"', sw, count=1)
assert n == 1
(repo / "sw.js").write_text(sw)
print("Hauptversion übernommen:", cache)
