const CACHE_NAME = 'mental-math-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/mobile.css',
    '/css/accessibility.css',
    '/js/phases.js',
    '/js/app-core.js',
    '/js/state.js',
    '/js/learn-content.js',
    '/js/basket-game.js',
    '/js/learn-engine.js',
    '/js/quiz-engine.js',
    '/js/gamification.js',
    '/js/i18n.js',
    '/js/sound.js',
    '/js/settings.js',
    '/js/app.js',
    '/js/mobile.js',
    '/js/accessibility.js',
    '/locales/hr.json',
    '/locales/en.json',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    if (event.request.url.includes('/locales/')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            }))
    );
});
