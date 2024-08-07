import React, { useEffect, useState } from "react";
import customAPI from "../api";
import CardProduct from "../components/CardProduct";

const HomeView = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await customAPI.get("/products?limit=3");
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="border-b border-primary pb-5">
        <h2 className="text-2xl font-bold capitalize">product list</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
        {products?.map((product) => (
          <CardProduct product={product}/>
        ))}
      </div>
    </>
  );
};

export default HomeView;
