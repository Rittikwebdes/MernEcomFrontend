import React, { useContext } from "react";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import AppContext from "./context/AppContext";
import './index.css';

function App() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={ !isAuthenticated ? <Login/> : <ShowProduct/>} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route
            exact
            path="/product/search/:term"
            element={<SearchProduct />}
          />
          <Route exact path="/user/register" element={<Register />} />
          <Route exact path="/user/login" element={<Login />} />
          <Route exact path="/user/profile" element={<Profile />} />
          <Route exact path="/user/cart" element={<Cart />} />
          <Route exact path="/shipping/address" element={<Address />} />
          <Route exact path="/checkout" element={<Checkout />} />
  
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
