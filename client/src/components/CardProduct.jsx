import React from "react";

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
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
