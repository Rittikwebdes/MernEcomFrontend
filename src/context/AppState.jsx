import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

import { toast } from "react-toastify";

export default function AppState(props) {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [Uaddress, setUAddress] = useState("");

  // const url = "http://localhost:3000/api";
  const url = "https://mernecomwebsite.onrender.com/api";
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProducts();
    userCart();
    getAddress();
  }, [token, reload]);

  useEffect(() => {
    let LStoken = localStorage.getItem("token");
    if (LStoken) {
      setToken(LStoken);
      setIsAuthenticated(true);
    }
    // setToken(localStorage.getItem("token"))
  });

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message);

    return api.data;
    // console.log("user register ",api)
  };

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    // alert(api.data.message)
    toast.success(api.data.message);

    console.log(api);

    // console.log("user login ",api.data)
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");

    toast.success("Logged out succcessfully");
  };

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/getProfile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log(api.data);
    setUser(api.data.user);
  };

  const adToCart = async (productId, title, qty, imgSrc, price) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, qty, imgSrc, price },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log("my cart", api);
    toast.success(api.data.message);
  };

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/usercart`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("user cart", api.data.cart);
    setCart(api.data.cart);
  };

  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log("decrease cart", api);
    toast.success(api.data.message);
    setReload(!reload);
  };

  const removeitems = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("decrease cart", api);
    toast.success(api.data.message);
    setReload(!reload);
  };

  const removeCart = async () => {
    const api = await axios.delete(`${url}/cart/removeall`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("decrease cart", api);
    toast.success(api.data.message);
    setReload(!reload);
  };

  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );

    setReload(!reload);
    console.log("my address", api);
    toast.success(api.data.message);

    return api.data;
  };

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/getaddress`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("user address", api.data.userAddress);
    setUAddress(api.data.userAddress);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filteredData,
        setFilteredData,
        token,
        url,
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
        user,
        adToCart,
        cart,
        decreaseQty,
        removeitems,
        removeCart,
        shippingAddress,
        Uaddress,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
