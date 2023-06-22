import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("")
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message)
      });
  };

  return (
    <>
      <Helmet>
                <title>Sporting Summers | LogIn</title>
            </Helmet>
      <div className=" w-96 bg-base-200 m-auto my-5">
        <div className="rounded-lg shadow-2xl bg-slate-50 p-5">
          <h1 className=" text-center text-2xl font-bold">Please LogIn</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <p className=" text-sm text-red-500">{error}</p>
            <div className="form-control mt-3">
              <input className="btn btn-primary" type="submit" value="LogIn" />
            </div>
            <p className="pt-3 pl-1 font-serif">
              Do not have an account?
              <Link to="/register" className=" link text-blue-600">
                Register
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </>
  );
};

export default Login;
