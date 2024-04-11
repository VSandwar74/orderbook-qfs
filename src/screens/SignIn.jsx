// import { FirebaseError } from '@firebase/util'
import React from 'react'


import { FcGoogle } from 'react-icons/fc';

import Typewriter from "typewriter-effect";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";


const SignIn = () => {

    const auth = getAuth()

    function signInWithGoogle(auth) {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider)
    }
  
    return (
      <div className="flex flex-col items-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="text-5xl text-white mt-[20%]">
          <Typewriter
            options={{
              delaySpeed: 50,
              deleteSpeed: 50,
            }}
            onInit={(typewriter)=> {
  
            typewriter
            
            .typeString("Welcome to the QFS Trading Floor!")
              
            .pauseFor(1000)
            .deleteAll()
            .typeString("Sign in to get started.")
            .start();
            }}
          />
        </h1>

        <button 
            onClick={() => signInWithGoogle(auth)} 
            className="flex flex-row items-center bg-white rounded-[20px] p-4 mt-20"
            >
            <FcGoogle
                className="mr-4"
            />
            <p className="text-black"> 
                Sign in with Google!
            </p>    
        </button>
      </div>
    )
  }

export default SignIn