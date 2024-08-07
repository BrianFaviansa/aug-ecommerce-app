import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import customAPI from "../api";

const DetailProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const priceFormat = (price) => {
    const rupiahFormat = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
    return rupiahFormat;
  };

  const productData = async () => {
    try {
      setLoading(true);
      const { data } = await customAPI.get(`/products/${id}`);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl lg:text-4xl">{product.name}</h2>
          <span className="text-xl lg:text-3xl text-accent font-bold">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary badge-lg mt-3">{product.category}</span>
          <span className="mt-3 font-bold lg:text-xl">Stock : {product.stock}</span>
          <p className="my-3 lg:text-lg">{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm lg:btn-lg">
              <FaPlus />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
