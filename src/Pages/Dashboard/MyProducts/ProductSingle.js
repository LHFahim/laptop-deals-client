import React from "react";
import toast from "react-hot-toast";

const ProductSingle = ({ product, refetch }) => {
  const { _id, img, name, resalePrice, used, paid, advertised } = product;
  const handleAdvertise = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://buy-sell-server-sooty.vercel.app/myproducts/${id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("A Product is Advertised");
            refetch();
          }
        });
    }
  };
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://buy-sell-server-sooty.vercel.app/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("A Product is Deleted");
            refetch();
          }
        });
    }
  };
  return (
    <div className="card bg-base-300 shadow-xl">
      <figure>
        <img className="bg-slate-800" src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="badge badge-secondary">{paid ? "Sold" : "Available"}</p>
        <p>Used for: {used}</p>
        <p>Price: ${resalePrice}</p>

        <div className="card-actions flex items-center justify-between">
          {!paid && !advertised ? (
            <div
              className="btn btn-accent btn-outline rounded-sm btn-sm "
              onClick={() => handleAdvertise(_id)}
            >
              Advertise
            </div>
          ) : (
            <div className="badge badge-accent badge-outline text-lg">
              Advertised
            </div>
          )}
          <div
            className="btn btn-error btn-outline rounded-sm btn-sm"
            onClick={() => handleDelete(_id)}
          >
            delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSingle;
