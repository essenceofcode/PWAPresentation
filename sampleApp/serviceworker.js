var cacheId = "pwatest";
var cachedResources = [
  "/index.html",
  "/#",
  "/manifest.json",
  "/styles/style.css",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css",
  "/images/trinug32.png",
  "/images/trinug192.png",
  "/images/trinug512.png",
  "serviceworker.js"
];

self.addEventListener("install", (event) => {
  console.log("Service worker installed");

  event.waitUntil(
    caches.open(cacheId).then((cache) => {
      console.log("Caching all resources");
      return cache.addAll(cachedResources);
    })
  );
});

self.addEventListener("fetch", (event) => {
    console.log("Fetch request for:", event.request.url);

    event.respondWith(
      caches.open(cacheId).then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request);
        });
      })
    );
});
