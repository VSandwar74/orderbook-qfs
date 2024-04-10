import React from 'react'
import Typewriter from "typewriter-effect";

const Title = ( ) => {
  return (
    <div className="flex flex-col items-center" >
      <h1 className="text-5xl mt-8" >
          {/* Welcome to the QFS trading floor! */}
          <Typewriter
            options={{
              delay: 50,
              deleteSpeed: 50,
            }}
            onInit={(typewriter)=> {

            typewriter
            
            .typeString("Welcome to the NOM Trading Floor!")
              
            .pauseFor(1000)
            .deleteAll()
            .typeString("Start Trading!")
            .start();
            }}
          />
      </h1>
    </div>
  )
}

export default Title