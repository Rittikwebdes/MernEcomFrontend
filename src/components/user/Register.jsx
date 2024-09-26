import React, { useContext, useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

import {  toast } from 'react-toastify';
import AppContext from "../../context/AppContext";

export default function Register() {
  const { register } = useContext(AppContext);
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  

  

  
  const submitHandler =async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    formData.append("password", password);
 try {
  const result = await register(name, email, password);

   
  if(result.success){
   navigateTo('/user/login')
  }
 } catch (error) {
  console.log(error.response)
  toast.error(error.response.data.message)
 }

  };
  return (
    <>
      <div>
        <div className=" flex items-center justify-center p-8 min-h-screen ">
          <div className="w-full max-w-md md:backdrop-blur-2xl backdrop-blur-3xl p-7  shadow-lg shadow-blue-200 rounded-lg p-4 ">
            <form className="space-y-5 text-black" onSubmit={submitHandler}>
              <div className="font-semibold text-xl items-center text-center flex justify-center">
                <img src="/Vector 2.png" alt="" className=" my-2 p-2 bg-white rounded-sm" width={40} />
              </div>
              <h1 className="text-2xl font-bold mb-6 text-center text-white">Register</h1>

              <div className="mb-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full p-2 text-black shadow-sm shadow-white rounded focus:outline-none  bg-transparent hover:bg-white duration-300"
                />
              </div>
              <div className="mb-4">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full p-2  text-black shadow-sm shadow-white rounded focus:outline-none  bg-transparent hover:bg-white duration-300"
                />
              </div>

              <div className="mb-4 flex items-center  justify-center bg-transparent">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  required
                  placeholder="Your Password"
                  className=" p-2 w-full  text-black shadow-sm shadow-white rounded focus:outline-none  bg-transparent hover:bg-white duration-300"
                />
                <div className="relative">
                  {show ? (
                    <BiHide
                      className=" text-blue-900 absolute right-1 top-[-10px] "
                      onClick={() => setShow(!show)}
                      size={20}
                    />
                  ) : (
                    <BiShow
                      className=" text-blue-900 absolute right-1 top-[-10px] "
                      onClick={() => setShow(!show)}
                      size={20}
                    />
                  )}
                </div>
              </div>

              <p className="text-center mb-4 font-bold md:text-black text-blue-900">
                Already registered?{" "}
                <Link to={"/user/login"} className="text-blue-200 font-bold">
                  Login Now
                </Link>
              </p>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
