import React from 'react'

import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore'

const auth = firebase.auth();
const firestore = firebase.firestore();


const TradingRoom = () => {

    const bookRef = firestore.collection('orders')
    const query = messagesRef.orderBy('price').limit(25)

    const [orders] = useCollectionData(query, {idField: 'id'})

    function SignOut() {
        return auth.currentUser && (
            <button onClick={() => auth.signOut()}>
                Sign Out
            </button>
        )
    }

    const Trade = () => {
        const { data, uid } = props.data;

        return (
            <p>{data}</p>
        )
    }

    return (
        <div>
            <div>
                {orders && orders.map(order => <Trade key={order.id} data={order}/>)}
            </div>
        </div>
    )
}



export default TradingRoom