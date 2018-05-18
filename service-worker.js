const version = 'v1';
const siteName = 'rut-generator';
const staticCacheName = version + '::' + siteName;

const offlineStuff = [
    'index.html',
    'index.js',
    'styles.css',
    'https://fonts.googleapis.com/css?family=Open+Sans:300,400'
];

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Adding files to the cache..');
    event.waitUntil(
        caches
        .open(staticCacheName)
        .then((cache) => {
            return cache.addAll(offlineStuff);
        })
        .then(() => {
            console.log('[Service Worker] Files have been cached');
        })
    )
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => {
                return Promise.all(
                    keys
                        .filter((key) => {
                            // If your cache name don't start with the current version...
                            return key.includes(siteName) && !key.startsWith(version);
                        })
                        .map((key) => {
                            //...it will be deleted
                            return caches.delete(key);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Acivation has been completed');
            })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});