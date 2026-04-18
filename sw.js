const CACHE_NAME = 'scanner-v6-cache';
const assets = [
  './',
  './index.html',
  'https://unpkg.com/html5-qrcode'
];

// Instalar y guardar archivos en cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Responder desde el cache cuando no hay red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});