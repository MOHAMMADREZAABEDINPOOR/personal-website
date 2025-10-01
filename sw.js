// Service Worker for Resume Website
// Version: 1.0.0

const CACHE_NAME = 'resume-site-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/manifest.json',
  '/assets/images/profile.jpg',
  '/assets/images/project1.jpg',
  '/assets/images/project2.jpg',
  '/assets/images/project3.jpg',
  '/assets/images/favicon.ico',
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Network request failed', error);
            
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Return a generic offline response for other requests
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(
      // Handle offline form submissions here
      handleOfflineFormSubmissions()
    );
  }
});

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/images/icon-192x192.png',
      badge: '/assets/images/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'مشاهده',
          icon: '/assets/images/icon-96x96.png'
        },
        {
          action: 'close',
          title: 'بستن',
          icon: '/assets/images/icon-96x96.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Utility function for handling offline form submissions
async function handleOfflineFormSubmissions() {
  try {
    // Get stored form data from IndexedDB or localStorage
    const formData = await getStoredFormData();
    
    if (formData && formData.length > 0) {
      for (const data of formData) {
        try {
          // Attempt to submit the form data
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            // Remove successfully submitted data
            await removeStoredFormData(data.id);
            console.log('Service Worker: Form submission successful', data.id);
          }
        } catch (error) {
          console.error('Service Worker: Form submission failed', error);
        }
      }
    }
  } catch (error) {
    console.error('Service Worker: Error handling offline submissions', error);
  }
}

// Helper functions for form data management
async function getStoredFormData() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removeStoredFormData(id) {
  // This would typically use IndexedDB
  // For now, just log
  console.log('Service Worker: Removing form data', id);
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log slow requests
        if (duration > 1000) {
          console.warn(`Service Worker: Slow request detected: ${event.request.url} took ${duration}ms`);
        }
        
        return response;
      })
  );
});

console.log('Service Worker: Script loaded successfully');
