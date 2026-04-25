const CACHE_NAME = "budgeting-app-v2";
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

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

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
