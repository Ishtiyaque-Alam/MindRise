// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCSfyrOydFQwEg_ISIcS6F_v8gSd3eVrlk",
  authDomain: "mindrise-82bb1.firebaseapp.com",
  projectId: "mindrise-82bb1",
  storageBucket: "mindrise-82bb1.firebasestorage.app",
  messagingSenderId: "446212661254",
  appId: "1:446212661254:web:0d4be05008735a1e4ee387",
  measurementId: "G-F1W0ME1K7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);

