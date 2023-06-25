// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4MYrdJLeGFP3geo_gyA4a8VG1L60GyF4",
  authDomain: "ecommerce-24b5d.firebaseapp.com",
  projectId: "ecommerce-24b5d",
  storageBucket: "ecommerce-24b5d.appspot.com",
  messagingSenderId: "408041659659",
  appId: "1:408041659659:web:b78200ba1646c345d9160e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
