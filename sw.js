/**
 * Service Worker for Offline Support
 * Enables the app to work offline and cache assets
 */

const CACHE_NAME = 'salary-calc-v4';
const urlsToCache = [
    '/js/i18n.js',
    '/js/db.js',
    '/js/app.js',
    '/manifest.json'
];

// Don't cache HTML - always fetch fresh to get latest app state
const doNotCache = ['/index.html', '/'];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Check if this is an HTML file that shouldn't be cached
    const url = new URL(event.request.url);
    const shouldNotCache = doNotCache.some(path => url.pathname === path || url.pathname.endsWith('.html'));

    if (shouldNotCache) {
        // For HTML files, always try network first
        event.respondWith(
            fetch(event.request).catch(() => {
                // Fallback to cached version if offline
                return caches.match('/index.html');
            })
        );
    } else {
        // For other files, use cache-first strategy
        event.respondWith(
            caches.match(event.request).then(response => {
                // Return from cache if available
                if (response) {
                    return response;
                }

                // Try network
                return fetch(event.request).then(response => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response for caching
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }).catch(() => {
                    // Fallback when offline
                    console.log('Offline - using cached version');
                    return caches.match('/index.html');
                });
            })
        );
    }
});

/**
 * TODO: Implement
 * - Background sync for data upload
 * - Push notifications
 * - Periodic sync
 * - Cache strategies (stale-while-revalidate, etc.)
 */
