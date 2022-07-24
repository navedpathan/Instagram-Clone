// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr8iHRo2t4OB3GiTCT7MuiY525bqix3xw",
  authDomain: "insta-nxtapp.firebaseapp.com",
  projectId: "insta-nxtapp",
  storageBucket: "insta-nxtapp.appspot.com",
  messagingSenderId: "396491575533",
  appId: "1:396491575533:web:490df24e0df732b5117ce4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };