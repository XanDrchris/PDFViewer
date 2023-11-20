// Copyright (C)2023-present Xander Christopher. All rights reserved.

const cacheName = "PDFViewerv2-2";
const resources = [
    '/PDFViewer/',
    '/PDFViewer/index.html',
    '/PDFViewer/Styles/mycss.css',
    '/PDFViewer/Styles/viewer.css',
    '/PDFViewer/Styles/darkTheme.css',
    '/PDFViewer/Styles/fonts.css',
    '/PDFViewer/Styles/sysTheme.css',
    '/PDFViewer/Scripts/timer.worker.js',
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
    '/PDFViewer/Others/4iCs6KVjbNBYlgoKcg72j00.woff2',
    '/PDFViewer/Others/4iCs6KVjbNBYlgoKcQ72j00.woff2',
    '/PDFViewer/Others/4iCs6KVjbNBYlgoKcw72j00.woff2',
    '/PDFViewer/Others/4iCs6KVjbNBYlgoKew72j00.woff2',
    '/PDFViewer/Others/4iCs6KVjbNBYlgoKfA72j00.woff2',
    '/PDFViewer/Others/4iCs6KVjbNBYlgoKfw72.woff2',
    '/PDFViewer/Others/manifest.json',
    '/PDFViewer/Others/Kibo(ISSmodule).pdf',
    '/PDFViewer/Others/ping.txt',
]

self.addEventListener("install", (ev) => {
    // console.log("Service Worker Installed");
    ev.waitUntil(
        Promise.resolve()
            .then(
                () => {
                    caches.open(cacheName).then(
                        (cache) => {
                            cache.addAll(resources);
                        }
                    )
                }
            )
    )
    self.skipWaiting();
})

self.addEventListener("activate", (e) => {
    e.waitUntil(
        Promise.resolve()
            .then(
                () => {
                    caches.keys().then((keyList) => {
                        return Promise.all(
                            keyList.map((key) => {
                                if (key === cacheName) {
                                    return;
                                }
                                return caches.delete(key);
                            }),
                        );
                    })
                }
            )

    );
})

self.addEventListener("fetch", (e) => {
    // console.log('Fetching Data');
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});
