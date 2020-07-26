/* eslint-disable no-restricted-globals */

function syncContent() {
  console.log('sync triggered')
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'data-sync') {
    event.waitUntil(syncContent())
  }
})
