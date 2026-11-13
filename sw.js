// עבודה לא מקוונת: קודם מנסים רשת (כדי לקבל עדכונים), ואם אין - מהמטמון.
const CACHE = 'english-app-v8';
const FILES = [
  './', 'index.html', 'css/style.css',
  'js/data.js', 'js/grammar.js', 'js/content-beginner.js', 'js/content-intermediate.js', 'js/content-advanced.js', 'js/content-index.js',
  'js/store.js', 'js/i18n.js', 'js/app.js',
  'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Keep our own files and the web font, so the app also works offline
        const origin = new URL(e.request.url).origin;
        const keep = origin === location.origin
          || origin === 'https://fonts.googleapis.com' || origin === 'https://fonts.gstatic.com';
        if (res.ok && keep) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
