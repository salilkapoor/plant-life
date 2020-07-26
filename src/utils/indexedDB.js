import { openDB } from 'idb'

export const openIDB = async (tableName) =>
  await openDB('plants-life-store', 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion !== newVersion) {
        if (!db.objectStoreNames.contains(tableName)) {
          db.createObjectStore(tableName, {
            keyPath: 'id'
          })
        }
        console.log('upgrade required')
      }
    }
  })

let dbPromise = openIDB()

export async function getFromIDB(tableName) {
  const db = await dbPromise
  const tx = db.transaction(tableName, 'readonly')
  const store = tx.objectStore(tableName)
  return store.getAll()
}

export async function addToIDB(st, data) {
  const db = await dbPromise
  const tx = db.transaction(st, 'readwrite')
  const store = tx.objectStore(st)
  store.put(data)
  return tx.complete
}

export async function deleteFromIDB(st, id) {
  const db = await dbPromise
  const tx = db.transaction(st, 'readwrite')
  const store = tx.objectStore(st)
  store.delete(id)
  return tx.complete
}

export async function deleteAllFromIDB(st) {
  const db = await dbPromise
  const tx = db.transaction(st, 'readwrite')
  const store = tx.objectStore(st)
  store.clear()
  return tx.complete
}
