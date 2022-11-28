import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import ProductSingle from "./ProductSingle";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const res = await fetch(
        `https://buy-sell-server-sooty.vercel.app/products/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-10 gap-4">
      {myProducts.map((p, i) => (
        <ProductSingle key={i} product={p} refetch={refetch}></ProductSingle>
      ))}
    </div>
  );
};

export default MyProducts;
