// Offline and instant start: answer from the copy on the phone right away, and fetch a fresh
// copy in the background for the next launch. Changing CACHE replaces every file at once
// (the app then shows "New version ready").
const CACHE = 'english-app-v170';
const FILES = [
  './', 'index.html', 'css/style.css',
  'js/data.js', 'js/grammar.js', 'js/content-beginner.js', 'js/content-intermediate.js', 'js/content-advanced.js', 'js/content-index.js',
  'js/explain.js', 'js/explain-beginner.js', 'js/explain-intermediate.js', 'js/explain-advanced.js',
  'js/store.js', 'js/i18n.js', 'js/app.js',
  'manifest.webmanifest', 'icons/owl-180.png', 'icons/owl-192.png', 'icons/owl-512.png', 'icons/logo.png', 'icons/favicon.png',
  'media/surprise.jpg'
];
const FONTS = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache, so a new version really gets new files
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Audio asks for byte ranges; iPhone plays it only from a real partial response, so it goes to the network
  if (req.headers.has('range')) return;
  const origin = new URL(req.url).origin;
  const own = origin === location.origin;
  if (!own && !FONTS.includes(origin)) return;   // anything else goes straight to the network

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true })
      || (req.mode === 'navigate' ? await cache.match('index.html') : undefined);

    const fresh = fetch(req).then(res => {
      // The font stylesheet comes back "opaque" (no CORS); it is still the right file to keep
      if (res.ok || (!own && res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    });

    if (cached) {
      e.waitUntil(fresh.catch(() => {}));   // refresh quietly for next time
      return cached;
    }
    try {
      return await fresh;
    } catch (err) {
      return req.mode === 'navigate' ? cache.match('index.html') : Response.error();
    }
  })());
});
