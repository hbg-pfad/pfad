// Offline-Betrieb: Pfad startet immer aus dem Gerät (Zwischenspeicher), nicht vom Server.
// Der Browser prüft beim Start nur diese kleine Datei auf eine neue Fassung. Ändert sich der Cache-Name,
// lädt er die App-Dateien einmal neu und die App zeigt „Neue Version – neu laden“.
// Quelle: quelle/sw.js. Beta und Hauptversion werden daraus gebaut, nicht von Hand ändern.
const C="pfad-beta-1.3.7",FILES=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.startsWith("pfad-")&&k.startsWith("pfad-beta")).map(k=>caches.delete(k)))));self.clients.claim()});
// Aufräumen nur bei eigenen Speichern (pfad-…), fremde Seiten unter derselben Adresse bleiben unberührt (1.3.3)
// Nur die App-Dateien kommen aus dem Speicher. Alles andere (z. B. einrichten.html) geht ans Netz.
// Ohne Netz öffnet eine Seitenanfrage die App.
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==="navigate"?c.match("index.html"):Response.error()))))});
