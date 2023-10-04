// Copyright (C)2023-present Xander Christopher. All right reserved.

self.addEventListener("install", (e) => {
    console.log("Service Worker Installed");
    // e.waitUntil(
    //     (async () => {
    //         const cache = await caches.open(cacheName);
    //         console.log("[Service Worker] Caching all: app shell and content");
    //         await cache.addAll(resourcesToPreCache);
    //     })(),
    // );
});
self.addEventListener("activate", (e) => {
    console.log("Service Worker Activated");
    // e.waitUntil(
    //     caches.keys().then((keyList) => {
    //         return Promise.all(
    //             keyList.map((key) => {
    //                 if (key === cacheName) {
    //                     return;
    //                 }
    //                 return caches.delete(key);
    //             }),
    //         );
    //     }),
    // );
});
const cacheName = 'PDFViewer-v1';
// const resourcesToPreCache = [
//     '/PDFViewer/',
//     '/PDFViewer/index.html',
//     '/PDFViewer/Styles/mycss.css',
//     '/PDFViewer/Styles/viewer.css',
//     '/PDFViewer/Scripts/myjs.js',
//     '/PDFViewer/Scripts/pdf.js',
//     '/PDFViewer/Scripts/pdf.worker.js',
//     '/PDFViewer/Scripts/viewer.js',
//     '/PDFViewer/Scripts/viewer.js.map',
//     '/PDFViewer/Picker/css/alwan.min.css',
//     '/PDFViewer/Picker/css/alwan.min.css.map',
//     '/PDFViewer/Picker/js/alwan.min.js',
//     '/PDFViewer/Picker/js/alwan.min.js.map',
//     '/PDFViewer/Others/base.txt',
//     '/PDFViewer/Others/colors.json',
//     '/PDFViewer/Others/Kibo (ISS module).pdf',
//     '/PDFViewer/Others/manifest.json',
//     '/PDFViewer/locale/locale.properties',
//     '/PDFViewer/locale/en-US/viewer.properties',
//     '/PDFViewer/Images/favicon.ico',
//     '/PDFViewer/Images/android-chrome-48x48.png',
//     '/PDFViewer/Images/android-chrome-72x72.png',
//     '/PDFViewer/Images/android-chrome-96x96.png',
//     '/PDFViewer/Images/android-chrome-144x144.png',
//     '/PDFViewer/Images/android-chrome-192x192.png',
//     '/PDFViewer/Images/android-chrome-256x256.png',
//     '/PDFViewer/Images/android-chrome-512x512.png',
//     '/PDFViewer/Images/apple-touch-icon48.png',
//     '/PDFViewer/Images/apple-touch-icon72.png',
//     '/PDFViewer/Images/apple-touch-icon96.png',
//     '/PDFViewer/Images/apple-touch-icon144.png',
//     '/PDFViewer/Images/apple-touch-icon192.png',
//     '/PDFViewer/Images/apple-touch-icon256.png',
//     '/PDFViewer/Images/apple-touch-icon512.png',
//     '/PDFViewer/Images/cursor-editorFreeText.svg',
//     '/PDFViewer/Images/cursor-editorInk.svg',
//     '/PDFViewer/Images/loading-dark.svg',
//     '/PDFViewer/Images/loading-icon.gif',
//     '/PDFViewer/Images/loading.svg',
//     'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap',
//     'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKcQ72j00.woff2',
//     'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72.woff2',
// ];
self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});