import  { useContext, useEffect, useState } from 'react'

import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";



export default function RelatedProduct({category}) {
    const [ relatedProducts , setRelatedProducts] = useState([])
    const {products , adToCart} = useContext(AppContext)
    console.log(products)
    useEffect(()=>{
setRelatedProducts(products.filter((data)=>data?.category?.toLowerCase()== category?.toLowerCase()))
    },[category,products])
  return (
<>
    <div>
        <div className='my-5'>
            <h1 className='text-center text-5xl text-white font-bold'>Related Products</h1>
            <div className="my-8 p-6">
 <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1  place-items-center gap-8">
 {relatedProducts?.map((product) => (
        <div key={product._id} className="hover:scale-105 duration-300">
          <div className="card  w-75 shadow-md bg-black hover:shadow-white text-white bg:from-inherit ">
            <Link to={`/product/${product._id}`}>
              <img src={product?.imgSrc} alt="product" width={400} className="rounded-md p-5" />
            </Link>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl  font-bold">{product?.title}</h2>
             
              <div className="card-actions p-5 flex justify-around text-xl">
                <motion.button
                     whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      initial={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8 }}
                
                 className="btn btn-primary text-black bg-white hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 ">{product?.price} ₹</motion.button>
                <motion.button 
                   whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.8 }}
                className="btn btn-primary  bg-green-600  hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 "
                 onClick={() =>
                        adToCart(
                          product._id,
                          product.title,
                          1,
                          product.imgSrc,
                          product.price
                        )}
                >Add To Cart</motion.button>
              </div>
            </div>
          </div>
        </div>
      ))}
 </div>
 </div>
        </div>
    </div>
</>
  )
}
