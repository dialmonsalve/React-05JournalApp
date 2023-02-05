// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIn2qtphpbOUvhuB5XaykYh5JekKXJc1s",
  authDomain: "react-journal-d64b9.firebaseapp.com",
  projectId: "react-journal-d64b9",
  storageBucket: "react-journal-d64b9.appspot.com",
  messagingSenderId: "320819824110",
  appId: "1:320819824110:web:d044e62deb4ea872883aff"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);