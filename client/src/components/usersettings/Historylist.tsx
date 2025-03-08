import React, { useEffect, useState } from "react";
import videoService from "@/backend/video";
import { Link } from "react-router-dom";
import historyService from "@/backend/history";
interface Video {
  id: string;
  videofile: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  ispublic: boolean;
  created: string;
}

type Props = {
  video_uid: string;
  disable: boolean;
};

function Historylist({ video_uid, disable }: Props) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await videoService.getVideoById(video_uid);

        if (response != null) {
          setVideo(response);
        }
      } catch (error) {
        console.error("error while getting video \n", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function removehistory() {
    (async () => {
      try {
        setLoading(true);
        const response = await historyService.removeHistory(video_uid);
        setLoading(false);
        if (response) {
          location.reload();
        }
        console.log("res from server", response);
      } catch (error) {}
    })();
  }

  return !loading ? (
    <>
      <div className="flex flex-wrap">
        <div className="img">
          <Link to={`/video/${video?.id}`}>
            <div className="thumbnail bg-[#1b1b1d] rounded-2xl overflow-hidden hover:scale-105">
              <img
                className="w-[278px] h-[154px] object-cover scale-125"
                src={video?.thumbnail}
                alt="Video Thumbnail"
              />
            </div>
          </Link>
        </div>
        <div className="deatils flex flex-col justify-between">
          <div className="flex flex-col ">
            <div className="pl-2">
              <div className="title text-left w-[314px]  text-xl font-semibold">
                {video?.title}
              </div>
              <div className="channel and date flex opacity-75 mb-10">
                <div className="date pl-[20px] text-left ">
                  {timeAgo(video?.created || "")}
                </div>
              </div>
              <div className="channel-and-date flex opacity-75">
                <div className="date  max-w-[300px] truncate overflow-hidden text-left whitespace-nowrap">
                  {video?.description}
                </div>
              </div>
            </div>
          </div>
          {!disable && (
            <div className="flex lg:justify-end sm:justify-start">
              <button onClick={() => removehistory()}>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>delete history</title>
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10 12V17"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M14 12V17"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M4 7H20"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-wrap">
        <div className="img">
          <div className="thumbnail pluse rounded-2xl overflow-hidden ">
            <div className="w-[278px] h-[154px] object-cover scale-125" />
          </div>
        </div>
        <div className="deatils">
          <div className="pl-2">
            <div className="title text-left w-[314px] h-[20px] rounded-2xl pluse  text-xl font-semibold"></div>

            <div className="channel and date flex opacity-75 mt-10">
              <div className="date pl-[20px] text-left w-[280px] h-[20px] rounded-2xl pluse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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

export default Historylist;
