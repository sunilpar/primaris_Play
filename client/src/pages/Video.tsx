import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoService from "@/backend/video";
import authService from "@/backend/auth";
import subService from "@/backend/sub";
import historyService from "@/backend/history";
import currentUser from "@/utils/Session.helper";

import Home from "./Home";
import Subscriberbtn from "@/components/video/Subscriberbtn";
import Likebtn from "@/components/video/Likebtn";
import Comment from "@/components/video/Comment";
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
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  const [video, setVideo] = useState<Video | null>(null);

  const [subcount, setSubcount] = useState<number | null>(null);
  const [issubbed, setIssubbed] = useState<boolean>(false);

  const [islogged, setIslogged] = useState<boolean>(false);
  const [loggeduser, setLoggeduser] = useState<User | null>(null);

  const slug = useParams();
  const id = slug.id || "";

  useEffect(() => {
    (async () => {
      try {
        const loggeduser = currentUser.isLogged();
        setIslogged(currentUser.isLogged());
        setLoading(true);

        var response = await videoService.getVideoById(id);
        if (loggeduser) {
          const response1 = await historyService.addHistory(id);
          setLoggeduser(currentUser.getData());
        }

        setVideo(response);
      } catch (error) {
        console.error("error while getting video \n", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (video?.owner) {
      getuser(video.owner);
      getsub(video.owner);
    }
  }, [video?.owner, id]);

  function getuser(userid: string) {
    (async () => {
      try {
        const response = await authService.getUserById(userid);
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
        const response1 = await subService.getSubCount(channel_id);
        // if (islogged) {
        //   const response2 = await subService.ifSubbed(channel_id);
        //   setIssubbed(response2);

        // }
        setSubcount(response1);
      } catch (error) {}
    })();
  }

  return !loading ? (
    <>
      <div className="video  flex flex-wrap justify-center gap-3 ">
        <div className="playback min-w-[400px] lg:w-[60%] sm:w-full mt-5">
          <div className="rounded-2xl ">
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
                <Link to={`/profile/${video?.owner}`}>
                  <img
                    className="w-[60px] h-[60px] object-cover "
                    src={user?.avatar}
                    alt=""
                  />
                </Link>

                <Link to={`/profile/${video?.owner}`}>
                  <div className="flex flex-col">
                    <div className="channel_name mt-[7.4px] font-bold ">
                      {user?.username}
                    </div>
                    <div className="channel_sub text-sm opacity-70 ">
                      {subcount} subscribers
                    </div>
                  </div>
                </Link>

                <Subscriberbtn />
                {video?.owner == loggeduser?.id && (
                  <div className="mt-2 ml-3 flex justify-center items-center ">
                    <Link to={`/edit/${id}`}>
                      <button className="bg-[#e7ba5d] px-4 py-2 rounded-2xl text-black font-bold">
                        Edit
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="like and stuff m-w-[500px]  flex ml-20  h-[50px]">
                <Likebtn video_id={id} />
              </div>
            </div>
          </div>
          <div className="description bg-[#242526] rounded-xl p-3 opacity-70 mt-7">
            {video?.description}
          </div>
          <div className="comment mt-7">
            <Comment video_id={id} />
          </div>
        </div>
        <div className="recommended flex flex-wrap lg:w-[300px]">
          <Home />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Video;
