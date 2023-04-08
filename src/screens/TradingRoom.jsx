import React from 'react'

// import Header from '../components/Header';
// import Title from '../components/Title';
// import Form from '../components/Form';
// import Table from '../components/Table';
import {
  Header,
  Title,
  Form,
  Table
} from '../components';

import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import * as firebase from '../services/firebase';

const TradingRoom = () => {

    const {db} = firebase
    const [bids, setBids] = useState([])

    useEffect(() => {
      const orderQuery = query(collection(db, "orders"), where('bidOrAsk', 'in', ['bid', 'ask']), orderBy('value', 'asc'));
      const unsubscribe = onSnapshot(orderQuery, (querySnapshot) => {
        const trades = [];
        querySnapshot.forEach((doc) => {
            trades.push({
              ref: doc.ref,
              ...doc.data(), 
            });
        });
        setBids(trades)
      });
  
      return () => {
        unsubscribe();
      };
    }, []);


    return (
      <div className='flex flex-col items-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
        <div className="flex flex-col items-center w-full">
          <Header/>
        </div>
        <div className="w-3/4 h-4/6 flex flex-col rounded-[20px] items-center bg-white/75 mt-10 px-10">
          <Title />
          <Form bids={bids}/>
        <div className='flex flex-row w-full justify-center mt-1'>
          <Table bids={bids}/>
        </div>
      </div>
        <div className="absolute bottom-0 text-white">
            <p>Made by Vishakh Sandwar</p>
        </div>
      </div>
    )
  };



export default TradingRoom