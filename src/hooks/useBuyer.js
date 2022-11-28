import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://laptop-deals-server.vercel.app/users/buyer/${email}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setIsBuyer(data.isBuyer);
          setIsBuyerLoading(false);
        });
    }
  }, [email, isBuyer]);
  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
