// Service Worker para PWA
// Sitio web profesional de María Fabiola Calvillo Rocha - Contadora Pública

const CACHE_NAME = 'contadora-fabiola-v1.0.0';
const urlsToCache = [
    '/contadora-publica/',
    '/contadora-publica/index.html',
    '/contadora-publica/styles.css',
    '/contadora-publica/script.js',
    '/contadora-publica/images/fabiola-calvillo.jpeg',
    '/contadora-publica/privacy-policy.html',
    '/contadora-publica/servicios/pymes.html',
    '/contadora-publica/calculadoras/isr.html',
    '/contadora-publica/recursos/guias.html',
    '/contadora-publica/citas/agendar.html',
    '/contadora-publica/site.webmanifest',
    '/contadora-publica/favicon.svg',
    // CDN resources
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('📦 Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📥 Service Worker: Cacheando archivos');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Service Worker: Instalación completada');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker: Error en instalación', error);
            })
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: Limpiando cache antiguo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker: Activación completada');
            return self.clients.claim();
        })
    );
});

// Interceptar requests
self.addEventListener('fetch', event => {
    // Solo cachear requests GET
    if (event.request.method !== 'GET') {
        return;
    }

    // Ignorar requests de Chrome Extensions
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    // Ignorar requests de Analytics y tracking
    if (event.request.url.includes('google-analytics.com') || 
        event.request.url.includes('googletagmanager.com') ||
        event.request.url.includes('formspree.io')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en cache, devolverlo
                if (response) {
                    return response;
                }

                // Si no está en cache, hacer fetch
                return fetch(event.request)
                    .then(response => {
                        // Verificar si es una respuesta válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar la respuesta
                        const responseToCache = response.clone();

                        // Agregar al cache si es un recurso de nuestro sitio
                        if (event.request.url.startsWith(self.location.origin)) {
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                        }

                        return response;
                    })
                    .catch(error => {
                        console.log('🔄 Service Worker: Modo offline, sirviendo desde cache');
                        
                        // Si es una página, servir index.html como fallback
                        if (event.request.destination === 'document') {
                            return caches.match('/contadora-publica/index.html');
                        }
                        
                        // Para otros recursos, mostrar error
                        throw error;
                    });
            })
    );
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Notificación de actualización disponible
self.addEventListener('updatefound', () => {
    console.log('🔄 Service Worker: Nueva versión disponible');
});

// Manejar errores
self.addEventListener('error', event => {
    console.error('❌ Service Worker: Error', event.error);
});

// Background sync para formularios offline
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form-sync') {
        console.log('🔄 Service Worker: Sincronizando formulario de contacto');
        event.waitUntil(syncContactForm());
    }
});

// Función para sincronizar formulario cuando vuelva la conexión
async function syncContactForm() {
    try {
        // Recuperar datos del formulario desde IndexedDB
        const db = await openDB();
        const transaction = db.transaction(['pendingForms'], 'readonly');
        const store = transaction.objectStore('pendingForms');
        const pendingForms = await store.getAll();

        for (const form of pendingForms) {
            try {
                // Intentar enviar el formulario
                const response = await fetch(form.url, {
                    method: 'POST',
                    body: form.data,
                    headers: form.headers
                });

                if (response.ok) {
                    // Si se envió correctamente, eliminar de la cola
                    const deleteTransaction = db.transaction(['pendingForms'], 'readwrite');
                    const deleteStore = deleteTransaction.objectStore('pendingForms');
                    await deleteStore.delete(form.id);
                    
                    // Notificar al cliente que se envió
                    self.clients.matchAll().then(clients => {
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'FORM_SENT_OFFLINE',
                                success: true
                            });
                        });
                    });
                }
            } catch (error) {
                console.error('Error enviando formulario offline:', error);
            }
        }
    } catch (error) {
        console.error('Error en sync de formularios:', error);
    }
}

// Función auxiliar para abrir IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ContadoraFabiolaDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pendingForms')) {
                db.createObjectStore('pendingForms', { keyPath: 'id' });
            }
        };
    });
}

console.log('✅ Service Worker cargado - Sitio de María Fabiola Calvillo Rocha');
console.log('📍 Contadora Pública en León, Guanajuato');
console.log('📞 Tel y WhatsApp: 477 498 0061');
