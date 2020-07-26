/* eslint-disable no-restricted-globals */

self.addEventListener('notificationclick', function (event) {
  var notification = event.notification
  var action = event.action

  console.log(notification)

  if (action === 'confirm') {
    console.log('Confirm was chosen')
    notification.close()
  } else {
    console.log(action)
    // event.waitUntil(
    //   clients.matchAll().then(function (clis) {
    //     var client = clis.find(function (c) {
    //       return c.visibilityState === 'visible'
    //     })

    //     if (client !== undefined) {
    //       client.navigate(notification.data.url)
    //       client.focus()
    //     } else {
    //       clients.openWindow(notification.data.url)
    //     }
    //     notification.close()
    //   })
    // )
  }
})

self.addEventListener('notificationclose', function (event) {
  console.log('Notification was closed', event)
})

self.addEventListener('push', function (event) {
  console.log('Push Notification received', event)

  var data = { title: 'New!', content: 'Something new happened!', openUrl: '/' }

  if (event.data) {
    data = JSON.parse(event.data.text())
  }

  var options = {
    body: data.content,
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: {
      url: data.openUrl
    }
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})
