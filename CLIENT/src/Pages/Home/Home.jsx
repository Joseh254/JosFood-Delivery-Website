import React from 'react';
import TypingAnimator from 'react-typing-animator';
import "./Home.css"

function Home() {
  const textArray = ['near you', 'Call Us ','On','+254768163608'];
  return (
    <>
    <div className='herocontainer'>
      <div className="heroheading">
        <h1>Order delivery 
        <TypingAnimator
        
      textArray= {textArray}
      cursorColor="#333"
      textColor="#000000"
      fontSize="2rem"
      loop
      typingSpeed={60}
      delaySpeed={1000}
      backspace
      height="60px"
    />
    </h1>
      </div>
    </div>
    </>
  )
}

export default Home