// import firebase from 'firebase'
import admin from 'firebase-admin'
import serviceAccount from '../firebase-credentials.json'

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

export default firebase
