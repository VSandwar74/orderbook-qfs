import React from 'react'

import { useState, useEffect } from 'react'

import { collection, doc, query, onSnapshot, addDoc, setDoc, getDocs, FieldValue, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";




const Table = (props) => {
  const { db } = props 
  const [bids, setBids] = useState([])


  const orderQuery = query(collection(db, "orders"), orderBy('value', 'asc'));
  const unsubscribe = onSnapshot(orderQuery, (querySnapshot) => {
    const trades = [];
    querySnapshot.forEach((doc) => {
        trades.push(doc.data());
    });
    setBids(trades)
  });

  return (
    <table className='w-full flex flex-col justify-between'>
        <thead>
        <tr className="flex flex-row justify-between">
            <th className="text-decoration-solid text-bold" >User</th>
            <th>Bid</th>
            <th>Value</th>
            <th>Ask</th>
            <th>User</th>
        </tr>
        </thead>
        <tbody className="w-full flex flex-col items-center">
        {bids && bids.map((order, i) => {
            const isBid = order.bidOrAsk == 'bid'
            if (isBid) {
            return (
                <tr key={i} className="flex flex-row w-full items-center justify-between">
                <td>{order.name}</td>
                <td>{order.bidOrAsk}</td>
                <td>{order.value}</td>
                <td></td>
                <td></td>
                </tr>
            )
            } else {
            return (
                <tr key={i} className="flex flex-row w-full items-center justify-between">
                <td></td>
                <td></td>
                <td>{order.value}</td>
                <td>{order.bidOrAsk}</td>
                <td>{order.name}</td>
                </tr>
            )
            }
        })}
        </tbody>
    </table>
  )
}

export default Table