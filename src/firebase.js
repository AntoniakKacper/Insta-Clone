import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDELrre56Ht_QoIjMrJx8C-MF1mtEMe7NI",
  authDomain: "instagram-clone-fc7b5.firebaseapp.com",
  projectId: "instagram-clone-fc7b5",
  storageBucket: "instagram-clone-fc7b5.appspot.com",
  messagingSenderId: "971706196570",
  appId: "1:971706196570:web:3f374a767b68d7881cee63",
  measurementId: "G-T0R02VPKKR",
});

const database = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { database, auth, storage };
