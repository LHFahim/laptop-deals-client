import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllBuyers = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://buy-sell-server-sooty.vercel.app/users/buyer"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (_id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      fetch(`https://buy-sell-server-sooty.vercel.app/users/${_id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("A Buyer is deleted");
            refetch();
          }
        });
    }
  };
  return (
    <div className="bg-slate-500 p-4 min-h-screen lg:p-10">
      <h2 className="text-2xl text-slate-200 mb-4 pl-2 uppercase">
        All Buyers
      </h2>
      <div className="overflow-x-auto text-sm">
        <table className="table w-full">
          <thead className="uppercase bg-slate-400">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name ? buyer.name : "Unknown"}</td>
                <td>{buyer.email}</td>

                <td>
                  <button
                    className="btn rounded-sm btn-sm btn-error text-yellow-50"
                    onClick={() => handleDelete(buyer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;
