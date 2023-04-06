import React from 'react'

import { useState } from 'react'
import './App.css'

import { collection, doc, query, onSnapshot, addDoc, setDoc, getDocs, FieldValue, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";



const Form = (props) => {    

    const { auth, db } = props

    const [value, setValue] = useState(0)
    const [bidOrAsk, setBidOrAsk] = useState('')
    const [resting, setResting] = useState(0)
    const [add, setAdd] = useState(true)
    const [counterParty, setCounterParty] = useState('')

    async function sendTrade(e) {
        e.preventDefault()
        setAdd(true)
        
        console.log('sent')
    
        const {uid} = auth.currentUser;
        const isBid = bidOrAsk == 'bid';
    
        async function updateCounter(counterParty, resting, isBid) {
          const counterPartyRef = doc(db, "users", counterParty);
          await updateDoc(counterPartyRef, {
            cash: increment((isBid ? -resting : resting)),
            exposure: increment((isBid ? 1 : -1))
          });
        }
    
        async function updateSelf(resting, isBid) {
          const selfRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(selfRef, {
            cash: increment((isBid ? -resting : resting)),
            exposure: increment((isBid ? 1 : -1))
          });
        }
    
    
        const q = query(collection(db, "orders"), where("bidOrAsk", "==", ((isBid) ? "ask" : "bid")), orderBy('value', ((isBid) ? "desc" : "asc")), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
    
          setCounterParty(doc.data().uid)
          setResting(doc.data().value)
    
    
          console.log(resting)
          if (isBid) {
            if (value > resting) {
              updateCounter(counterParty, resting, !isBid)
              updateSelf(resting, isBid)
              deleteDoc(doc.ref)
              // doc.ref.delete()
              setAdd(false)
            } 
          } else {
            if (value < resting) {
              updateCounter(counterParty, resting, isBid)
              updateSelf(resting, isBid)
              deleteDoc(doc.ref)
              // doc.ref.delete()
              setAdd(false)
            }
          }
        });
        console.log(add)
        if (add) {
          await addDoc(collection(db, "orders"), {
            value: Number(value),
            bidOrAsk,
            uid,
            timestamp: serverTimestamp(),
            name: auth.currentUser.displayName,
          });
        }
        setValue(0)
        setBidOrAsk('')
      }

  return (
    <form onSubmit={sendTrade} className="flex flex-row w-full justify-around p-10">
        <input 
            className="outline-4 rounded-full text-center"
            value={bidOrAsk} 
            placeholder="Bid or Ask?" 
            onChange={(e) => setBidOrAsk(e.target.value)} 
        />
        <input 
            className="outline-4 rounded-full text-center"
            type='number'
            value={value} 
            placeholder="Value" 
            onChange={(e) => setValue(e.target.value)} />
        <button 
            className="text-center bg-white p-1 px-10 rounded-full"
            type="submit"
        >
            Submit
        </button>
    </form>
  )
}

export default Form