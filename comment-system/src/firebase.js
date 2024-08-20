
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAB3qsB05BVg8rM4AjB7TM4VcTus6YB9pk",
    authDomain: "comment-section-e80db.firebaseapp.com",
    projectId: "comment-section-e80db",
    storageBucket: "comment-section-e80db.appspot.com",
    messagingSenderId: "557659829919",
    appId: "1:557659829919:web:e7837e9add68d75b0b54aa"
  };

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, firestore, storage, googleProvider, firebase };
