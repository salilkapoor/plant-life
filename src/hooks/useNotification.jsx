const useNotification = () => {
  function showNotification() {
    if ('serviceWorker' in navigator) {
      var options = {
        body: 'you have successfully subscribed to our notification service!',
        icon: '/logo192.png',
        image: '/logo192.png',
        dir: 'ltr',
        lang: 'en-US', //BCP 47
        vibrate: [100, 50, 200],
        badge: '/logo192.png',
        tag: 'confirm-notification',
        renotify: true,
        actions: [
          {
            action: 'confirm',
            title: 'Okay',
            icon: '/logo192.png'
          },
          {
            action: 'cancel',
            title: 'Reject',
            icon: '/logo192.png'
          }
        ]
      }
      navigator.serviceWorker.ready.then(function (swReg) {
        swReg.showNotification('Successfully subscribed', options)
      })
    }
  }

  function askForNotificationPermission() {
    Notification.requestPermission(function (result) {
      console.log(`User choice ${result}`)
      if (result !== 'granted') {
        console.log('No notification permission granted!')
      } else {
        showNotification()
      }
    })
  }
  return { askForNotificationPermission, showNotification }
}

export default useNotification
