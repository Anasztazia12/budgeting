const CACHE_NAME = "budgeting-app-v3"; 
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./budget.html",
  "./monthly_budget.html",
  "./assets/css/style.css",
  "./assets/images/budget-icon.png",
  "./assets/images/budget-icon-any-192.png",
  "./assets/images/budget-icon-any-512.png",
  "./assets/images/budget-icon-maskable-192.png",
  "./assets/images/budget-icon-maskable-512.png",
  "./manifest.webmanifest"
];

// INSTALL → cache alap fájlok
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ACTIVATE → régi cache törlése
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH → HTML: always network first, others: cache first
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // HTML → mindig friss
  if (url.pathname.endsWith(".html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Minden más → cache first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});