var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js',
  'image/minion.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  // Seperti Promise menjalankan setelah yang di dalamnya di kerjakan 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('in install service worker Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});




self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheNames){
          return cacheNames != CACHE_NAME
        }).map(function(cacheNames){
          return caches.delete(cacheName)
        })
      );
    })
  );
});