import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoService from "@/backend/video";
import authService from "@/backend/auth";
import subService from "@/backend/sub";

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
  const [user, setUser] = useState<User | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subcount, setSubcount] = useState<number | null>(null);
  const [issubbed, setIssubbed] = useState<boolean>(false);
  const [islogged, setIslogged] = useState<boolean>(false);
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
        if (Loggedin) {
          const response2 = await subService.ifSubbed(channel_id);
          setIssubbed(response2);
        }

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
              </div>
              <div className="like and stuff m-w-[500px]  flex ml-20  h-[50px]">
                <Likebtn video_id={id} />

                <button className="rounded-r-full bg-[#242526] hover:bg-[#525353] hover:scale-105 px-3 py-1 font-semibold mt-[14.2px] opacity-60">
                  <svg
                    fill="#ffffff"
                    width="30px"
                    height="30px"
                    viewBox="0 -1.5 27 27"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="m10.355 23.783c-.191-.092-.354-.189-.506-.299l.01.007-.106-.071c-.241-.127-.421-.341-.501-.599l-.002-.007c-.188-.696-.358-1.328-.518-1.964l-.066-.259c-.101-.339-.188-.75-.244-1.171l-.005-.043c.172-1.574.501-3.011.976-4.378l-.042.138-7.692.012c-.008 0-.017 0-.027 0-.908 0-1.644-.736-1.644-1.644 0-.068.004-.136.012-.202l-.001.008c-.002-.037-.004-.079-.004-.122 0-.696.358-1.308.901-1.663l.008-.005c-.236-.345-.377-.771-.377-1.231 0-.057.002-.114.006-.17v.007c-.005-.049-.007-.107-.007-.165 0-.77.472-1.429 1.142-1.706l.012-.004c-.19-.337-.302-.74-.302-1.169 0-.048.001-.095.004-.142v.006c-.003-.037-.004-.079-.004-.123 0-.679.355-1.274.889-1.612l.008-.005c-.153-.337-.242-.73-.242-1.145 0-.107.006-.213.018-.317l-.001.013v-.185c.058-.966.855-1.727 1.83-1.727.06 0 .119.003.177.008l-.007-.001h10.373c.051 0 .105 0 .16-.007.068-.005.14-.01.214-.01h.016c.104 0 .204.014.299.04l-.008-.002c.186.063.348.147.493.253l-.005-.004.1.063c.234.144.462.298.69.451l.102.072c.131.094.194.136.262.133.24-.005.48-.007.72-.01v9.155l.013.769c-.451.288-.867.56-.993.664-.169.341-.337.628-.523.901l.017-.026c-.085.134-.17.265-.248.4l-1.729 2.89c-.08.136-.167.271-.254.407-.164.26-.329.52-.465.79-.056.114-.089.247-.089.389 0 .045.003.089.01.132l-.001-.005.006 3.12c-.062.454-.318.839-.679 1.074l-.006.004c-.31.279-.712.462-1.155.499h-.007-.086c-.335-.003-.65-.083-.931-.222l.012.006zm7.76-10.757v-13.026h7.015.001c.17 0 .31.13.326.295v.001l1.218 12.368c.001.01.002.021.002.032 0 .182-.147.329-.329.329zm3.624-1.76c0 .181.147.328.328.328h2.511c.182 0 .329-.147.329-.329s-.147-.329-.329-.329h-2.51c-.181 0-.328.146-.328.327zm-1.873 0c0 .181.147.328.328.328h.774c.182 0 .329-.147.329-.329s-.147-.329-.329-.329h-.774c-.181 0-.327.147-.327.327zm-.694-8c0 .718.582 1.299 1.3 1.299s1.3-.582 1.3-1.3-.582-1.3-1.3-1.3c-.717.001-1.298.583-1.299 1.3zm.657 0c0-.353.287-.64.64-.64s.64.287.64.64-.287.64-.64.64c-.353 0-.639-.287-.639-.64v-.001z"></path>
                    </g>
                  </svg>
                </button>
                <button className="rounded-xl ml-5 bg-[#242526] hover:bg-[#525353] hover:scale-105 px-1 font-semibold mt-[14.2px] opacity-60">
                  <svg
                    width="30px"
                    height="30px"
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 18.5088C1 13.1679 4.90169 8.77098 9.99995 7.84598V5.51119C9.99995 3.63887 12.1534 2.58563 13.6313 3.73514L21.9742 10.224C23.1323 11.1248 23.1324 12.8752 21.9742 13.7761L13.6314 20.2649C12.1534 21.4144 10 20.3612 10 18.4888V16.5189C7.74106 16.9525 5.9625 18.1157 4.92778 19.6838C4.33222 20.5863 3.30568 20.7735 2.55965 20.5635C1.80473 20.3511 1.00011 19.6306 1 18.5088ZM12.4034 5.31385C12.2392 5.18613 11.9999 5.30315 11.9999 5.51119V9.41672C11.9999 9.55479 11.8873 9.66637 11.7493 9.67008C8.09094 9.76836 4.97774 12.0115 3.66558 15.1656C3.46812 15.6402 3.31145 16.1354 3.19984 16.6471C3.07554 17.217 3.00713 17.8072 3.00053 18.412C3.00018 18.4442 3 18.4765 3 18.5088C3.00001 18.6437 3.18418 18.6948 3.25846 18.5822C3.27467 18.5577 3.29101 18.5332 3.30747 18.5088C3.30748 18.5088 3.30746 18.5088 3.30747 18.5088C3.63446 18.0244 4.01059 17.5765 4.42994 17.168C4.71487 16.8905 5.01975 16.6313 5.34276 16.3912C7.05882 15.1158 9.28642 14.3823 11.7496 14.3357C11.8877 14.3331 12 14.4453 12 14.5834V18.4888C12 18.6969 12.2393 18.8139 12.4035 18.6862L20.7463 12.1973C20.875 12.0973 20.875 11.9028 20.7463 11.8027L12.4034 5.31385Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
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
