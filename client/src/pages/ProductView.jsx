import React from "react";
import customAPI from "./../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";
import Pagination from "../components/Pagination";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/products", { params: params });

  const products = data.products;
  const pagination = data.pagination;

  return { products, params, pagination };
};

const ProductView = () => {
  const { products, pagination } = useLoaderData();

  return (
    <>
      <Filter />
      <h3 className="text-xl text-primary font-bold text-right my-3">
        Total : {pagination.totalProducts} Products
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-6">
        {!products.length ? (
          <h1 className="text-3xl font-bold mt-5 text-center">
            No Products Found
          </h1>
        ) : (
          products.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  );
};

export default ProductView;
