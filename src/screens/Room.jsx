import React, { useEffect } from 'react'
import * as firebase from '../services/firebase';
import Typewriter from "typewriter-effect";
import { useState } from 'react'
import { collection, doc, query, addDoc, getDocs, setDoc, serverTimestamp, where, limit, orderBy, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { LogoutButton } from '../components';
    
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
        // const docRef = await addDoc(collection(db, "rooms"), {
        //     name: roomName,
        //     members: [],
        //     owner: auth.currentUser.uid,
        //     createdAt: serverTimestamp(),
        // });
        setRoomDoc({
            ref: "111",
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
        <div className="flex flex-col items-center justify around w-full h-screen bg-gradient-to-r from-violet-400 to-fuchsia-300 justify-center">
            {/* <LogoutButton className="fixed top-10 right-0 m-4"/> */}
            <div className='bg-white/75 flex flex-col items-center justify-center p-12 md:px-60 md:py-20 rounded-3xl w-[60%]'>
                {/* <p>{location.pathname}</p> */}
                <h1 className="text-5xl text-slate-800">
                    <Typewriter
                        options={{
                            delay: 50,
                            deleteSpeed: 50,
                        }}
                        onInit={(typewriter)=> {
                        typewriter

                        .typeString("Pick the swap pool!")
                        // .pauseFor(1000)
                        // .deleteAll()
                        // .typeString("Sign in to get started.")
                        .start();
                        }}
                    />
                </h1>
                <form
                    onSubmit={() => createRoom()}
                    className='flex flex-row justify-between space-x-6 mt-10 font-semibold text-violet-900'
                >
                    <select 
                        id="pair"
                        className="text-center bg-white py-0 px-4 border-4 border-violet-900  text-violet-900 rounded-lg w-[80%]"
                        value={roomName}
                        placeholder="Room Name" 
                        onChange={(e) => setRoomName(e.target.value)} >
                            <option value="NIBI/USDC">NIBI/USDC</option>
                            <option value="NIBI/ETH">NIBI/ETH</option>
                            <option value="NIBI/BTC">NIBI/BTC</option>
                    </select>
                    <button 
                        type='submit'
                        className="border-4 border-violet-900 flex flex-row items-center bg-violet-900 hover:bg-violet-600 rounded-lg p-4"
                        >
                        <p className="text-white"> 
                           Enter
                        </p>    
                    </button>
                </form>
                {/* <input 
                    className="text-center bg-white p-1 px-10 py-4 rounded-full mt-10"
                    type='text'
                    value={roomName} 
                    placeholder="Room Name" 
                    onChange={(e) => setRoomName(e.target.value)} /> */}
                {/* <div className="flex flex-row w-full justify-center">
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
                </div> */}
                <p className="text-white" >
                    {error}
                </p>
            </div>
        </div>
  )
}

export default Room