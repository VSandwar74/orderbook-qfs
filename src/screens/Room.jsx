import React from 'react'
import * as firebase from '../services/firebase';
import Typewriter from "typewriter-effect";
import { useState } from 'react'
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const Room = () => {
    const { auth, db } = firebase;
    const [roomName, setRoomName] = useState('')


    return (
        <div className="flex flex-col items-center justify around w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
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
                    onClick={() => createRoom(auth)} 
                    className="flex flex-row items-center bg-white rounded-[20px] p-4 m-20"
                    >
                    <p className="text-black"> 
                        Create Room
                    </p>    
                </button>
                <button 
                    onClick={() => joinRoom(auth)} 
                    className="flex flex-row items-center bg-white rounded-[20px] p-4 m-20"
                    >
                    <p className="text-black"> 
                        Join Room
                    </p>    
                </button>
            </div>
        </div>
  )
}

export default Room