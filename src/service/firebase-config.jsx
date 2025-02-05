// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtsh2HGXqBunW1kLgDWpkYSUb1TW7u9_M",
  authDomain: "gotrip-f0750.firebaseapp.com",
  projectId: "gotrip-f0750",
  storageBucket: "gotrip-f0750.firebasestorage.app",
  messagingSenderId: "949135850357",
  appId: "1:949135850357:web:325fe8a458c16fa1e9713c",
  measurementId: "G-K05VFLM7TD"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db =getFirestore(app);

//const analytics = getAnalytics(app);