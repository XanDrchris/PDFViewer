self.addEventListener('install', event => {
    console.log("Service Worker install Event");
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(resourcesToPreCache);
            })
    )
})
const cacheName = 'PDFViewer-v1.0.0';
const resourcesToPreCache = [
    '/PDFViewer/',
    '/PDFViewer/index.html',
    '/PDFViewer/Styles/mycss.css',
    '/PDFViewer/Styles/viewer.css',
];
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request) || fetch(event.request)
    )
})