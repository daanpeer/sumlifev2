// import firebase from 'firebase'
import admin from 'firebase-admin'

let serviceAccount
if (process.env.RUN_ENV === 'local') {
  serviceAccount = require('../firebase-credentials.local.json')
} else {
  serviceAccount = require('../firebase-credentials.prod.json')
}

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

export default firebase
