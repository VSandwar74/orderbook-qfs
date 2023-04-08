import React from 'react'

import { useState, useEffect } from 'react'


import { doc, onSnapshot, setDoc, } from "firebase/firestore";

const Header = (props) => {
  const {auth, db} = props

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

  const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), { includeMetadataChanges: true }, (doc) => {
    // console.log(doc.data())
    setCash(doc.data().cash)
    setExposure(doc.data().exposure)
  });

  return (
    <div className="flex flex-row justify-between w-full p-10">
        <p className="text-white">
            {name}
        </p>
        <img 
            className="w-2/12" 
            src="//images.squarespace-cdn.com/content/v1/54455593e4b026d1c3c6f497/1440969142293-6K3214PMOD4KKR42OWPQ/QFS+Original2.png?format=1500w" 
            alt="NYU Quantitative Finance Society"/>
        <h2 className="text-white">
          Cash: {cash}
          {"    "}
          Exposure: {exposure}
        </h2>
    </div>
  )
}

export default Header