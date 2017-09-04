import admin from 'firebase-admin'

let serviceAccount = require('../firebase-credentials.prod.json')

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

export default firebase
