import React, { useEffect } from 'react'
import * as firebase from '../services/firebase';
import Typewriter from "typewriter-effect";
import { useState } from 'react'
import { collection, doc, query, addDoc, getDocs, setDoc, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";

    
const Room = ( props ) => {

    const { roomDoc, setRoomDoc } = props
    const { auth, db } = firebase;
    const [roomName, setRoomName] = useState('')

    const [error, setError] = useState('')
    
    async function findRoom() {
        const q = query(collection(db, "rooms"), where("name", "==", roomName), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // console.log(querySnapshot.docs[0])
            return querySnapshot.docs[0]
        } else {
            setError('Incorrect room key.')
        }
    }

    async function createRoom() {
        const docRef = await addDoc(collection(db, "rooms"), {
            name: roomName,
            members: [],
            owner: auth.currentUser.uid,
            createdAt: serverTimestamp(),
        });
        setRoomDoc({
            ref: docRef,
            name: roomName,
        });
    }
    
    async function joinRoom() {
        try {
            const docRef = await findRoom()
            // console.log(docRef)
            await setDoc(doc(db, 'rooms', docRef.id ,'users', auth.currentUser.uid), {
                name: auth.currentUser.displayName,
                cash: 0,
                exposure: 0,
                roomId: docRef.id,
            });
            setRoomDoc({
                ref: docRef,
                name: roomName,
            });
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <div className="flex flex-col items-center justify around w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
            {/* <p>{location.pathname}</p> */}
            <h1 className="text-5xl text-white mt-[20%]">
                <Typewriter
                    onInit={(typewriter)=> {

                    typewriter
                    
                    .typeString("Create or join a room to get started!")
                    
                    // .pauseFor(1000)
                    // .deleteAll()
                    // .typeString("Sign in to get started.")
                    .start();
                    }}
                />
            </h1>
            <input 
                className="text-center bg-white p-1 px-10 py-4 rounded-full mt-10"
                type='text'
                value={roomName} 
                placeholder="Room Name" 
                onChange={(e) => setRoomName(e.target.value)} />
            <div className="flex flex-row w-full justify-center">
                <button
                    onClick={() => createRoom()} 
                    className="flex flex-row text-black items-center bg-white rounded-[20px] p-4 px-6 m-20 hover:bg-blue-500 hover:text-white"
                    >
                    <p className=""> 
                        Create Room
                    </p>    
                </button>
                <button 
                    onClick={() => joinRoom()} 
                    className="flex flex-row text-black items-center bg-white rounded-[20px] p-4 px-6 m-20 hover:bg-blue-500 hover:text-white"
                    >
                    <p className=""> 
                        Join Room
                    </p>    
                </button>
            </div>
            <p className="text-white" >
                {error}
            </p>
        </div>
  )
}

export default Room