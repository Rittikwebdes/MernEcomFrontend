import { useContext, useEffect, useState } from "react";

import AppContext from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";

export default function SearchProduct() {
  const [searchProduct, setSearchProducts] = useState([]);
  const { products } = useContext(AppContext);

  const { term } = useParams();
  console.log(products);
  useEffect(() => {
    setSearchProducts(
      products.filter((data) => data?.title?.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, products]);
  return (
    <>
      <div>
        <div className="my-5">
          <h1 className="text-center text-5xl text-black font-bold">
      Your Product
          </h1>
          <div className="my-8 p-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1  place-items-center gap-8">
              {searchProduct?.map((product) => (
                <div key={product._id} className="hover:scale-105 duration-300">
                  <div className="card  w-75 shadow-md backdrop-blur-3xl text-white hover:shadow-white ">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product?.imgSrc}
                        alt="product"
                        width={400}
                        className="rounded-md p-5"
                      />
                    </Link>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title text-2xl  font-bold">
                        {product?.title}
                      </h2>

                      <div className="card-actions p-5 flex justify-around text-xl">
                        <button className="btn btn-primary text-black bg-white hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 ">
                          {product?.price} ₹
                        </button>
                        <button className="btn btn-primary text-black bg-green-600  hover:bg-blue-700 hover:text-white p-2 rounded-full duration-300 ">
                          Add To Cart
                        </button>
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
  );
}
