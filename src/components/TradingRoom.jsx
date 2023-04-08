import React from 'react'

import Header from './Header';
import Title from './Title';
import Form from './Form';
import Table from './Table';

import { useState } from 'react'
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";

const TradingRoom = (props) => {

    const {auth, db} = props
    const [bids, setBids] = useState([])
    const [refs, setRefs] = useState([])

    const orderQuery = query(collection(db, "orders"), where('bidOrAsk', 'in', ['bid', 'ask']), orderBy('value', 'asc'));
    const unsubscribe = onSnapshot(orderQuery, (querySnapshot) => {
      const trades = [];
      const refs = [];
      querySnapshot.forEach((doc) => {
          trades.push(doc.data());
          refs.push(doc.ref);
      });
      setBids(trades)
      setRefs(refs)
    });

    return (
      <div className='flex flex-col items-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
        <div className="flex flex-col items-center w-full">
          <Header
            auth={auth}
            db={db}
          />
        </div>
        <div className="w-3/4 h-4/6 flex flex-col rounded-[20px] justify-center items-center bg-white/75 mt-10 p-10">
          <Title />
          <Form auth={auth} db={db} bids={bids} refs={refs}/>
        <div className='flex flex-row w-full justify-center mt-1'>
          <Table db={db} bids={bids}/>
        </div>
      </div>
        <div className="absolute bottom-0 text-white">
            <p>Made by Vishakh Sandwar</p>
        </div>
      </div>
    )
  };



export default TradingRoom