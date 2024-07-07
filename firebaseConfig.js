// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa3o_RZa5LmUFnLF9rxxJ2seML2q2mLGk",
  authDomain: "bingo-97c68.firebaseapp.com",
  projectId: "bingo-97c68",
  storageBucket: "bingo-97c68.appspot.com",
  messagingSenderId: "909922620760",
  appId: "1:909922620760:web:9d0afd564113dd0507c12d",
  measurementId: "G-9Y7QXC7T16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};