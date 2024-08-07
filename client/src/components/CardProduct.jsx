import React from "react";
import { Link } from "react-router-dom";

const CardProduct = ({product}) => {
  const priceFormat = (price) => {
    const rupiahFormat = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
    return rupiahFormat;
  };

  return (
    <div className="card bg-base-300 shadow-xl" key={product._id}>
      <figure>
        <img className="max-h-60" src={product.image} alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{product.name}</h2>
        <p className="font-bold text-accent">{priceFormat(product.price)}</p>
        <p>{product.description.substring(0, 50)}</p>
        <div className="card-actions justify-end">
          <Link to={`/products/${product._id}`} className="btn btn-primary">Buy Now</Link>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
