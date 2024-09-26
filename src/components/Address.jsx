import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigateTo = useNavigate();
  const { shippingAddress,Uaddress } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
      fullName: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      phoneNumber: "",
      address: "",
    });
    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );
    console.log("address", result)
    if (result.success) {
      navigateTo("/checkout");
    }
  };

  const useOldAddress = () => {
navigateTo("/checkout")
 
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center md:p-4 p-8">
        <div className=" text-white md:p-4 p-8 w-[800px] rounded-md backdrop-blur-3xl shadow-sm shadow-white">
          <h2 className="text-center text-3xl mb-6 font-bold">
            Shipping Address
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
              required
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="p-2 shadow-sm shadow-white rounded focus:outline-none bg-transparent hover:bg-gray-800 duration-300"
              />
              <input
              required
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="p-2 shadow-sm shadow-white rounded focus:outline-none bg-transparent hover:bg-gray-800 duration-300"
              />
              <input
              required
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="p-2  shadow-sm shadow-white rounded focus:outline-none bg-transparent hover:bg-gray-800 duration-300"
              />
              <input
              required
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="p-2  shadow-sm shadow-white rounded focus:outline-none bg-transparent hover:bg-gray-800 duration-300"
              />
              <input
              required
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="p-2  shadow-sm shadow-white rounded focus:outline-none  bg-transparent hover:bg-gray-800 duration-300"
              />
              <input
              required
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="p-2  shadow-sm shadow-white rounded focus:outline-none  bg-transparent hover:bg-gray-800 duration-300"
              />
            </div>
            <textarea
            required
            minLength={10}
              name="address"
              placeholder="AddressLine/Nearby"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 shadow-sm shadow-white rounded focus:outline-none focus:ring focus:ring-black bg-transparent hover:bg-gray-800 duration-300"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2  rounded-md hover:bg-blue-600 focus:outline-none "
            >
              Submit
            </button>
          </form>
    {
      Uaddress && (
        <button
            onClick={useOldAddress}
            className="w-full bg-green-800 text-white mt-4 py-2 rounded-md hover:bg-green-600 focus:outline-none "
          >
            Use Old Address
          </button>
      )
    }
        </div>
      </div>
    </>
  );
}
