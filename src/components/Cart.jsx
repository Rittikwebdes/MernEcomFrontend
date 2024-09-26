import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import {Link} from "react-router-dom"
import { CiShoppingCart } from "react-icons/ci";

export default function Cart() {
  const { cart, decreaseQty, adToCart, removeitems, removeCart } =
    useContext(AppContext);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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

  return (
    <>
      <div className="p-5">
        {cart?.items?.length == 0 ? (
          <>
            <div className="flex flex-col justify-center items-center my-[200px]  space-y-5 relative">
              <h1 className="text-2xl text-white">You have not added any items to your cart yet....</h1>
             <div className="absolute top-10 p-4 flex items-center rounded-md  bg-white">
             <Link to="/" className=" bg-white p-3">
                Continue Shopping
              </Link> <CiShoppingCart size={30}/>
             </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center p-3 gap-5 font-serif">
              <button className="bg-gray-600 text-white p-2 rounded-md">
                Total Items: {qty}
              </button>
              <button className="bg-gray-600 text-white p-2 rounded-md">
                Total Items: {price}
              </button>
            </div>
          </>
        )}

        {cart?.items?.map((product) => (
          <div key={product._id} className="p-6">
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 backdrop-blur-2xl  text-center flex-wrap items-center  justify-around p-6 shadow-md hover:shadow-slate-300 hover:scale-105 duration-300 font-serif rounded-md">
              <div>
                <img
                  src={product?.imgSrc}
                  alt="product"
                  className="hover:scale-105 duration-300 shadow-md rounded-2xl border "
                  width={150}
                />
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl text-blue-500">{product?.title}</h1>
                <p className="text-white">₹{product?.price}</p>
                <p className="text-white">Qty: {product?.qty}</p>
              </div>
              <div>
                <button
                  className="bg-green-600 p-2 rounded-lg font-semibold hover:bg-green-800 hover:text-white duration-300"
                  onClick={() => {
                    decreaseQty(product.productId, 1);
                  }}
                >
                  Decrease Qty(-)
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    adToCart(
                      product?.productId,
                      product.title,
                      1,
                      product.imgSrc,
                      product.price / product.qty
                    )
                  }
                  className="bg-green-600 p-2 hover:text-white rounded-lg font-semibold hover:bg-green-800 duration-300"
                >
                  Increase Qty(+)
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to remove this item ?")
                    ) {
                      removeitems(product?.productId);
                    }
                  }}
                  className="bg-red-600 hover:text-white p-2 rounded-lg font-semibold hover:bg-red-800 duration-300"
                >
                  Remove Item
                </button>
              </div>
            </div>
          </div>
        ))}
        {cart?.items?.length > 0 && (
          <>
            <div className="flex gap-5 p-5 justify-center">
              <Link to="/shipping/address" className="bg-pink-400 font-bold p-2 rounded-md">
                Checkout
              </Link>
              <button
                className="bg-red-600 font-bold p-2 rounded-md"
                onClick={() => {
                  if (confirm("Are you sure you want to clear cart?")) {
                    removeCart();
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
