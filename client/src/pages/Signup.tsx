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

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedCover, setSelectedCover] = useState<string>("");
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
    <div
      className="flex items-center flex-col justify-center w-full h-screen p-3 "
      style={{
        backgroundImage: selectedCover ? `url(${selectedCover})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center ",
      }}
    >
      <div className="relative flex w-full max-w-3xl bg-[rgba(0,0,0,0.8)] rounded-xl p-10 ring-1 ring-[#c4ab88] ring-opacity-70  ">
        {/* Avatar Display */}

        <div className="mx-auto w-full">
          <div className="flex lg:flex-row lg:justify-start flex-col justify-center">
            {selectedAvatar && (
              <div className="mr-[30px] flex justify-center">
                <img
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  className="w-[80px] h-[80px]  rounded-full border-2 border-[#c4ab88]"
                />
              </div>
            )}
            <div className="">
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
            </div>
          </div>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Username, Fullname, Email, Password Fields (Unchanged) */}
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}

            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: "Full name is required" })}
              className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
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
              className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            {/* Avatar Selection */}
            <div className="">
              <p className="text-white mb-5">Select your legion</p>
              <div className="flex gap-3 flex-wrap">
                {avatars.map((avatar) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt="Avatar"
                    className={`w-12 h-12 cursor-pointer rounded-full border-2 ${
                      selectedAvatar === avatar
                        ? "border-[#c4ab88]"
                        : "border-gray-600"
                    }`}
                    onClick={() => {
                      setValue("avatar", avatar);
                      setSelectedAvatar(avatar);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Cover Image Selection */}
            <div className="">
              <p className="text-white">Select banner your prefer </p>
              <div className="flex gap-3 flex-wrap ">
                {coverImages.map((cover) => (
                  <div key={cover}>
                    <img
                      src={cover}
                      alt="Cover"
                      className={`cursor-pointer border-2 h-[50px] ${
                        selectedCover === cover
                          ? "border-[#c4ab88]"
                          : "border-gray-600"
                      }`}
                      onClick={() => {
                        setValue("coverimage", cover);
                        setSelectedCover(cover);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 hover:bg-[#c4ab88] bg-[#786953] text-black font-bold rounded-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
