/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const CACHE_STATIC_NAME = 'static-v2'
const CACHE_DYNAMIC_NAME = 'dynamic-v2'
const STATIC_FILES = [
  '/index.html',
  '/idb.js',
  '/utility.js',
  '/signin',
  '/overview'
]

importScripts('periodic-bg-sync.js')
importScripts('notify.js')

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function (cache) {
      console.log('Pre-Caching Service worker files')
      cache.addAll(STATIC_FILES)
    })
  )
})

self.addEventListener('activate', function (event) {
  let cacheList = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME]

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
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
