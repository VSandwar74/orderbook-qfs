import React from 'react'

import { useState, useEffect } from 'react'
import * as firebase from '../services/firebase';

import { doc, onSnapshot, setDoc, } from "firebase/firestore";

const Header = (props) => {
  const {auth, db} = firebase
  const { roomId, roomName, canTrade, setCanTrade, setRoomDoc } = props;

  const name = auth.currentUser.displayName;
  const [cash, setCash] = useState(0)
  const [exposure, setExposure] = useState(0)

  useEffect(() => {
    console.log(roomId)
    async function createUser() {
      await setDoc(doc(db, "rooms", roomId, "users", auth.currentUser.uid), {
        name: auth.currentUser.displayName,
        cash: 0,
        exposure: 0,
      })
    }
    createUser()
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "rooms", roomId, "users", auth.currentUser.uid), { includeMetadataChanges: true }, (doc) => {
      setCash(doc.data().cash);
      setExposure(doc.data().exposure);
    });
    
    return () => unsubscribe();
  }, []);  

  useEffect(() => {
    // console.log(canTrade)
  }, [canTrade])

  return (
    <div className="flex flex-row justify-between w-full p-10">
        <div>
          <p className="text-white font-bold">
              {name}
          </p>
          <p className="text-white">
            Room Name: {roomName}   
          </p>   
          <button
              onClick={() => setRoomDoc('')} 
              className="flex flex-row text-black text-center items-center bg-white rounded-[20px] p-4 py-2 hover:bg-blue-500 hover:text-white"
            >
              <p className=""> 
                Return
              </p>    
          </button>
        </div>
        <a href="http://quantfsnyu.com/" className="w-2/12 flex flex-col items-center justify-center">
          <img 
              className="w-full" 
              src="//images.squarespace-cdn.com/content/v1/54455593e4b026d1c3c6f497/1440969142293-6K3214PMOD4KKR42OWPQ/QFS+Original2.png?format=1500w" 
              alt="NYU Quantitative Finance Society"
              />
        </a>
        <div className='flex flex-col items-center'>
          <h2 className="font-bold text-white">
            Cash: {cash}
            {"    "}
            Exposure: {exposure}
          </h2>
              {canTrade ? 
                <button
                onClick={() => setCanTrade(false)} 
                className="flex flex-row text-black text-center items-center bg-white rounded-[20px] p-4 py-2 hover:bg-red-500 hover:text-white"
              >
                <p className="">Stop Trading</p> 
              </button>
              : 
              <button
                onClick={() => setCanTrade(true)} 
                className="flex flex-row text-black text-center items-center bg-white rounded-[20px] p-4 py-2 hover:bg-green-500 hover:text-white"
              >
                <p className="">Start Trading</p> 
              </button>
              } 
        </div>
    </div>
  )
}

export default Header