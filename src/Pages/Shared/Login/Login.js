import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, providerLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  if (token) {
    navigate(from, { replace: true });
  }

  const saveUser = (name, email, role) => {
    const user = { name, email, role };
    fetch("https://buy-sell-server-sooty.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginUserEmail(email);
      });
  };

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((res) => {
        const user = res.user;
        saveUser(user.displayName, user.email, "buyer");
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };
  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((e) => {
        console.error(e.message);
        setLoginError(e.message);
      });
  };
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-lg rounded-lg">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          {/* --> */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full "
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-error">{errors.email?.message}</p>
            )}
          </div>
          {/* --< */}
          {/* --> */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
            />
            {errors.password && (
              <p className="text-error">{errors.password?.message}</p>
            )}
            <label className="label">
              <span className="label-text">Forgot password?</span>
            </label>
          </div>
          {/* --< */}
          <input
            className="btn btn-accent w-full"
            value="login"
            type="submit"
          />
          <div>{loginError && <p className="text-error">{loginError}</p>}</div>
        </form>
        <p className="text-sm text-center pt-3">
          New here?{" "}
          <Link className="text-primary" to="/signup">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
