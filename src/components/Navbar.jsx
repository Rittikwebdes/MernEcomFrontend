import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { PiTrademarkRegisteredDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { TiThMenuOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import AppContext from "../context/AppContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setFilteredData,

    products,
    logout,
    isAuthenticated,
    cart,
  } = useContext(AppContext);
  console.log(cart);
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${search}`);
    setSearch("");
  };
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data?.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50">
        <div className=" md:p-4 p-2 w-full   flex justify-between items-center bg-white  shadow-md ">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className=""
          >
            <Link to="/" onClick={() => setShow(false)}>
              {" "}
              <img src="/Vector 2.png" alt="logo" width={30} />
            </Link>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className=" flex items-center gap-1 "
            onSubmit={submitHandler}
          >
            <input
              type="search"
              required
              value={search}
              placeholder="Search Your Products..."
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none border-2 md:px-8 md:py-1  border-blue-900 rounded-full text-black"
            />
            <FaSearch
              size={20}
              onClick={submitHandler}
              className="text-blue-900"
            />
          </motion.form>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="  flex gap-4 text-black-500 font-extrabold"
          >
            {isAuthenticated && (
              <>
                <Link to="/user/cart" className="flex items-center">
                  <TiShoppingCart size={20} />
                  <sup>{cart?.items?.length}</sup>
                </Link>
                <Link
                  to="/user/profile"
                  className="flex items-center gap-1 hidden md:flex"
                >
                  <CgProfile size={20} /> <span>Profile</span>
                </Link>
                <Link
                
                  onClick={() => {
                    logout();
                    navigate("/user/login")
                  }}
                  className="flex items-center gap-1 hidden md:flex"
                >
                  <CiLogout size={20} /> <span>Logout</span>
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/user/login"
                  className="flex items-center gap-1 hidden md:flex"
                >
                  <CiLogin size={20} /> <span>Login</span>
                </Link>
                <Link
                  to="/user/register"
                  className="flex items-center gap-1 hidden md:flex"
                >
                  <PiTrademarkRegisteredDuotone size={20} />{" "}
                  <span>Register</span>
                </Link>
              </>
            )}
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center md:hidden text-black  ml-1"
          >
            {show ? (
              <RxCross2 onClick={() => setShow(!show)} size={20} />
            ) : (
              <TiThMenuOutline onClick={() => setShow(!show)} size={20} />
            )}
          </motion.div>
        </div>

        {location.pathname === "/" && (
          <div>
            <div className="flex  overflow-x-scroll scrollbar-none w-full">
              <div className="px-8 py-4">
                <div className=" gap-[70px]  py-2 px-2 backdrop-blur-3xl  flex flex-nowrap justify-center  duration-300 rounded-xl  font-medium text-white cursor-pointer shadow-md ">
                  <Link
                    onClick={() => setFilteredData(products)}
                    className="  bg-gray-300  rounded-full p-2 text-black"
                  >
                    All
                  </Link>
                  <div
                    onClick={() => filterByCategory("Mobile")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    Mobiles{" "}
                  </div>
                  <div
                    onClick={() => filterByCategory("Fashion")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    Fashion{" "}
                  </div>
                  <div
                    onClick={() => filterByCategory("Electronics")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    Electronics{" "}
                  </div>
                  <div
                    onClick={() => filterByCategory("Furniture")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    {" "}
                    Furniture
                  </div>
                  <div
                    onClick={() => filterByCategory("Toys")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    Toys
                  </div>
                  <div
                    onClick={() => filterByCategory("Beauty")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    {" "}
                    Beauty
                  </div>
                  <div
                    onClick={() => filterByCategory("Sports")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    {" "}
                    Sports
                  </div>
                  <div
                    onClick={() => filterByCategory("Vechile")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    Vechiles{" "}
                  </div>
                  <div
                    onClick={() => filterByCategory("grocery")}
                    className="  hover:bg-gray-300  rounded-full p-2 hover:text-black"
                  >
                    Grocery{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {show && (
        <div className="flex flex-col  text-black py-9 justify-center items-center bg-white">
          {isAuthenticated && (
            <>
              <Link
                to="/user/profile"
                onClick={() => setShow(!show)}
                className="flex items-center gap-1 "
              >
                <CgProfile size={20} /> <span>Profile</span>
              </Link>
              <Link
                onClick={() => {
                  setShow(!show);
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-1 "
              >
                <CiLogout size={20} /> <span>Logout</span>
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to="/user/login"
                onClick={() => setShow(!show)}
                className="flex items-center gap-1 "
              >
                <CiLogin size={20} /> <span>Login</span>
              </Link>
              <Link
                onClick={() => setShow(!show)}
                to="/user/register"
                className="flex items-center gap-1 "
              >
                <PiTrademarkRegisteredDuotone size={20} /> <span>Register</span>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
