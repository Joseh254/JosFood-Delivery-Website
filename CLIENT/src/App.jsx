import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
<Route path='/' element={<Home/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App