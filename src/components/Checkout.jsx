import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import TableProducts from "./TableProducts";
import axios from "axios"
import {useNavigate} from "react-router-dom"


export default function Checkout() {
const  {cart , Uaddress ,url ,user ,clearCart} = useContext(AppContext)
const [qty, setQty] = useState(0);
const [price, setPrice] = useState(0);

const navigate = useNavigate();
useEffect(() => {
  let qty = 0;
  let price = 0;
  if (cart?.items) {
    for (let i = 0; i < cart?.items?.length; i++) {
      qty += cart.items[i].qty;
      price += cart.items[i].price;
    }
    setPrice(price);
    setQty(qty);
  }
}, [cart]);

const handlePayment = async()=>{
try {
  const orderRes = await axios.post(`${url}/payment/checkout`,{
    amount: price,
    qty: qty,
    cartItems: cart?.items,
    userShipping: Uaddress,
    userId: user._id,
  })
  // console.log(orderRes)
  const {orderId , amount:orderAmount} = orderRes.data
  const options = {
    key: 'rzp_live_ShDFTHyEjkgvpG', // Replace with your Razorpay key_id
    amount: orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'RittikChauhan',
    description: 'RittikChauhan',
    order_id:orderId, // This is the order_id created in the backend
    callback_url: 'http://localhost:3000/payment-success',// Your success URL
    handler: async function (response) {
      const paymentData = {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        amount: orderAmount,
        orderItems: cart?.items,
        userId: user._id,
        userShipping: Uaddress,
      };

      const api = await axios.post(
        `${url}/payment/verify-payment`,
        paymentData
      );

      console.log("razorpay res ", api.data);

      if (api.data.success) {
        clearCart();
        navigate("/oderconfirmation");
      }
    },
    prefill: {
      name: 'Rittik Chauhan',
      email: 'rittikchauhan8112002@gmail.com',
      contact: '7876630370'
    },
    theme: {
      color: '#F37254'
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
} catch (error) {
  console.log(error)
}
}
  return (
    <>
      <div className=" h-screen text-white p-6 rounded-md shadow-lg">
        <h2 className="text-center text-3xl mb-4 font-bold text-blue-600">
          Order Summary
        </h2>

        <div className="flex justify-around flex-wrap gap-4  p-4">
          <div className="col-span-1 md:col-span-2 overflow-x-auto">
            <table className="w-full table-auto border-collapse backdrop-blur-3xl border">
              <thead>
                <tr className="text-left border">
                  <th className="p-2 border">Product Img</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Qty--</th>
                  <th className="p-2 border">Qty++</th>
                  <th className="p-2 border">Remove</th>
                </tr>
              </thead>
           
                <TableProducts cart={cart} />
         
            </table>
          </div>

<div className=" p-4 border backdrop-blur-3xl">
            <h3 className="text-lg font-bold mb-2">Shipping Address</h3>
            <p>
              <strong>Name :</strong> {Uaddress.fullName}
            </p>
            <p>
              <strong>Phone :</strong> {Uaddress.phoneNumber}
            </p>
            <p>
              <strong>Country :</strong> {Uaddress.country}
            </p>
            <p>
              <strong>State :</strong> {Uaddress.state}
            </p>
            <p>
              <strong>City :</strong> {Uaddress.city}
            </p>
            <p>
              <strong>Pincode :</strong>{Uaddress.pincode}
            </p>
            <p>
              <strong>Near By :</strong>{Uaddress.address}
            </p>
          </div> 
   
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="bg-white text-black text-3xl font-semibold py-2 px-6 rounded-md"
           onClick={handlePayment} 
          >
            Proceed To Pay
          </button>
        </div>
      </div>
    </>
  );
}
