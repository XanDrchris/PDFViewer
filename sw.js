self.addEventListener('install', event => {
    console.log("Service Worker install Event");
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) =>
                cache.addAll(resourcesToPreCache)
            )
    )
})
self.addEventListener('activate', event => {
    console.log("SErvice Wroker Activatedd");
})
const cacheName = 'PDFViewer-v1';
const resourcesToPreCache = [
    '/PDFViewer/',
    '/PDFViewer/index.html',
    '/PDFViewer/Styles/mycss.css',
    '/PDFViewer/Styles/viewer.css',
    '/PDFViewer/Scripts/myjs.js',
    '/PDFViewer/Scripts/pdf.js',
    '/PDFViewer/Scripts/pdf.worker.js',
    '/PDFViewer/Scripts/viewer.js',
    '/PDFViewer/Scripts/viewer.js.map',
    '/PDFViewer/Picker/css/alwan.min.css',
    '/PDFViewer/Picker/css/alwan.min.css.map',
    '/PDFViewer/Picker/js/alwan.min.js',
    '/PDFViewer/Picker/js/alwan.min.js.map',
    '/PDFViewer/Others/base.txt',
    '/PDFViewer/Others/colors.json',
    '/PDFViewer/Others/Kibo (ISS module).pdf',
    '/PDFViewer/Others/manifest.json',
    '/PDFViewer/locale/locale.properties',
    '/PDFViewer/locale/en-US/viewer.properties',
    '/PDFViewer/Images/favicon.ico',
    '/PDFViewer/Images/android-chrome-48x48.png',
    '/PDFViewer/Images/android-chrome-72x72.png',
    '/PDFViewer/Images/android-chrome-96x96.png',
    '/PDFViewer/Images/android-chrome-144x144.png',
    '/PDFViewer/Images/android-chrome-192x192.png',
    '/PDFViewer/Images/android-chrome-256x256.png',
    '/PDFViewer/Images/android-chrome-512x512.png',
    '/PDFViewer/Images/apple-touch-icon48.png',
    '/PDFViewer/Images/apple-touch-icon72.png',
    '/PDFViewer/Images/apple-touch-icon96.png',
    '/PDFViewer/Images/apple-touch-icon144.png',
    '/PDFViewer/Images/apple-touch-icon192.png',
    '/PDFViewer/Images/apple-touch-icon256.png',
    '/PDFViewer/Images/apple-touch-icon512.png',
    '/PDFViewer/Images/cursor-editorFreeText.svg',
    '/PDFViewer/Images/cursor-editorInk.svg',
    '/PDFViewer/Images/loading-dark.svg',
    '/PDFViewer/Images/loading-icon.gif',
    '/PDFViewer/Images/loading.svg',
];
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});