import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "@/backend/auth";
import currentUser from "@/utils/Session.helper";
interface Video {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  created: string;
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

const Preview: React.FC<{ video: Video }> = ({ video }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [_islogged, setIslogged] = useState<boolean>(false);
  const [loggeduser, setLoggeduser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const loggeduser = currentUser.isLogged();
        setIslogged(currentUser.isLogged());
        const response = await authService.getUserById(video.owner);

        if (response != null) {
          setUser(response);
          if (loggeduser) {
            setLoggeduser(currentUser.getData());
          }
        }
      } catch (error) {
        console.error("error while getting video \n", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return !loading ? (
    <>
      <div className="video p-3">
        <Link to={`/video/${video.id}`}>
          <div className="thumbnail bg-[#1b1b1d] rounded-2xl overflow-hidden hover:scale-105">
            <img
              className="w-[374px] h-[200px] object-cover scale-125"
              src={video.thumbnail}
              alt="Video Thumbnail"
            />
          </div>
        </Link>

        <div className="for title and avatar flex w-[374px] mt-2">
          <div className=" rounded-full ">
            <Link to={`/profile/${user?.id}`}>
              <img
                className="avatar rounded-full mr-2 h-[50px] w-[50px] object-cover "
                src={user?.avatar}
                alt=""
              />
            </Link>
          </div>
          <div className="pl-2">
            <div className="title text-left w-[314px]  text-xl font-semibold font-secondary">
              {video.title}
            </div>
            <div className="channel and date flex opacity-75 ">
              <Link to={`/profile/${user?.id}`}>
                <div className="channel name text-left font-secondary">
                  {user?.username}
                </div>
              </Link>

              <div className="date pl-[20px] text-left ">
                {timeAgo(video.created)}
              </div>
              {video?.owner == loggeduser?.id && (
                <div className="ml-25 ">
                  <Link to={`/edit/${video.id}`}>
                    <button className="bg-[#e7ba5d] px-[6.2px]   py-[1.2px] rounded-xl text-black font-bold">
                      Edit
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="video p-3">
        <div className="thumbnail pluse rounded-2xl overflow-hidden h-[200px]"></div>

        <div className="for title and avatar flex w-[374px] mt-2">
          <div className="bg-[#1b1b1d] rounded-full "></div>
          <div className="pl-2">
            <div className="title text-left w-[314px] bg-[#1b1b1d] text-xl font-semibold"></div>
            <div className="channel and date flex opacity-75 ">
              <div className="channel name text-left bg-[#1b1b1d] "></div>
              <div className="date pl-[20px] h-[50px] w-[300px] "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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

export default Preview;
