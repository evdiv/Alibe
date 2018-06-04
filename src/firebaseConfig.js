import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyAi0HcRsEz8fU6wgBfB6_y72q1l7zBkSmE',
  authDomain: 'alibe-dbfa8.firebaseapp.com',
  databaseURL: 'https://alibe-dbfa8.firebaseio.com',
  projectId: 'alibe-dbfa8',
  storageBucket: 'alibe-dbfa8.appspot.com',
  messagingSenderId: '228808727323'
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
