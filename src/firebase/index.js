// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwCWyMn83-txxVDjyOMCAsm92jt3bE8a4",
  authDomain: "x-clone-dda4b.firebaseapp.com",
  projectId: "x-clone-dda4b",
  storageBucket: "x-clone-dda4b.appspot.com",
  messagingSenderId: "387301553526",
  appId: "1:387301553526:web:8fe524eebbeb07b3267657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//kimlik doğrulama yapısının referansını al 
export const auth = getAuth(app);

//google provider kurulumu
export const provider = new GoogleAuthProvider();

//veri tabanı referansını alma 
export const db = getFirestore(app);

//storage'n  referansını alma 
export const storage = getStorage(app);