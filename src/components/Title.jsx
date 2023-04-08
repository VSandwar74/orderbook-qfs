import React from 'react'
import Typewriter from "typewriter-effect";

const Title = () => {
  return (
    <h1 className="text-5xl" >
        {/* Welcome to the QFS trading floor! */}
        <Typewriter
          onInit={(typewriter)=> {

          typewriter
          
          .typeString("Welcome to the QFS Trading Floor!")
            
          .pauseFor(1000)
          .deleteAll()
          .typeString("Start Trading!")
          .start();
          }}
        />
    </h1>
  )
}

export default Title