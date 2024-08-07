import React from "react";
import CardProduct from "../components/CardProduct";
import customAPI from "../api";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/products");
  const products = data.products;
  return { products };
};

const HomeView = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div className="border-b border-primary pb-5">
        <h2 className="text-2xl font-bold capitalize">product list</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
        {products?.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomeView;
