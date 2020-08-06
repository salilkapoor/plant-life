export function registerWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(function () {
        console.log('Service worker is registered!')
      })
      .catch(function (err) {
        console.log('Error faced while registering service worker', err)
      })
  }
}
