// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjwHtNuazuzvO7qb1dY4wd05ZSng2shr8",
  authDomain: "netflix-clone-60483.firebaseapp.com",
  projectId: "netflix-clone-60483",
  storageBucket: "netflix-clone-60483.appspot.com",
  messagingSenderId: "860756042064",
  appId: "1:860756042064:web:1a045ef1514c91b8f04c55",
  measurementId: "G-TZK4WS7B2T"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth }