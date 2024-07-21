import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import AdminProducts from "./Pages/Admin/AdminProducts/AdminProducts";
import AdminOrders from "./Pages/Admin/AdminOrders/AdminOrders";
import AdminUsers from "./Pages/Admin/AdminUsers/AdminUsers";
import AdminHeader from "./Components/AdminHeader/AdminHeader";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AdminProducts" element={<AdminProducts />} />
  <Route path="/AdminOrders" element={<AdminOrders />} />
  <Route path="/AdminUsers" element={<AdminUsers />} />
      </Routes>
      <Footer/>
    </BrowserRouter>

</>
  );
}

export default App;
