import React, { useState,useEffect } from "react";
import { UseAuthStore } from "../store/UseAuthStore";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const { authUser,SignUp, isSigningUp } = UseAuthStore();
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  useEffect(() => {
    if (authUser) {
      navigate("/");}
  }, [authUser])
  

  return (
    <div className='bg-[url("/Signup-bgImage.jpg")] h-[100vh] min-h-[fit-content] bg-center bg-no-repeat bg-cover flex justify-center items-center '>
      <div className="w-xl max-w-[90vw] h-[90vh] min-h-[fit-content] my-2 rounded-2xl   bg-[rgba(255,255,255,0.05)] backdrop-blur-sm backdrop-brightness-80 flex flex-col items-center box-border">
        <img src="/ChatConnectLogo.png" className="h-[20%] bg-clip-content" />
        <p className="text-4xl  text-white text-center mb-5">
          Welcome to <b>ChatConnect</b>
        </p>
        <form className="flex flex-col justify-center form-field" onSubmit={handleSubmit(async (data)=>{SignUp(data)})}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter Your Username.."
            {...register("fullName", {
              minLength: {
                value: 6,
                message: "Username must contain atleast 6 letters",
              },
              required: { value: true, message: "Username is empty" },
            })}
          />
          {errors.fullName && <p className="text-center text-red-500 font-bold">{errors.fullName.message + '!'}</p>}
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
          {errors.email && <p className="text-center text-red-500 font-bold">{errors.email.message +"!"}</p>}
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter a strong Password.."
            {...register("password", {
              minLength: { value: 6, message: "password length not valid" },
              required: { value: true, message: "password is empty" },
            })}
            />
            
            {errors.password && <p className="text-center text-red-500 font-bold" >{errors.password.message +"!"}</p>}
          <button
            type="submit"
            id="password"
            className=" bg-[#40164d] w-70 rounded-2xl p-2 mx-auto my-10 text-white hover:bg-[#400253] disabled:text-gray-600 disabled:bg-purple-950 "
            disabled={isSigningUp}
          >
            Create Account
          </button>
        </form>
        <p className="text-white  text-xl">
          Already have an Account -{" "}
          <Link className="font-extrabold underline" to="/Login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
