import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import authService from "@/backend/auth";
import currentUser from "@/utils/Session.helper";

interface FormData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  coverimage: string;
}

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

const avatars = [
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633795/a_Ultramarine_kyslth.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633800/a_Black_Legions_phkry6.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633797/a_Dark_Angels_fh1baz.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633797/a_Space_Wolves_gmxw1n.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633806/a_Death_Guard_jkel7x.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633846/a_World_Eaters_h5lbmj.png",
];
const coverImages = [
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633796/b_Ultramarines_batrcn.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633799/b_Black_Legion_nv6j2a.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633798/b_Dark_Angels_y1j3gg.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633795/b_Space_Wolves_u3ms8x.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633799/b_Death_Guard_uibokz.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633798/b_World_Eaters_uf6qew.jpg",
];

const Signup: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      console.log("data from form", data);

      const response = await authService.Signup(
        data.fullname,
        data.username,
        data.email,
        data.password,
        data.avatar,
        data.coverimage
      );
      if (response) {
        console.log(response);
        const response1 = await authService.Login(data.email, data.password);
        if (response1) {
          console.log("res from login", response1);
          setUser(response1);
          currentUser.putData(response1);
          navigate("/");
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10 ring-1 ring-white ring-opacity-70">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-base">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="input-class"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            {...register("fullname", { required: "Full name is required" })}
            className="input-class"
          />
          {errors.fullname && (
            <p className="text-red-600">{errors.fullname.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email",
              },
            })}
            className="input-class"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="input-class"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}

          {/* Avatar Selection */}
          <div>
            <p className="text-white">Select your legion</p>
            <div className="flex gap-3">
              {avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt="Avatar"
                  className="w-12 h-12 cursor-pointer rounded-full border-2"
                  onClick={() => setValue("avatar", avatar)}
                />
              ))}
            </div>
          </div>

          {/* Cover Image Selection */}
          <div>
            <p className="text-white">Select banner your prefre</p>
            <div className="flex gap-3">
              {coverImages.map((cover) => (
                <img
                  key={cover}
                  src={cover}
                  alt="Cover"
                  className="w-20 h-12 cursor-pointer border-2"
                  onClick={() => setValue("coverimage", cover)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-white hover:text-black duration-150"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
