import React from 'react'

import Header from './Header';
import Title from './Title';
import Form from './Form';
import Table from './Table';

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
        <div className="absolute bottom-0 text-white">
            <p>Made by Vishakh Sandwar</p>
        </div>
      </div>
    )
  };



export default TradingRoom