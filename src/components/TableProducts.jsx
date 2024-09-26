import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

export default function TableProducts({ cart }) {
    const {  decreaseQty, adToCart, removeitems } =
    useContext(AppContext);


  const [price, setPrice] = useState(0);
  useEffect(() => {
  
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
     
        price += cart.items[i].price;
      }
      setPrice(price);
      
    }
  }, [cart]);
  return (
    <>
   <tbody className="">
   {cart?.items?.map((product) => (
        <tr key={product._id} className="">
          <td className="p-5 border">
            <img
              src={product?.imgSrc}
              alt="Dell Inspiron 7420"
              className="w-12 h-12"
            />
          </td>
          <td className="p-2 border">{product?.title}</td>
          <td className="p-2 border">{product?.price} ₹</td>
          <td className="p-2 border">{product?.qty}</td>
          <td className="p-2 border">
            <button className="bg-yellow-500 text-black p-1 rounded"
              onClick={() => {
                    decreaseQty(product.productId, 1);
                  }}
            
            >-</button>
          </td>
          <td className="p-2 border ">
            <button className="bg-yellow-500 text-black p-1 rounded "
               onClick={() =>
                    adToCart(
                      product?.productId,
                      product.title,
                      1,
                      product.imgSrc,
                      product.price / product.qty
                    )
                  }>+</button>
          </td>
          <td className="p-2 border">
            <button className="bg-red-600 p-1 rounded"
               onClick={() => {
                    if (
                      confirm("Are you sure you want to remove this item ?")
                    ) {
                      removeitems(product?.productId);
                    }
                  }}>🗑️</button>
          </td>
        </tr>
      ))}
      <tr className="">
        <td
          colSpan="2"
          className="p-2  font-bold text-center border"
        >
          Total
        </td>
        <td colSpan="5" className="p-2  font-bold border">
        {price}
        </td>
      </tr>
   </tbody>
    </>
  );
}
