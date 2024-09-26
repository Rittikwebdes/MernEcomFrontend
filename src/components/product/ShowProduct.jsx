import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export default function ShowProduct() {
  const { products, filteredData, adToCart } = useContext(AppContext);
  console.log(products);

  return (
    <>
      <div className="my-9 p-6">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1  place-items-center gap-8">
          {filteredData?.map((product) => (
            <motion.div
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              key={product._id}
              className="hover:scale-105 backdrop-blur-3xl  duration-300"
            >
              <div className="card  w-75 hover:shadow-md hover:shadow-white bg:from-inherit ">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product?.imgSrc}
                    alt="product"
                    width={400}
                    className="rounded-md p-5"
                  />
                </Link>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl text-white font-bold">
                    {product?.title}
                  </h2>

                  <div className="card-actions p-5 flex justify-around text-xl">
                    <motion.button
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      initial={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8 }}
                      className="btn btn-primary bg-white hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 "
                    >
                      {product?.price} ₹
                    </motion.button>
                    <motion.button
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.8 }}
                      className="btn btn-primary bg-green-600  hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 "
                      onClick={() =>
                        adToCart(
                          product._id,
                          product.title,
                          1,
                          product.imgSrc,
                          product.price
                        )
                      }
                    >
                      Add To Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
