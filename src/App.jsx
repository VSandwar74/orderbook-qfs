import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import TradingRoom from './TradingRoom'
// import SignIn from './SignIn'

import { initializeApp } from 'firebase/app';
// import * as firestore from 'firebase/firestore';
// import * as auth from 'firebase/auth';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore } from "firebase/firestore";

// import { doc, onSnapshot } from "firebase/firestore";
import { collection, doc, query, onSnapshot, addDoc, setDoc, FieldValue, serverTimestamp, where, limit, orderBy } from "firebase/firestore";


const app = initializeApp({
  apiKey: "AIzaSyBd5haLj_9WLtaf-SIlcVxhT2InGWmiJ64",
  authDomain: "qfs-orderbook.firebaseapp.com",
  projectId: "qfs-orderbook",
  storageBucket: "qfs-orderbook.appspot.com",
  messagingSenderId: "876314874024",
  appId: "1:876314874024:web:57a7ef4cb27de039ebf29d",
  measurementId: "G-0X765RK139"
})

// const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);


const SignIn = () => {

  function signInWithGoogle(auth) {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
  }

  return (
    <div>
      <button onClick={() => signInWithGoogle(auth)} >Sign in with Google!</button>
    </div>
  )
}


const Trade = (props) => {
  // const data = props
  // console.log(props.data)
  const {value, bidOrAsk, uid, timestamp}  = props.data;
  // const {value} = props.data

  return (
        <p className="text-3xl font-bold underline h-3 p-10">
          {value}, {bidOrAsk}, {uid} 
          {/* {props.data.bidOrAsk}, {props.data.uid}, {props.data.timestamp} */}
        </p>
  )
}

const TradingRoom = () => {

  const [value, setValue] = useState(0)
  const [bidOrAsk, setBidOrAsk] = useState('')
  const [bids, setBids] = useState([])
  const [asks, setAsks] = useState([])

  const name = auth.currentUser.displayName;
  const [cash, setCash] = useState(0)
  const [exposure, setExposure] = useState(0)

  useEffect(() => {
    async function createUser() {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: auth.currentUser.displayName,
        cash: 0,
        exposure: 0,
      })
    }
    createUser()
  }, [])
  
  const bidQuery = query(collection(db, "orders"), where('bidOrAsk', '==', 'bid'), orderBy('value', 'asc'));
  const unsubBids = onSnapshot(bidQuery, (querySnapshot) => {
    const trades = [];
    querySnapshot.forEach((doc) => {
        trades.push(doc.data());
    });
    setBids(trades)
  });
  
  const askQuery = query(collection(db, "orders"), where('bidOrAsk', '==', 'ask'), orderBy('value', 'desc'));
  const unsubAsks = onSnapshot(askQuery, (querySnapshot) => {
    const trades = [];
    querySnapshot.forEach((doc) => {
        trades.push(doc.data());
    });
    setAsks(trades)


  });


  async function sendTrade(e) {
    e.preventDefault()
    
    console.log('sent')

    const {uid} = auth.currentUser;

    await addDoc(collection(db, "orders"), {
      value,
      bidOrAsk,
      uid,
      timestamp: serverTimestamp(),
    });



    setValue(0)
    setBidOrAsk('')

  }

  return (
    <div className='flex flex-col justify-center'>
      <h2 className="flex flex-row justify-between">
        <p>{name}</p>
        <div>
          Cash: {cash}
          {"    "}
          Exposure: {exposure}
        </div>
      </h2>
      <h1>Welcome to QFS trading floor!</h1>
      <form onSubmit={sendTrade}>
        <input value={bidOrAsk} placeholder="Bid or Ask?" onChange={(e) => setBidOrAsk(e.target.value)} />
        <input value={value} placeholder="Value" onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div className='flex flex-row w-full'>
        <table className='justify-between'>
          <thead>
            <tr>
              <th>UserID</th>
              <th>Bid/Ask</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {bids && bids.map((order, i) => {
              return (
                <tr key={i}>
                  <td>{order.uid}</td>
                  <td>{order.bidOrAsk}</td>
                  <td>{order.value}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Value</th>
              <th>Bid/Ask</th>
              <th>UserID</th>
            </tr>
          </thead>
          <tbody>
            {asks && asks.map((order, i) => {
              return (
                <tr key={i}>
                  <td>{order.value}</td>
                  <td>{order.bidOrAsk}</td>
                  <td>{order.uid}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};


const App = () => {
  // const [count, setCount] = useState(0)
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <TradingRoom/> : <SignIn/> }
      {/* <h1>Hello world!</h1> */}
    </div>
  )
}

export default App
