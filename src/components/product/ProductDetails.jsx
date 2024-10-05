import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";

import { motion } from "framer-motion";
export default function ProductDetails() {
  const{adToCart}  = useContext(AppContext)
  const [product, setProduct] = useState();
  const url = "https://mernecomwebsite.onrender.com/api";

  const { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchProducts();
  }, [id]);
  return (
    <>
      <div className="my-7">
        <h1 className="text-center text-7xl my-8 text-white">{product?.category}</h1>
        <div className="flex flex-wrap gap-8 justify-evenly items-center">
          <motion.div
          
          whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      initial={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
          
          >
            <img
              src={product?.imgSrc}
              alt="product"
              width={250}
              className="rounded-md"
            />
          </motion.div>
          <motion.div 
                whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      initial={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
          
          
          
          className="my-8 space-y-3 text-center">
            <h1 className="text-5xl text-blue-600 font-bold">{product?.title}</h1>
            <p className="text-2xl text-white">{product?.description}</p>
            <h1 className="font-semibold text-xl text-white">{product?.price}₹</h1>
            <div className=" flex gap-7 justify-center font-bold">
           
              <motion.button
                   whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      initial={{ opacity: 0, scale:0.5 }}
                      transition={{ duration: 0.8 }}
               className="btn btn-primary bg-green-600  hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 "
              
              onClick={() =>
                        adToCart(
                          product._id,
                          product.title,
                          1,
                          product.imgSrc,
                          product.price
                        )}
              >
                Add To Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div>
        <RelatedProduct category={product?.category} />
      </div>
    </>
  );
}
