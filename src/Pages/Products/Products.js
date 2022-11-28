import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "./BookingModal/BookingModal";
import Product from "./Product";

const Products = () => {
  const [product, setProduct] = useState(null);
  const products = useLoaderData();
  // const { name, products } = category;

  return (
    <div className="my-10">
      <h2 className="text-xl lg:text-3xl text-slate-300 font-serif border border-slate-400 bg-slate-700 py-2 text-center mb-6">
        Products in the category:{" "}
        {/* <span className="text-yellow-300 uppercase">{name}</span> */}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
        {products.filter(prod=>!prod.paid).map((p, i) => (
          <Product key={i} product={p} setProduct={setProduct}></Product>
        ))}
      </div>
      {product && (
        <BookingModal product={product} setProduct={setProduct}></BookingModal>
      )}
    </div>
  );
};

export default Products;

// orgPrice
