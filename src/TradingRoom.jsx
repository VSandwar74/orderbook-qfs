import React from 'react'

import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const db = getFirestore(app);

import Header from './Header';
import Title from './Title';
import Form from './Form';
import Table from './Table';

// const auth = firebase.auth();
// const firestore = firebase.firestore();


const TradingRoom = (props) => {

    const {auth, db} = props

    return (
      <div className='flex flex-col items-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
        <div className="flex flex-col items-center w-full">
          <Header
            auth={auth}
            db={db}
          />
        </div>
        <div className="w-3/4 flex flex-col rounded-[20px] justify-center items-center bg-white/75 mt-10 p-10">
          <Title />
          <Form auth={auth} db={db} />
        <div className='flex flex-row w-full justify-center mt-1'>
          <Table db={db} />
        </div>
      </div>
      </div>
    )
  };



export default TradingRoom