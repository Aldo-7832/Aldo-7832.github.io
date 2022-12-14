const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

const cleanCache = (cacheName, maxSize) => {
    caches.open(cacheName).then((cache) => {
        cache.keys().then((items) => {
            console.log("ITEMS ", items.length);
            if (items.length >= maxSize)
            {
                //Eliminamos el registro mas antigüo
                cache.delete(items[0]).then(() => {
                    cleanCache(cacheName, maxSize);
                });
            }
        })
    })
}

self.addEventListener('install',(event) =>{
    console.log('SW Instalado');
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) =>{
        return cache.addAll(
            [
                '/',
                '/index.html',
                '/js/app.js',
                '/js/main.js',
                '/manifest.json',
                '/lib/animate/animate.css',
                '/lib/animate/animate.min.css',
                '/lib/easing/easing.min.js',
                '/lib/easing/easing.js',
                '/lib/owlcarousel/owl.carousel.min.js',
                '/lib/owlcarousel/owl.carousel.js',
                '/lib/owlcarousel/assets/ajax-loader.gif',
                '/lib/owlcarousel/assets/owl.carousel.css',
                '/lib/owlcarousel/assets/owl.carousel.min.css',
                '/lib/owlcarousel/assets/owl.theme.default.css',
                '/lib/owlcarousel/assets/owl.theme.default.min.css',
                '/lib/owlcarousel/assets/owl.theme.green.css',
                '/lib/owlcarousel/assets/owl.theme.green.min.css',
                '/lib/owlcarousel/assets/owl.video.play.png',
                '/lib/waypoints/waypoints.min.js',
                '/lib/wow/wow.min.js',
                '/lib/wow/wow.js',
                '/css/bootstrap.min.css',
                '/css/style.css',
                '/css/style_login.css',
                '/img/favicon.ico',
                '/views/lib/owlcarousel/owl.carousel.min.js',
                '/views/img/favicon.ico',
                '/js/main.js',
                '/views/css/bootstrap.min.css',
                '/views/css/style.css',
                '/img/bg-icon.png'
            ]
        );
    });

    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) =>{
        return cache.addAll(
            [
                'https://code.jquery.com/jquery-3.4.1.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Lora:wght@600;700&display=swap',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css'
            ]
        )
    });
    event.waitUntil(Promise.all([respCache, respCacheInmutable]));
});



self.addEventListener('fetch', (event) =>{
    const resp = caches.match(event.request).then((resp) =>{
        if(resp){
            return resp;
        }
        return fetch(event.request).then((respWeb) =>{
            caches.open(DYNAMIC_CACHE_NAME).then((cacheDinamico) => {
                cacheDinamico.put(event.request, respWeb);
            })
            return respWeb.clone();
        });
    });

    event.respondWith(resp);

});
