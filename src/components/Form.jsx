import React from 'react'
import { useState } from 'react'
import { collection, doc, query, addDoc, getDocs, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";
import * as firebase from '../services/firebase';


const Form = (props) => {    

    const { auth, db } = firebase
    const { bids, roomId } = props

    const [value, setValue] = useState(0)
    const [bidOrAsk, setBidOrAsk] = useState('bid')

    async function postTrade() {
      await addDoc(collection(db, "rooms", roomId, "orders"), {
        value: Number(value),
        bidOrAsk,
        uid: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        name: auth.currentUser.displayName,
      });
    }

    async function marketOrder(isBid) {
      setValue((isBid) ? (1e10) : (0))
      setBidOrAsk((isBid) ? ('bid') : ('ask'))
      // sendTrade()
    }

    async function updateParties(counterParty, resting, isBid, ref, name) {

      const otherRef = doc(db, "rooms", roomId ,"users", counterParty);
      const selfRef = doc(db, "rooms", roomId, "users", auth.currentUser.uid);

      await updateDoc(otherRef, {
        cash: increment((!isBid ? -resting : resting)),
        exposure: increment((!isBid ? 1 : -1))
      });
      await updateDoc(selfRef, {
        cash: increment((isBid ? -resting : resting)),
        exposure: increment((isBid ? 1 : -1))
      });
      await addDoc(collection(db, "rooms", roomId, "ledger"), {
        buyer: (isBid ? auth.currentUser.displayName : name),
        seller: (isBid ? name : auth.currentUser.displayName),
        amount: resting,
        timestamp: serverTimestamp(),
      });
      await deleteDoc(ref)

    }

    async function sendTrade(e) {
        
      e.preventDefault()

      const isBid = bidOrAsk == 'bid';

      const onesideds = bids.filter(item => item.bidOrAsk === (isBid ? 'ask' : 'bid'));
      const index = (isBid ? 0 : onesideds.length-1)
      const bestOffer = onesideds[index];

      (onesideds.length != 0) ?
      (
        ((isBid && value >= bestOffer.value) || !isBid && value <= bestOffer.value) ?
          (updateParties(bestOffer.uid, bestOffer.value, isBid, bestOffer.ref, bestOffer.name)) :
          (postTrade())
      ) : 
      (
        postTrade()
      )
      
      setValue(0)
      setBidOrAsk('bid')
    }

  return (
    <form onSubmit={sendTrade} className="flex flex-row w-full justify-around p-10">
        <div>
          <select 
            className="text-center bg-white p-1 px-12 rounded-full"
            id="dropdown" 
            value={bidOrAsk} 
            onChange={(e) => setBidOrAsk(e.target.value)}>
            <option className="text-center" value="bid">Bid</option>
            <option value="ask">Ask</option>
          </select>
        </div>
        <input 
            className="outline-4 rounded-full text-center"
            type='number'
            value={value} 
            placeholder="Value" 
            step="1"
            onChange={(e) => setValue(e.target.value)} />
        <button 
            className="text-center bg-white p-1 px-10 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer"
            type="submit"
        >
            Submit
        </button>
        <button 
            className="text-center bg-white p-1 px-10 rounded-full hover:bg-green-500 hover:text-white cursor-pointer"
            type="submit"
            onClick={() => marketOrder(true)}
        >
            Buy
        </button>
        <button 
            className="text-center bg-white p-1 px-10 rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
            type="submit"
            onClick={() => marketOrder(false)}
        >
            Sell
        </button>
    </form>
  )
}

export default Form
