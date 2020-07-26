/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

importScripts('idb.js')
importScripts('utility.js')

async function syncContent() {
  console.log('sync triggered')
  await dbPromise('plants-essentials')
  //   addToIDB('plants-essentials', {
  //     id: 2,
  //     mositure: '10mm',
  //     temp: '10c',
  //     humidity: '80%'
  //   })
  //   console.log(await getFromIDB('plants-essentials'))
  //   deleteAllFromIDB('plants-essentials')
  //   deleteFromIDB('plants-essentials', 3)
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'data-sync') {
    event.waitUntil(syncContent())
  }
})
