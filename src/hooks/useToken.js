import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const useToken = (email) => {
  // const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://laptop-deals-server.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            // console.log("data.acc in hook:", data);
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
            // navigate("/");
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
