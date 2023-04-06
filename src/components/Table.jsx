import React from 'react'

import { useState } from 'react'

import { collection, query, onSnapshot, orderBy } from "firebase/firestore";




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
    <table className="table-auto w-full justify-between">
        <thead className="">
            <tr className="">
                <th className="underline"> User</th>
                <th className="underline"> Bid</th>
                <th className="underline"> Value</th>
                <th className="underline"> Ask</th>
                <th className="underline"> User</th>
            </tr>
        </thead>
        <tbody>
            {bids && bids.map((order, i) => {
                const isBid = order.bidOrAsk == 'bid'
                if (isBid) {
                return (
                    <tr key={i} className="">
                        <td className="text-center">{order.name}</td>
                        <td className="text-center">{order.bidOrAsk}</td>
                        <td className="text-center">{order.value}</td>
                        <td className="text-center">{" "}</td>
                        <td className="text-center">{" "}</td>
                    </tr>
                )
                } else {
                return (
                    <tr key={i} className="">
                    <td className="text-center"></td>
                    <td className="text-center"></td>
                    <td className="text-center">{order.value}</td>
                    <td className="text-center">{order.bidOrAsk}</td>
                    <td className="text-center">{order.name}</td>
                    </tr>
                )
                }
            })}
        </tbody>
  </table>
  )
}

export default Table