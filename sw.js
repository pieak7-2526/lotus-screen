// Offline cache for the screen app (weather still needs internet)
const C = "screen-v5";
const FILES = ["./", "index.html", "manifest.json", "icon.svg", "data/2026.js", "data/2027.js", "img/readyday.jpg", "img/m01.jpg", "img/m02.jpg", "img/m03.jpg", "img/m04.jpg", "img/m05.jpg", "img/m06.jpg", "img/m07.jpg", "img/m08.jpg", "img/m09.jpg", "img/m10.jpg", "img/m11.jpg", "img/m12.jpg", "img/x01.jpg", "img/x02.jpg", "img/x03.jpg", "img/x04.jpg", "img/x05.jpg", "img/x06.jpg"];
self.addEventListener("install", e => e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;               // API calls go straight to network
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
