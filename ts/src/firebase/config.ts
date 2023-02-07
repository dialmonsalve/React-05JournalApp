// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM8slBqsdNZVKVi7p2euUjoRp6DCfhcQI",
  authDomain: "react-journal-ts.firebaseapp.com",
  projectId: "react-journal-ts",
  storageBucket: "react-journal-ts.appspot.com",
  messagingSenderId: "1009775309447",
  appId: "1:1009775309447:web:ad114014a5365b06ed7e22"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )