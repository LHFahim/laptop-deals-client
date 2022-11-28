import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const { email } = user;
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `https://buy-sell-server-sooty.vercel.app/bookings/${email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="overflow-x-auto text-sm p-4">
      <table className="table w-full">
        <thead className="uppercase bg-slate-400">
          <tr>
            <th>Product Picture</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border border-slate-700 my-2">
              <td>
                <img className="w-32" src={b.productImg} alt="" />
              </td>
              <td>{b.productName ? b.productName : "Unknown"}</td>
              <td>${b.price}</td>

              <td>
                {!b.paid ? (
                  <Link to={`/dashboard/payment/${b._id}`}>
                    <button className="btn rounded-sm btn-sm btn-accent text-yellow-50">
                      Pay
                    </button>
                  </Link>
                ) : (
                  <p className="text-accent font-bold">Paid</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
