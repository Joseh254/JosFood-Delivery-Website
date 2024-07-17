import React from 'react';
import TypingAnimator from 'react-typing-animator';
import "./Home.css"

function Home() {
  const textArray = ['near you', 'Call Us on','+254768163608'];
  const animation = <TypingAnimator
        
  textArray= {textArray}
  cursorColor="red"
  textColor="red"
  fontSize="2rem"
  loop
  typingSpeed={60}
  delaySpeed={1000}
  backspace
  height="60px"
/>
  return (
    <>
    <div className='herocontainer'>
      <div className="heroheading">
        <h1>Order delivery:{animation} </h1>
      </div>

      <div className="heroinputs">
      <input type="text"  placeholder='Enter delivery address '/>
      <select>
        <option value="Deliver Now">Deliver Now</option>
        <option value="Deliver Now">Order Delivery</option>
        <option value="Deliver Now">Cancel Delivery</option>
      </select>
      <button>Find Food</button>
    </div>
    </div>

    </>
  )
}

export default Home