import React from 'react'
import { useState } from 'react'
import { collection, doc, query, addDoc, getDocs, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";



const Form = (props) => {    

    const { auth, db } = props

    const [value, setValue] = useState(0)
    const [bidOrAsk, setBidOrAsk] = useState('')
    const [resting, setResting] = useState(0)
    const [counterParty, setCounterParty] = useState('')

    async function postTrade() {
      await addDoc(collection(db, "orders"), {
        value: Number(value),
        bidOrAsk,
        uid: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        name: auth.currentUser.displayName,
      });
    }

    async function sendTrade(e) {
        e.preventDefault()
        
        console.log('sent')
    
        const isBid = bidOrAsk == 'bid';
    
        async function updateCounter(counterParty, resting, isBid) {

          await updateDoc(doc(db, "users", counterParty), {
            cash: increment((isBid ? -resting : resting)),
            exposure: increment((isBid ? 1 : -1))
          });
        }
    
        async function updateSelf(resting, isBid) {

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            cash: increment((isBid ? -resting : resting)),
            exposure: increment((isBid ? 1 : -1))
          });
        }
    
    
        const q = query(collection(db, "orders"), where("bidOrAsk", "==", ((isBid) ? "ask" : "bid")), orderBy('value', ((isBid) ? "asc" : "desc")), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
      
            setCounterParty(doc.data().uid)
            setResting(doc.data().value)
      
            console.log(doc.data().value)

            if (isBid) {
              if (doc.data().value && value >= doc.data().value) {
                updateCounter(counterParty, resting, !isBid)
                updateSelf(resting, isBid)
                deleteDoc(doc.ref)
              } else {
                postTrade()
              }
            } else {
              if (doc.data().value && value <= doc.data().value) {
                updateCounter(counterParty, resting, !isBid)
                updateSelf(resting, isBid)
                deleteDoc(doc.ref)
              } else {
                postTrade()
              }
            }
          });
        } else {
          postTrade()
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