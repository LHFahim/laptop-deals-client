import React from "react";
import toast from "react-hot-toast";

const SingleReportedItem = ({ item, refetch }) => {
  const { name, img, seller, seller_email, resalePrice, _id } = item;

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://laptop-deals-server.vercel.app/deleteproduct/${id}`, {
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
    <div className="card lg:card-side bg-base-300 shadow-xl my-5">
      <figure>
        <img
          className="shadow-lg rounded-2xl hover:animate-pulse"
          src={img}
          alt="Movie"
        />
      </figure>
      <div className="flex flex-col justify-center p-4 lg:pl-5">
        <h2 className="card-title text-slate-200">{name}</h2>
        <p className="my-1">Seller Name: {seller}</p>
        <p className="my-1 text-red-200">Seller Email: {seller_email}</p>
        <p className="text-red-100 my-1">Price: {resalePrice}</p>
        <div className="card-actions">
          <button
            className="btn btn-error btn-outline w-full my-1"
            onClick={() => handleDelete(_id)}
          >
            Delete This Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleReportedItem;
