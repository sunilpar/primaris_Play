import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import authService from "@/backend/auth";
import currentUser from "@/utils/Session.helper";

interface FormData {
  email: string;
  password: string;
}
//change it to refresh token when auth expires
interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      const response = await authService.Login(data.email, data.password);
      console.log("Login response:", response);

      if (response) {
        setUser(response);
        currentUser.putData(response);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="mx-auto w-full max-w-lg rounded-xl  ring-1 ring-[#c4ab88] ring-opacity-70 p-10 ">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-base ">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <div>
              <input
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
                  },
                })}
                className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88] mb-5"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-2 hover:bg-[#c4ab88] bg-[#786953] text-black font-bold rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
