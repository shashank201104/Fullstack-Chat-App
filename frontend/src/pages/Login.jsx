import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UseAuthStore } from "../store/UseAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const { authUser, Login, isLoggingIn } = UseAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (authUser) {
      navigate("/", { replace: true });
    }
  }, [authUser, navigate]);

  return (
    <div className='bg-[url("/Signup-bgImage.jpg")] h-[100vh] min-h-[fit-content] bg-center bg-no-repeat bg-cover flex justify-center items-center '>
      <div className="w-xl max-w-[90vw] h-[90vh] min-h-[fit-content] my-2 rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm backdrop-brightness-80 flex flex-col items-center box-border">
        <img
          src="/ChatConnectLogo.png"
          className="h-[20%] min-h-[100px] bg-clip-content"
        />
        <p className="text-4xl text-white text-center mb-5">
          Welcome to <b>ChatConnect</b>
        </p>
        <form
          className="flex flex-col mt-5 justify-center form-field"
          onSubmit={handleSubmit(async (data) => {
            Login(data);
          })}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              minLength: { value: 11, message: "email length not valid" },
              required: { value: true, message: "email is empty" },
            })}
            id="email"
            placeholder="Enter Your Email.. "
          />
          {errors.email && (
            <p className="text-center text-red-500 font-bold">
              {errors.email.message + "!"}
            </p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter a strong Password.."
            {...register("password", {
              minLength: { value: 6, message: "password length not valid" },
              required: { value: true, message: "password is empty" },
            })}
          />
          {errors.password && (
            <p className="text-center text-red-500 font-bold">
              {errors.password.message + "!"}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoggingIn}
            className={`bg-[#40164d] w-70 rounded-2xl p-2 mx-auto my-10 text-white 
    hover:bg-[#400253] ${
      isSubmitting || isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
    }`}
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-white text-xl">
          Create an Account -{" "}
          <Link className="font-extrabold underline" to={"/Signup"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
