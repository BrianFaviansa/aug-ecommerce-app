import React from "react";
import customAPI from "./../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/products", { params: params });

  console.log(data);
  const products = data.products;
  console.log(products);

  return { products, params };
};

const ProductView = () => {
  const { products, params } = useLoaderData();

  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-6">
        {!products.length ? (
          <h1 className="text-3xl font-bold mt-5 text-center">No Products Found</h1>
        ) : (
          products.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductView;
