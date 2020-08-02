/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('periodic-bg-sync.js')
importScripts('notify.js')

const CACHE_STATIC_NAME = 'static-v3'
const CACHE_DYNAMIC_NAME = 'dynamic-v3'
// const STATIC_FILES = ['/index.html', '/idb.js', '/utility.js']

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME).then(function (cache) {
//       console.log('Pre-Caching Service worker files')
//       cache.addAll(STATIC_FILES)
//     })
//   )
// })

self.addEventListener('activate', (event) => {
  let cacheList = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME]

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.forEach((key) => {
          if (cacheList.indexOf(key) === -1) {
            console.log('[Service Worker] Removing old cache.', key)
            return caches.delete(key)
          }
        })
      )
    })
  )

  return self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      } else {
        return fetch(event.request).then(function (res) {
          return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
            cache.put(event.request.url, res.clone())
            return res
          })
        })
      }
    })
  )
})
