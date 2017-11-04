import admin from 'firebase-admin'

let serviceAccount
if (process.env.NODE_ENV === 'production') {
  serviceAccount = require('../firebase-credentials.prod.json')
} else {
  serviceAccount = require('../firebase-credentials.dev.json')
}

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

export default firebase
