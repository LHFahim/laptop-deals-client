import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import useToken from "../../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, providerLogin } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");

  // new
  const [token] = useToken(createdUserEmail);
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";

  // if token found
  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    setSignUPError("");
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        // toast("User Created Successfully.");
        const userInfo = {
          displayName: data.name,
        };
        // console.log(data.name);
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.role);
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => {
        console.log(e);
        setSignUPError(e.message);
      });
  };
  const saveUser = (name, email, role) => {
    const user = { name, email, role };
    fetch("https://laptop-deals-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };
  const googleProvider = new GoogleAuthProvider();
  const userRole = "buyer";

  const handleGoogleSignUp = () => {
    providerLogin(googleProvider)
      .then((res) => {
        const user = res.user;
        console.log(user);
        // setCreatedUserEmail(res.user.email);
        saveUser(res.user.displayName, res.user.email, userRole);
        // navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-lg rounded-lg">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          {/* --> */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name required",
              })}
              className="input input-bordered w-full "
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* --< */}
          {/* --> */}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email required",
              })}
              className="input input-bordered w-full "
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
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
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Password must be more than 5 Characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have an uppercase,number,special case",
                },
              })}
              className="input input-bordered w-full "
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* --< */}
          {/*  */}
          <select
            className="select select-bordered w-full mt-2 uppercase"
            {...register("role", {
              required: "User type required",
            })}
          >
            <option>buyer</option>
            <option>seller</option>
          </select>
          {/*  */}
          <input
            className="btn btn-accent w-full mt-4"
            value="sign up"
            type="submit"
          />
          {signUpError && <p className="text-error">{signUpError}</p>}
        </form>
        <p className="text-sm text-center pt-3">
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignUp} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
