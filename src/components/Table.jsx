import { deleteDoc } from 'firebase/firestore'
import React from 'react'
import * as firebase from '../services/firebase';





const Table = (props) => {

  const { auth, db } = firebase
  const { bids } = props 



  return (
    <div className="overflow-y-auto w-full h-[256px]">
        <table className="table-auto w-full justify-between">
            <thead className="">
                <tr className="">
                    <th className="underline "> Cancel</th>
                    <th className="underline"> User</th>
                    <th className="underline"> Bid</th>
                    <th className="underline"> Value</th>
                    <th className="underline"> Ask</th>
                    <th className="underline"> User</th>
                    <th className="underline"> Cancel</th>
                </tr>
            </thead>
            <tbody>
                {bids && bids.map((order, i) => {
                    // const myOrder = order.uid == auth.currentUser.uid
                    const isBid = order.bidOrAsk == 'bid'
                    if (isBid) {
                    return (
                        <tr key={i} className="">
                            {/* {(myOrder) ? 
                                (<td 
                                    className="text-center cursor-pointer hover:text-red-500"
                                    // onClick={() => (deleteDoc(order.ref))}
                                    >
                                    x
                                </td>) : 
                                (<td className="text-center"></td>)} */}
                            <td className="text-center"></td>
                            <td className="text-center">{order.name}</td>
                            <td className="text-center">{order.bidOrAsk}</td>
                            <td className="text-center">{order.value}</td>
                            <td className="text-center">{" "}</td>
                            <td className="text-center">{" "}</td>
                            <td className="text-center">{" "}</td>
                        </tr>
                    )
                    } else {
                    return (
                        <tr key={i} className="">
                            <td className="text-center"></td>
                            <td className="text-center"></td>
                            <td className="text-center"></td>
                            <td className="text-center">{order.value}</td>
                            <td className="text-center">{order.bidOrAsk}</td>
                            <td className="text-center">{order.name}</td>
                            <td className="text-center"></td>
                            {/* {(myOrder) ? 
                                (<td 
                                    className="text-center cursor-pointer hover:text-red-500"
                                    // onClick={() => (deleteDoc(order.ref))}
                                    >
                                    x
                                </td>) : 
                                (<td className="text-center"></td>)} */}
                        </tr>
                    )
                    }
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Table