import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd5haLj_9WLtaf-SIlcVxhT2InGWmiJ64",
  authDomain: "qfs-orderbook.firebaseapp.com",
  projectId: "qfs-orderbook",
  storageBucket: "qfs-orderbook.appspot.com",
  messagingSenderId: "876314874024",
  appId: "1:876314874024:web:57a7ef4cb27de039ebf29d",
  measurementId: "G-0X765RK139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);
