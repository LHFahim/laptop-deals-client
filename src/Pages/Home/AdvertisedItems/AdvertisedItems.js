import React from "react";

const AdvertisedItems = ({ item }) => {
  const { img, name } = item;
  return (
    <div className="border border-slate-500 p-1 rounded bg-base-300">
      <img className="w-full rounded shadow-lg animate-pulse" src={img} alt="" />
      <h2 className="text-center text-md">{name}</h2>
    </div>
  );
};

export default AdvertisedItems;
