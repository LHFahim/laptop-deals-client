import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="w-10/12 mx-auto min-h-screen flex flex-col items-start justify-center">
      <p className="text-error text-lg text-center">Something went wrong!</p>
      <p className="text-error text-lg text-center">
        {error?.statusText || error?.message}
      </p>
      <h2 className="text-3xl text-center">
        Please <button onClick={handleLogOut}>Sign Out</button> and log back in!
      </h2>
    </div>
  );
};

export default DisplayError;
