// import { FirebaseError } from '@firebase/util'
import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import Typewriter from "typewriter-effect";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import LoginButton from '../components/LoginButton';

const SignIn = () => {

    const auth = getAuth()

    function signInWithGoogle(auth) {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider)
    }
  
    return (
      <div className="flex flex-col items-center w-full h-screen bg-gradient-to-r from-violet-400 to-fuchsia-300 justify-center">
        <div className='bg-white/90 flex flex-col items-center py-24 md:py-32 w-[66%] h-[60%] rounded-3xl text-center'>
          <h1 className="text-5xl text-slate-800 font-bold">
            <Typewriter
              options={{
                delay: 50,
                deleteSpeed: 50,
              }}
              onInit={(typewriter)=> {
    
              typewriter
              
              .typeString("Welcome to the Nibiru Options Marketplace!")
                
              .pauseFor(1500)
              .deleteAll()
              .typeString("Sign in to get started.")
              .start();
              }}
            />
          </h1>
          <LoginButton />
        </div>
        {/* <button 
            onClick={() => signInWithGoogle(auth)} 
            className="flex flex-row items-center bg-white rounded-[20px] p-4 mt-20"
            >
            <FcGoogle
                className="mr-4"
            />
            <p className="text-black"> 
                Sign in with Google!
            </p>    
        </button> */}
      </div>
    )
  }

export default SignIn