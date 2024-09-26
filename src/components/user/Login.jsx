import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

import AppContext from "../../context/AppContext";

export default function Login() {
  const { login } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
const navigateTo = useNavigate()

  const submitLogin = async (e) => {
    e.preventDefault();
    // alert("Your form has been submited")

    const result = await login(email, password , status);
if(result.success){
  navigateTo("/")
}
 
  }
    return (
      <>
        <div className="">
          <div className="min-h-screen flex items-center justify-center md:p-2 p-8">
            <div className="w-full max-w-md md:backdrop-blur-2x backdrop-blur-3xl  shadow-md shadow-white rounded-lg p-8 ">
              <form className="space-y-5 text-black" onSubmit={submitLogin}>
                <div className="font-semibold text-xl items-center text-center flex justify-center">
                  <img
                    src="/Vector 2.png"
                    alt=""
                    className=" my-2 p-1 rounded-sm bg-white"
                    width={50}
                  />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Login</h1>

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
                  <Link
                    to={"/user/register"}
                    className="text-blue-200 font-bold"
                  >
                    Register Now
                  </Link>
                </p>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );

}
