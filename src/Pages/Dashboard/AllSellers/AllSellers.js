import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllSellers = () => {
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://laptop-deals-server.vercel.app/users/seller"
      );
      const data = await res.json();
      return data;
    },
  });
  const handleDelete = (_id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://laptop-deals-server.vercel.app/users/${_id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("A Seller is deleted");
            refetch();
          }
        });
    }
  };
  const handleVerify = (_id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://laptop-deals-server.vercel.app/user/${_id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("A Seller is verified");
            refetch();
          }
        });
    }
  };
  return (
    <div className="bg-slate-500 p-4 min-h-screen lg:p-10">
      <h2 className="text-2xl text-slate-200 mb-4 pl-2 uppercase">
        All Sellers
      </h2>
      <div className="overflow-x-auto text-sm">
        <table className="table w-full">
          <thead className="uppercase bg-slate-400">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>verify</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.name ? seller.name : "Unknown"}</td>
                <td>{seller.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(seller._id)}
                    className="btn rounded-sm btn-sm btn-error text-yellow-50"
                  >
                    delete
                  </button>
                </td>
                <td>
                  {seller.verified ? (
                    <p className="text-accent">Verified</p>
                  ) : (
                    <button
                      onClick={() => handleVerify(seller._id)}
                      className="btn rounded-sm btn-sm btn-success text-yellow-50"
                    >
                      verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
