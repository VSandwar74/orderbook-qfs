import { deleteDoc } from 'firebase/firestore'
import React from 'react'
import * as firebase from '../services/firebase';
// import trades from '../assets/trades.json';

const Ledger = (props) => {
    const { ledger } = props;
    
    console.log(ledger)

    return (
      <div className="w-3/4 h-[512px] flex flex-col-reverse justify-end rounded-[20px] items-center bg-white/75 mt-10 ml-4 px-6">
        <h1 className="text-3xl mt-8 absolute" >
            {/* Welcome to the QFS trading floor! */}
            Ledger
        </h1>
        <div className='mt-24 h-[400px] overflow-y-auto scroll-auto'>
            {ledger.map((trade) => (
            <p>
                {trade.seller} sold to {trade.buyer} @ {trade.amount}
            </p>
            ))}
        </div>
      </div>
    );
  };
  
  export default Ledger;
  