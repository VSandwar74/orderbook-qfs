import './App.css'

import SignIn from './SignIn';
import TradingRoom from './TradingRoom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { initializeApp } from 'firebase/app';

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

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const db = getFirestore(app);


const App = () => {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <TradingRoom auth={auth} db={db}/> : <SignIn/> }
    </div>
  )
}

export default App
