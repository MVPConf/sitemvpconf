const CACHE_NAME = "mvpconf-agenda-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
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
});

self.addEventListener("fetch", (event) => {
  // Apenas manipula requisições GET HTTP/HTTPS
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Evita tentar cachear respostas opacas/externas ou de outros esquemas
        const isCacheable =
          response && response.ok &&
          (response.type === "basic" || (response.type === "default" && url.origin === self.location.origin));
        if (isCacheable) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Best-effort; ignora falhas de put
            cache.put(event.request, clone).catch(() => {});
          });
        }
        return response;
      }).catch(() => cached);
    })
  );
});
