import firebase from 'firebase/app'
import { config } from './config'
import 'firebase/messaging'

firebase.initializeApp(config.firebaseConfig)
const messaging = firebase.messaging()

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })
