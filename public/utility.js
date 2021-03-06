const dbPromise = async (t) =>
  await idb.open('plants-life-store', 1, (e) => {
    e.objectStoreNames.contains(t) || e.createObjectStore(t, { keyPath: 'id' })
  })
async function getFromIDB(t) {
  return (await dbPromise()).transaction(t, 'readonly').objectStore(t).getAll()
}
async function addToIDB(t, e) {
  const o = (await dbPromise()).transaction(t, 'readwrite')
  return o.objectStore(t).put(e), o.complete
}
async function deleteFromIDB(t, e) {
  const o = (await dbPromise()).transaction(t, 'readwrite')
  return o.objectStore(t).delete(e), o.complete
}
async function deleteAllFromIDB(t) {
  const e = (await dbPromise()).transaction(t, 'readwrite')
  return e.objectStore(t).clear(), e.complete
}
