/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDHzEzAnkEgpR9ywar9PWEaazKlBpqWz7w',
  authDomain: 'plant-monitoring-a90ac.firebaseapp.com',
  databaseURL: 'https://plant-monitoring-a90ac.firebaseio.com',
  projectId: 'plant-monitoring-a90ac',
  storageBucket: 'plant-monitoring-a90ac.appspot.com',
  messagingSenderId: '1090079560968',
  appId: '1:1090079560968:web:03781984ff585b8a77c8bd',
  measurementId: 'G-CXW74JGLLY'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  }
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', (event) => {
  console.log(event)
  return event
})
