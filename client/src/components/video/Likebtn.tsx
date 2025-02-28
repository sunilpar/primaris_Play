import React, { useEffect, useState } from "react";
import likesService from "@/backend/likes";
interface LikebtnProps {
  video_id: string;
}

function Likebtn({ video_id }: LikebtnProps) {
  const [isliked, setLike] = useState<boolean>(false);
  const [likecount, setLikecount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (video_id) {
      setLoading(true);
      getlikes(video_id);
      setLoading(false);
    }
  }, [video_id, isliked]);

  function getlikes(video_id: string) {
    (async () => {
      try {
        setLoading(true);
        const response = await likesService.getLikes(video_id);
        setLoading(false);
        if (response != null) {
          setLikecount(response);
        }
      } catch (error) {
        console.error("error while getting likes \n", error);
      }
    })();
  }

  function like() {
    (async () => {
      try {
        setLoading(true);
        const response = await likesService.addLike(video_id);
        setLoading(false);
        if (response != null) {
          setLike(true);
        }
      } catch (error) {
        console.error("error while getting video \n", error);
      }
    })();
  }

  function unlike() {
    (async () => {
      try {
        setLoading(true);
        const response = await likesService.removeLike(video_id);
        setLoading(false);
        if (response != null) {
          setLike(false);
        }
      } catch (error) {
        console.error("error while removing like \n", error);
      }
    })();
  }
  return !loading ? (
    <>
      {!isliked && (
        <button
          onClick={() => like()}
          className="rounded-l-full bg-[#242526] hover:bg-[#525353] hover:scale-105  px-3 font-semibold mt-[14.2px] opacity-60"
        >
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="30px"
            height="30px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <style type="text/css"> </style>{" "}
              <g>
                {" "}
                <path
                  className="st0"
                  d="M462.938,198.933c-9.688,0-43.437,0-92.562,0c-39.5,0-47.094-6.656-47.094-17.297 c0-12.156,19.75-33.406,24.313-41.016c4.563-7.594,33.422-33.406,39.5-71.391s-39.5-65.328-54.688-39.5 c-9.016,15.328-31.906,60.766-59.25,80.516c-50.719,36.641-92.672,116.391-145.516,116.391v199.281 c43.547,0,142.203,48.406,177.156,55.406c39.578,7.922,91.297,25.406,118.75-11.875c16.921-22.984,43.437-112.219,63.343-175.5 C537.376,245.448,502.517,198.933,462.938,198.933z"
                ></path>{" "}
                <path
                  className="st0"
                  d="M0.001,265.401v173.203c0,21.406,17.344,38.766,38.75,38.766h22.031c14.266,0,25.844-11.563,25.844-25.844 V226.636H38.751C17.345,226.636,0.001,243.995,0.001,265.401z"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          {likecount}
        </button>
      )}
      {isliked && (
        <button
          onClick={() => unlike()}
          className="rounded-l-full bg-[#242526] disabled:cursor-not-allowed hover:bg-[#525353] hover:scale-105  px-3 font-semibold mt-[14.2px] opacity-100"
        >
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="30px"
            height="30px"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <style type="text/css"> </style>{" "}
              <g>
                {" "}
                <path
                  className="st0"
                  d="M462.938,198.933c-9.688,0-43.437,0-92.562,0c-39.5,0-47.094-6.656-47.094-17.297 c0-12.156,19.75-33.406,24.313-41.016c4.563-7.594,33.422-33.406,39.5-71.391s-39.5-65.328-54.688-39.5 c-9.016,15.328-31.906,60.766-59.25,80.516c-50.719,36.641-92.672,116.391-145.516,116.391v199.281 c43.547,0,142.203,48.406,177.156,55.406c39.578,7.922,91.297,25.406,118.75-11.875c16.921-22.984,43.437-112.219,63.343-175.5 C537.376,245.448,502.517,198.933,462.938,198.933z"
                ></path>{" "}
                <path
                  className="st0"
                  d="M0.001,265.401v173.203c0,21.406,17.344,38.766,38.75,38.766h22.031c14.266,0,25.844-11.563,25.844-25.844 V226.636H38.751C17.345,226.636,0.001,243.995,0.001,265.401z"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          {likecount}
        </button>
      )}
    </>
  ) : (
    <>
      <div className="rounded-l-full bg-[#242526] hover:bg-[#525353] hover:scale-105  px-6 font-semibold mt-[14.2px] opacity-60"></div>
    </>
  );
}

export default Likebtn;
