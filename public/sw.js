const CACHE_NAME = 'agrivision-v1';
const ASSETS = [
  '/',
  '/farmer/dashboard',
  '/farmer/assistant',
  '/farmer/disease',
  '/farmer/weather',
  '/farmer/markets',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        return caches.match('/farmer/dashboard');
      });
    })
  );
});
