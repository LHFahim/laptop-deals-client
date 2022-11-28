import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import ExtraSection from "../ExtraSection/ExtraSection";
import Slider from "../Slider/Slider";

import axios from "axios";

const Home = () => {
  const [advertisedItems, setAdvertisedItems] = useState();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categorisedProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://buy-sell-server-sooty.vercel.app/categories"
      );
      const data = await res.json();
      return data;
    },
  });

  // const { data: advertisedItems = [] } = useQuery({
  //   queryKey: ["advertiseditems"],
  //   queryFn: async () => {
  //     const res = await fetch("https://buy-sell-server-sooty.vercel.app/advertiseditems");
  //     const data = await res.json();
  //     return data;
  //   },
  // });
  /*
   */

  useEffect(() => {
    axios
      .get("https://buy-sell-server-sooty.vercel.app/advertiseditems")
      .then((response) => {
        setAdvertisedItems(response.data);
      });
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Slider></Slider>

      {advertisedItems && (
        <div className=" p-5 lg:p-10 lg:w-3/5 mx-auto bg-base-200 my-10 shadow-xl rounded-xl">
          <h2 className="text-xl lg:text-3xl text-center font-semibold my-4">
            Advertised Products
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {advertisedItems
              .filter((i) => !i.paid)
              .map((item, i) => (
                <AdvertisedItems key={i} item={item}></AdvertisedItems>
              ))}
          </div>
        </div>
      )}

      <div className="mb-10 bg-slate-700 p-4 ">
        <h2 className="text-xl lg:text-2xl uppercase my-3 text-center">
          Second Hand Laptop Categories
        </h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Link
              to={`/category/${category.category_id}`}
              key={category._id}
              className="btn btn-accent btn-outline rounded-none text-lg w-full uppercase font-semibold my-2"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default Home;
