import React from 'react'






const Table = (props) => {

  const { db, bids } = props 
  const orders = bids.map(bids => bids[0]);
//   console.log(orders)



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
            {orders && orders.map((order, i) => {
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