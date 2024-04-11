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
import { collection, query, onSnapshot, orderBy, where, limit } from "firebase/firestore";
import * as firebase from '../services/firebase';
import { useParams } from 'react-router-dom';
import Ledger from '../components/Ledger';


const TradingRoom = ( props ) => {

    const { roomDoc } = props;
    const {db} = firebase
    const [bids, setBids] = useState([])
    const [ledger, setLedger] = useState([])

    useEffect(() => {
      const orderQuery = query(collection(db, "rooms", roomDoc.ref.id ,"orders"), where('bidOrAsk', 'in', ['bid', 'ask']), orderBy('value', 'asc'), orderBy('timestamp', 'asc'));
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

    useEffect(() => {
      const ledgerQuery = query(collection(db, "rooms", roomDoc.ref.id, "ledger"), orderBy('timestamp', 'desc'), limit(5))
      const unsub = onSnapshot(ledgerQuery, (querySnapshot) => {
        const tx = [];
        querySnapshot.forEach((doc) => {
            tx.push({
              ref: doc.ref,
              ...doc.data(), 
            });
        });
        setLedger(tx)
      });
      return () => {
        unsub();
      };
    }, []);

    console.log(ledger)

    return (
      <div className='flex flex-col items-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
        <div className="flex flex-col items-center w-full">
          <Header roomId={roomDoc.ref.id} roomName={roomDoc.name} />
        </div>
        <div className='w-full flex flex-row px-12'>
          <div className="w-3/4 h-[512px] flex flex-col rounded-[20px] items-center bg-white/75 mt-10 px-10">
            <Title roomName={roomDoc.name}/>
            <Form bids={bids} roomId={roomDoc.ref.id}/>
          <div className='flex flex-row w-full justify-center mt-1'>
            <Table bids={bids}/>
          </div>
        </div>
          <div className='w-1/4'>
            <Ledger ledger={ledger} />
          </div>
      </div>
        <div className="absolute bottom-0 text-white">
            <p>Made by Vishakh Sandwar</p>
        </div>
      </div>
    )
  };



export default TradingRoom