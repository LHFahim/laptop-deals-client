import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 my-40 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
