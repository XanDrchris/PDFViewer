self.addEventListener('install', event => {

})
const cacheName = 'PDFViewer-v1.0.0';
const resourcesToPreCache = [
    '/PDFViewer/',
    '/PDFViewer/index.html',
    '/PDFViewer/Styles/mycss.css',
    '/PDFViewer/Styles/viewer.css'
]