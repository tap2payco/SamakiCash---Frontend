const CACHE_NAME = "samakicash-v1"
const urlsToCache = [
  "/",
  "/dashboard",
  "/credit",
  "/insurance",
  "/history",
  "/profile",
  "/manifest.json",
  "/icon-192x192.jpg",
  "/icon-512x512.jpg",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
