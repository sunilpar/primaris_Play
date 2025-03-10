import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import videoService from "@/backend/video";
import Spinner from "@/components/skeleton/Spinner";

type FormData = {
  title: string;
  description: string;
  thumbnail: File;
};

type Video = {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  created: string;
};

function EditVideo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (id) {
          const videoData = await videoService.getVideoById(id);
          if (videoData) {
            setVideo(videoData);
            setValue("title", videoData.title);
            setValue("description", videoData.description);
          }
        }
      } catch (err) {
        console.error("Error fetching video details:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, setValue]);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) setThumbnailFile(file);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      setLoading(true);
      let thumbnailUrl = video?.thumbnail;

      if (thumbnailFile) {
        const uploadResponse = await videoService.uploadImage(thumbnailFile);
        if (uploadResponse) {
          thumbnailUrl = uploadResponse;
        } else {
          throw new Error("Thumbnail upload failed");
        }
      }

      if (thumbnailFile && thumbnailUrl !== video?.thumbnail && id) {
        await videoService.updateThumbnail(thumbnailUrl || "", id);
      }

      if (id) {
        await videoService.updateVideoDetails(
          id,
          data.title,
          data.description,
          true
        );
      }

      navigate(`/video/${id}`);
    } catch (err) {
      console.error("Error updating video:", err);
      setError("Failed to update video");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex justify-center">
      <div className="bg-black p-6  shadow-lg ring-2 rounded-2xl m-5 min-w-[300px] ring-[#c4ab88]">
        <div className="flex justify-center mb-7 font-bold text-2xl text-[#c4ab88] font-display">
          Edit your video
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div
            className="relative w-full  bg-cover bg-center rounded-md flex justify-center items-center lg:h-[300px] h-[300px]"
            style={{ backgroundImage: `url(${video?.thumbnail})` }}
          >
            <div className="opacity-80">
              <svg
                width="133px"
                height="133px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>

            <input
              type="file"
              onChange={handleThumbnailChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <input
            type="text"
            className="w-full p-2 text-white bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}

          <textarea
            className="w-full p-2 text-white h-[200px] bg-black rounded-md border border-gray-600 
             focus:outline-none focus:ring-1 focus:ring-[#c4ab88] focus:border-[#c4ab88]"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}

          <button
            type="submit"
            className="w-full p-2 hover:bg-[#c4ab88] bg-[#786953] text-black font-bold rounded-md"
          >
            Update Video
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditVideo;
