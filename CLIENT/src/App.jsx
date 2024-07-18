import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/Login' element={<Login/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App