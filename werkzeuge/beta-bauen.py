#!/usr/bin/env python3
"""Baut die Beta von Pfad aus quelle/pfad.html in beta/.
Aufruf (im Repo-Ordner): python3 werkzeuge/beta-bauen.py <cache-name, z. B. pfad-beta-1.1.4>
Die Beta speichert unter einem eigenen Schlüssel, echte Daten der Hauptversion bleiben unberührt."""
import sys, re, shutil, pathlib
repo = pathlib.Path(__file__).resolve().parent.parent; cache = sys.argv[1]
assert cache.startswith("pfad-beta"), "Cache-Name muss mit pfad-beta beginnen"
s = (repo / "quelle" / "pfad.html").read_text()
def rep(old, new):
    global s
    assert old in s, old
    s = s.replace(old, new, 1)
rep('const KEY="verlaufsbogen-v2";', 'const KEY="pfad-beta";')
# Eigene IndexedDB für gemerkte Schlüssel (Sicherungs- und Team-Passwort), sonst überschreibt die Beta die der Hauptversion
rep('indexedDB.open("verlaufsbogen",1)', 'indexedDB.open("pfad-beta",1)')
rep('<title>Pfad</title>', '<title>Pfad Beta</title>')
rep('content="Pfad">', 'content="Pfad Beta">')
s = re.sub(r'const PFAD_VERSION="([^"]+)"', r'const PFAD_VERSION="\1 Beta"', s, count=1)
rep('</style>', '.betab{position:fixed;top:calc(env(safe-area-inset-top) + 6px);right:10px;z-index:50;background:var(--sig,#e3a008);color:#2b2420;font:700 .7rem/1 system-ui,sans-serif;letter-spacing:.06em;padding:5px 8px;border-radius:8px;pointer-events:none}@media (display-mode:standalone){.betab{top:calc(env(safe-area-inset-top) + 48px)}}@media print{.betab{display:none}}\n</style>')
rep('<body>', '<body><div class="betab" aria-label="Beta-Version">BETA</div>')
out = repo / "beta"; out.mkdir(exist_ok=True)
(out / "index.html").write_text(s)
for f in ["icon-180.png", "icon-192.png", "icon-512.png"]:
    shutil.copy(repo / f, out / f)
m = (repo / "manifest.webmanifest").read_text().replace('"name":"Pfad","short_name":"Pfad"', '"name":"Pfad Beta","short_name":"Pfad Beta"')
assert "Pfad Beta" in m
(out / "manifest.webmanifest").write_text(m)
sw = (repo / "sw.js").read_text()
sw = re.sub(r'const C="[^"]+"', f'const C="{cache}"', sw, count=1)
sw = sw.replace('!k.startsWith("pfad-beta")', 'k.startsWith("pfad-beta")')
assert 'startsWith("pfad-beta")' in sw
(out / "sw.js").write_text(sw)
print("Beta gebaut:", out, cache)
