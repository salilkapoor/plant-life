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
        swReg.showNotification(
          'You have successfully subscribed to notifications',
          options
        )
      })
    }
  }

  function askForNotificationPermission() {
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status
        }
      })
    }
  }

  function displayNotification(message) {
    if (Notification.permission === 'granted') {
      new Notification('Hello....!')
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification(message)
      })
    }
  }

  return { askForNotificationPermission, showNotification, displayNotification }
}

export default useNotification
