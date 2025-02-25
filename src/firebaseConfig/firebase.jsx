// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBewq-bhd3uc6GN6aFFavXtFfDmYJ6_o2c",
  authDomain: "rural-response.firebaseapp.com",
  projectId: "rural-response",
  storageBucket: "rural-response.appspot.com",
  messagingSenderId: "856419634689",
  appId: "1:856419634689:web:03ba4ead7311ce4f02fa00",
  measurementId: "G-C01D2SEEGN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

