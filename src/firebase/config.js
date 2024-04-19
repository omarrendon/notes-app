// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA18w8nMP_vwVM5NTfvTlG40XlE87no5K8",
  authDomain: "react-journal-app-88146.firebaseapp.com",
  projectId: "react-journal-app-88146",
  storageBucket: "react-journal-app-88146.appspot.com",
  messagingSenderId: "117670634397",
  appId: "1:117670634397:web:a182826e3d5dbc33e24574",
};
AuthCredential;
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
