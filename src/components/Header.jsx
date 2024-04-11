import React from 'react'

import { useState, useEffect } from 'react'
import * as firebase from '../services/firebase';

import { doc, onSnapshot, setDoc, } from "firebase/firestore";

const Header = (props) => {
  const {auth, db} = firebase
  const { roomId, roomName } = props;

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

  return (
    <div className="flex flex-row justify-between w-full p-10">
        <div>
          <p className="text-white font-bold">
              {name}
          </p>
          <p className="text-white">
            Room Name: {roomName}   
          </p>   
        </div>
        <a href="http://quantfsnyu.com/" className="w-2/12 flex flex-col items-center justify-center">
          <img 
              className="w-full" 
              src="//images.squarespace-cdn.com/content/v1/54455593e4b026d1c3c6f497/1440969142293-6K3214PMOD4KKR42OWPQ/QFS+Original2.png?format=1500w" 
              alt="NYU Quantitative Finance Society"
              />
        </a>
        <h2 className="font-bold text-white">
          Cash: {cash}
          {"    "}
          Exposure: {exposure}
        </h2>
    </div>
  )
}

export default Header