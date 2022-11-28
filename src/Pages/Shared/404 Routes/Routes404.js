import React from "react";
import { Link } from "react-router-dom";
import svg from './error.svg'

const Routes404 = () => {
  return (
    <div className="flex bg-slate-400 min-h-screen items-center justify-center">
      <div className="px-4 lg:py-12 w-4/5 mx-auto">
        <div className="lg:flex">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-blue-600 text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Page not found
            </p>
            <p className="mb-8 text-center text-gray-900 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              to="/"
              className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
            >
              Go home
            </Link>
          </div>
          <div className="">
            <img
              src={svg}
              alt=""
              className="object-cover w-4/5 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes404;
