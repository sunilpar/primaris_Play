import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoService from "@/backend/video";
import authService from "@/backend/auth";
import subService from "@/backend/sub";
import Home from "./Home";
import { Link } from "react-router-dom";

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
interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

function Video() {
  const [user, setUser] = useState<User | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setcount] = useState<number | null>(null);
  const [issubbed, setIssubbed] = useState<boolean | null>(null);
  var Loggedin = false;
  const slug = useParams();
  const id = slug.id || "";

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        var response = await videoService.getVideoById(id);
        setVideo(response);
        setLoading(false);
      } catch (error) {
        console.error("error while getting video \n", error);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (video?.owner) {
      getuser(video.owner);
      getsub(video.owner);
    }
  }, [video]);

  function getuser(userid: string) {
    (async () => {
      try {
        var response = await authService.getUserById(userid);
        if (response != null) {
          setUser(response);
        }
      } catch (error) {
        console.error("error while getting video \n", error);
      }
    })();
  }

  function getsub(channel_id: string) {
    (async () => {
      try {
        var response = await subService.getSubCount(channel_id);
        if (Loggedin) {
          var response1 = await subService.ifSubbed(channel_id);
          setIssubbed(response1);
        }

        setcount(response);
      } catch (error) {}
    })();
  }

  return !loading ? (
    <>
      <div className="video   ">
        <div className="playback min-w-[400px] w-full">
          <div className="rounded-2xl">
            <video
              src={video?.videofile}
              controls
              autoPlay
              className="w-full h-auto rounded-xl"
            ></video>
          </div>
          <div className="title like and logo ">
            <div className=" title text-left font-bold p-2 mt-4 text-2xl">
              {video?.title}
            </div>
            <div className="logo like flex flex-row justify-between">
              <div className="logo flex ">
                <Link to={`/channel/${video?.owner}`}>
                  <img
                    className="w-[60px] h-[60px] object-cover "
                    src={user?.avatar}
                    alt=""
                  />
                </Link>

                <Link to={`/channel/${video?.owner}`}>
                  <div className="flex flex-col">
                    <div className="channel_name mt-[7.4px] font-bold ">
                      {user?.username}
                    </div>
                    <div className="channel_sub text-sm opacity-70 ">
                      {count} subscribers
                    </div>
                  </div>
                </Link>
                <div className="subbtn  ml-[19.4px] mt-[14.2px] ">
                  <button className="rounded-xl text-black bg-amber-50 p-1.5 font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="like and stuff max-w-[500px] flex justify-between">
                <button className="rounded-xl bg-[#242526] p-1.5 font-semibold mt-[14.2px]">
                  like
                </button>
                <button className="rounded-xl bg-[#242526] p-1.5 font-semibold mt-[14.2px]">
                  Dislike
                </button>
                <button className="rounded-xl bg-[#242526] p-1.5 font-semibold mt-[14.2px]">
                  Share
                </button>
              </div>
            </div>
          </div>
          <div className="description"></div>
          <div className="comment"></div>
        </div>
        <div className="recommended w-full flex flex-wrap">
          <Home />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Video;
