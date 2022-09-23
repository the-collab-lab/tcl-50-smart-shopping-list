import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCERgBh41hXxMWDLveJnjLQA-pjUm3l-Sc",
  authDomain: "tcl-50-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-50-smart-shopping-list",
  storageBucket: "tcl-50-smart-shopping-list.appspot.com",
  messagingSenderId: "924558650384",
  appId: "1:924558650384:web:388d05a352ee2cf11c2e95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
