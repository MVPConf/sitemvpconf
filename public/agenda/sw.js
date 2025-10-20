const CACHE_NAME = "mvpconf-agenda-cache-disabled"; // bump para forçar update

self.addEventListener("install", () => {
  // Não faz pre-cache; força ativação imediata
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Remove TODOS os caches existentes, inclusive o atual
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  // Apenas manipula requisições GET HTTP/HTTPS
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // Estratégia: network-first, sem popular o cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
