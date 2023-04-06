// import { FirebaseError } from '@firebase/util'
import React from 'react'

// import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import './App.css'
import Typewriter from "typewriter-effect";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


const SignIn = () => {

    function signInWithGoogle(auth) {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider)
    }
  
    return (
      <div>
        <h1>
          <Typewriter
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
        <button onClick={() => signInWithGoogle(auth)} >Sign in with Google!</button>
      </div>
    )
  }

export default SignIn