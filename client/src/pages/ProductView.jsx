import React from "react";
import customAPI from "./../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/products");
  
  const products = data.products;
  return products;
};

const ProductView = () => {
  const products = useLoaderData();
  
  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-6">
        {products.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductView;
