import React from 'react'
import { useState } from 'react'
import { collection, doc, query, addDoc, getDocs, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";



const Form = (props) => {    

    const { auth, db } = props

    const [value, setValue] = useState(0)
    const [bidOrAsk, setBidOrAsk] = useState('')
    // const [resting, setResting] = useState(0)
    // const [counterParty, setCounterParty] = useState('')

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
        
        
        const isBid = bidOrAsk == 'bid';
        
        async function updateParties(counterParty, resting, isBid, ref) {

          const otherRef = doc(db, "users", counterParty);
          const selfRef = doc(db, "users", auth.currentUser.uid);

          await updateDoc(otherRef, {
            cash: increment((!isBid ? -resting : resting)),
            exposure: increment((!isBid ? 1 : -1))
          });
          await updateDoc(selfRef, {
            cash: increment((isBid ? -resting : resting)),
            exposure: increment((isBid ? 1 : -1))
          });
          await deleteDoc(ref)

        }
        
        const q = query(collection(db, "orders"), where("bidOrAsk", "==", ((isBid) ? "ask" : "bid")), orderBy('value', ((isBid) ? "asc" : "desc")), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length != 0) {
          querySnapshot.forEach((doc) => {

            
            (isBid) ?
            ((doc.data().value && value >= doc.data().value) ?
            updateParties(doc.data().uid, doc.data().value, isBid, doc.ref) :
            postTrade()
            ) : (
              ((doc.data().value && value <= doc.data().value)) ?
              updateParties(doc.data().uid, doc.data().value, isBid, doc.ref) : 
              postTrade()
              )
              console.log(doc.data().value)
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
            className="text-center bg-white p-1 px-10 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer"
            type="submit"
        >
            Submit
        </button>
    </form>
  )
}

export default Form