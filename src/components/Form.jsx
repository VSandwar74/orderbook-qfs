import React from 'react'
import { useState } from 'react'
import { collection, doc, query, addDoc, getDocs, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";



const Form = (props) => {    

    const { auth, db, bids, refs } = props

    const [value, setValue] = useState(0)
    const [bidOrAsk, setBidOrAsk] = useState('')
    // const [resting, setResting] = useState(0)
    // const bids = trades.map(trades => trades[0/]);
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

    async function sendTrade(e) {
        
      e.preventDefault()
      
      
      const isBid = bidOrAsk == 'bid';

      const onesideds = bids.filter(item => item.bidOrAsk === (isBid ? 'ask' : 'bid'));
      const index = (isBid ? 0 : onesideds.length-1)
      const bestOffer = onesideds[index].value

      // const docRef = trades[bids.indexOf(onesideds[index])][1]
      const docRef = refs[bids.indexOf(onesideds[index])]
      console.log(docRef);
      
      // console.log(bids)
      (onesideds.length != 0) ?
      (
        // console.log(bestOffer)
        ((isBid && bestOffer && value >= bestOffer) || !isBid && bestOffer && value <= bestOffer) ?
          (updateParties(onesideds[index].uid, bestOffer, isBid, docRef)) :
          (postTrade())
      ) : 
      (
        postTrade()
      )
      console.log(onesideds[index].value);
      // const q = query(collection(db, "orders"), where("bidOrAsk", "==", ((isBid) ? "ask" : "bid")), orderBy('value', ((isBid) ? "asc" : "desc")), limit(1));
      // const querySnapshot = await getDocs(q);
      // if (querySnapshot.docs.length != 0) {

      //   querySnapshot.forEach((doc) => {
      //     ((isBid && doc.data().value && value >= doc.data().value) || !isBid && doc.data().value && value <= doc.data().value) ?
      //     (updateParties(doc.data().uid, doc.data().value, isBid, doc.ref)) :
      //     (postTrade())

      //   });

      // } else {
      //   postTrade()
      // }
      
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