// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5xE_cabTN_SwcmjTh7A0sdBKWlB0rL8w",
  authDomain: "studentsolutions-f6432.firebaseapp.com",
  projectId: "studentsolutions-f6432",
  storageBucket: "studentsolutions-f6432.appspot.com",
  messagingSenderId: "628367233663",
  appId: "1:628367233663:web:e7da586b9035b01a33254a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firebaseDB = getFirestore(app);
export const meetingsRef = collection(firebaseDB, "meetings");
