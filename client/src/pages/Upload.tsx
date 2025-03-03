import React, { useState, useEffect } from "react";
import currentUser from "@/utils/Session.helper";
import videoService from "@/backend/video";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "@/components/skeleton/Spinner";
interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}
interface Video {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  created: string;
}

interface FormData {
  video: File;
  thumbnail: File;
  title: string;
  description: string;
  vid_url: string;
  thumb_url: string;
  ispublic: boolean;
}
type Props = {};

function Upload({}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [video, setVideo] = useState<Video | null>(null);

  const [Iurl, setIurl] = useState<string | null>(null);
  const [Vurl, setVurl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string>("");

  const getimgfile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  const getvideofile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const user = currentUser.getData();
        if (!user) {
          navigate("/");
        }
        setUser(user);
      } catch (error) {
        console.error("Error while fetching videos:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      setLoading(true);

      const videoResponse = await uploadVideo();
      if (videoResponse) {
        setVurl(videoResponse);

        const imageResponse = await uploadImage();
        if (imageResponse) {
          setIurl(imageResponse);

          const response = await videoService.insertVideo(
            videoResponse,
            imageResponse,
            data.title,
            data.description,
            true
          );

          if (response) {
            console.log(response);
          }
        }
      }
    } catch (err) {
      console.error("Error during upload:", err);
      setError("Make sure the video is not larger than 150MB");
    } finally {
      setLoading(false);
    }
  };

  async function uploadVideo() {
    try {
      const response = await videoService.uploadVideo(videoFile);
      console.log("Video upload response:", response);
      if (response == "") {
        alert("file too large make sure video is below 100mb  ");
      }
      return response;
    } catch (error) {
      console.error("Error while uploading video:", error);
      return null;
    }
  }

  async function uploadImage() {
    try {
      const response = await videoService.uploadImage(imageFile);
      console.log("Image upload response:", response);
      return response;
    } catch (error) {
      console.error("Error while uploading image:", error);
      return null;
    }
  }

  return !loading ? (
    <>
      <div
        className="relative logo flex w-full h-[100%] rounded-2xl pt-10 sm:pt-0 overflow-hidden"
        style={{
          backgroundImage: `url(${user?.coverimage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent from-20% opacity-70"></div>
        <div className="flex p-2 lg:justify-between align-middle w-full flex-wrap justify-center ">
          <div className="sm:mt-10 sm:ml-15 sm:mr-5">
            <img
              className="w-[100px] h-[100px] object-cover rounded-full ring-[#c4ab88]  ring-2 "
              src={user?.avatar}
              alt=""
            />
            <div className="flex flex-col ml-4 text-2xl">
              <div className="channel_name mt-[7.4px] font-bold">
                {user?.username}
              </div>
            </div>
          </div>
          {/* upload */}
          <div className="bg-black opacity-80 lg:h-[94%] lg:w-[700px] h-[70%] w-[300px] min-w-[340px] mt-10 ring-2 ring-[#c4ab88] rounded-2xl z-50">
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="box flex justify-center flex-col">
                <div className="uploads flex flex-row flex-wrap justify-center">
                  <input type="file" onChange={getvideofile} />

                  <input type="file" onChange={getimgfile} />
                </div>

                <input
                  type="text"
                  className="w-full p-2 text-white rounded-md  focus:outline-none focus:ring-0"
                  placeholder="Title"
                  {...register("title", {
                    required: "title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-red-600">{errors.title.message}</p>
                )}

                <input
                  type="text"
                  className="w-full p-2 text-white rounded-md  focus:outline-none focus:ring-0"
                  placeholder=" Description"
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}

                <button type="submit">upload</button>
              </div>
            </form>
          </div>
          <div className="h-[100px] w-[68px]"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        className="relative logo flex w-full h-[100%] rounded-2xl pt-10 sm:pt-0 overflow-hidden"
        style={{
          backgroundImage: `url(${user?.coverimage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent from-20% opacity-70"></div>
        <div className="flex lg:justify-between align-middle w-full flex-wrap justify-center ">
          <div className="sm:mt-10 sm:ml-15 sm:mr-5">
            <img
              className="w-[100px] h-[100px] object-cover rounded-full ring-[#c4ab88] ring-2 "
              src={user?.avatar}
              alt=""
            />
            <div className="flex flex-col ml-4 text-2xl">
              <div className="channel_name mt-[7.4px] font-bold">
                {user?.username}
              </div>
            </div>
          </div>
          {/* upload */}
          <div className="bg-black opacity-80 lg:h-[94%] lg:w-[700px] h-[70%] w-[300px] min-w-[340px] rounded-2xl mt-10 ring-2 ring-[#c4ab88] z-50 flex justify-center items-center">
            <Spinner />
          </div>
          <div className="h-[100px] w-[68px]"></div>
        </div>
      </div>
    </>
  );
}

export default Upload;
