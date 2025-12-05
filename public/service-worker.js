const PRECACHE = 'iligan-precache-v1';
const RUNTIME = 'iligan-runtime-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => !currentCaches.includes(name))
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Helper: is navigation (page) request
function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

self.addEventListener('fetch', event => {
  const { request } = event;

  // Handle navigation requests with an App Shell strategy: try network, fall back to cache, then offline page
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Successful network request, update the cache
          const copy = response.clone();
          caches.open(RUNTIME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cached => cached || caches.match('/offline.html'));
        })
    );
    return;
  }

  // For other requests (assets, APIs) use a cache-first strategy with runtime caching
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Also update the cache in background
        event.waitUntil(
          fetch(request).then(response => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(RUNTIME).then(cache => cache.put(request, copy));
            }
          }).catch(() => {})
        );
        return cachedResponse;
      }

      return fetch(request).then(response => {
        // Put a copy in cache for future
        if (response && response.status === 200 && request.method === 'GET' && request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(RUNTIME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        // If request is an image, optionally return a placeholder (not implemented)
        return caches.match('/offline.html');
      });
    })
  );
});
