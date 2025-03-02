import React, { useEffect, useState } from "react";
import commentService from "@/backend/comment";
import currentUser from "@/utils/Session.helper";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
interface LikebtnProps {
  video_id: string;
}
interface Comment {
  id: string;
  video_UID: string;
  user_UID: string;
  comment: string;
  created: string;
  avatar: string;
  username: string;
}
interface FormData {
  content: string;
}

function Comment({ video_id }: LikebtnProps) {
  const [comment, setComment] = useState<Comment[]>([]);
  const [islogged, setIslogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (video_id) {
      setLoading(true);
      setIslogged(currentUser.isLogged());
      getcomments(video_id);
      setLoading(false);
    }
  }, [video_id, refreshKey]);

  function getcomments(video_id: string) {
    (async () => {
      try {
        setLoading(true);
        const response = await commentService.getcomments(video_id);
        setLoading(false);
        if (response != null) {
          setComment(response);
        }
      } catch (error) {
        console.error("error while getting comments \n", error);
      }
    })();
  }
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");
    try {
      setLoading(true);
      const response = await commentService.addComments(video_id, data.content);
      setLoading(false);
      if (response != null) {
        console.log(response);
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch (err) {
      console.error("Error: couldnt add comment", err);
      setError("coundnt add comment ");
    }
  };

  return !loading ? (
    <>
      <div className="w-full max-w-2xl p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="border-b pb-4 mb-4 w-full">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 text-white rounded-md  focus:outline-none focus:ring-0"
              {...register("content", { required: "comment is required" })}
            />
          </div>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          {islogged ? (
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl px-4 py-1 bg-white hover:opacity-70 text-black font-semibold hover:duration-75"
              >
                Post
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Link to={"/login"}></Link>
              <button className="rounded-xl px-4 py-1 bg-white hover:opacity-70 text-black font-semibold hover:duration-75">
                login
              </button>
            </div>
          )}
        </form>

        {comment.map((cmt) => (
          <div key={cmt.id} className="flex gap-3 mb-5 ">
            <Link to={`/profile/${cmt.user_UID}`}>
              <img
                className="h-[60px] w-[60px] rounded-full"
                src={cmt.avatar}
                alt=""
              />
            </Link>
            <div>
              <p className="text-sm text-gray-400 ">
                <span className="font-semibold text-white mr-5">
                  {cmt.username}
                </span>
                {timeAgo(cmt.created)}
              </p>
              <p className="text-white">{cmt.comment}</p>
              <div className="flex gap-4 mt-2 text-gray-400 text-sm"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="w-full  h-[fit] ">
        <div className="felx mb-5 ">
          <div className="flex flex-row">
            <div className="pluse mb-5  rounded-full h-[60px] w-[60px] mr-2"></div>
            <div className="pluse h-[20px] w-[200px] rounded-2xl mt-[20px]"></div>
          </div>
          <div className="pluse h-[60px] w-[300px] rounded-2xl "></div>
        </div>
        <div className="felx mb-5 ">
          <div className="flex flex-row">
            <div className="pluse mb-5  rounded-full h-[60px] w-[60px] mr-2"></div>
            <div className="pluse h-[20px] w-[200px] rounded-2xl mt-[20px]"></div>
          </div>
          <div className="pluse h-[60px] w-[300px] rounded-2xl "></div>
        </div>
      </div>
    </>
  );
}

export default Comment;

function timeAgo(dateString: string): string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  const units: { label: string; seconds: number }[] = [
    { label: "yr", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hr", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const unit of units) {
    const amount: number = Math.floor(diffInSeconds / unit.seconds);
    if (amount >= 1) {
      return `${amount} ${unit.label}${amount > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
