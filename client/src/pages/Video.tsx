import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoService from "@/backend/video";
import authService from "@/backend/auth";
import subService from "@/backend/sub";
import historyService from "@/backend/history";
import currentUser from "@/utils/Session.helper";
import Popplaylist from "@/components/usersettings/Popplaylist";

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
const message = "to like";
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
        setSubcount(response1);
      } catch (error) {}
    })();
  }

  return !loading ? (
    <>
      <div className="video  flex flex-wrap justify-center gap-3 font-secondary">
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
            <div className="logo like flex flex-row justify-between flex-wrap">
              <div className="logo flex ">
                <Link to={`/profile/${video?.owner}`}>
                  <img
                    className="w-[60px] h-[60px] object-cover min-w-[60px] "
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

                {video?.owner == loggeduser?.id ? (
                  <div className="mt-2 ml-3 flex justify-center items-center ">
                    <Link to={`/edit/${id}`}>
                      <button className="bg-[#e7ba5d] px-4 py-2 rounded-2xl text-black font-bold">
                        Edit
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Subscriberbtn
                    islogged={islogged}
                    ch_id={video?.owner || ""}
                  />
                )}
              </div>
              {islogged ? (
                <div className="like and stuff   flex lg:ml-20  h-[50px]">
                  <Likebtn video_id={id} islogged={islogged} />
                </div>
              ) : (
                <Link to={`/login`}>
                  <div className="flex">
                    <div className="like and stuff   flex lg:ml-20  h-[50px]">
                      <button className="rounded-l-full bg-[#242526] hover:bg-[#525353] hover:scale-105  px-3 font-semibold mt-[14.2px] opacity-60">
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
                      </button>
                    </div>
                    <div>
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
                    </div>
                    <div>
                      <button className=" hover:scale-105 rounded-2xl opacity-70 mt-[18px] ml-5 ">
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 -0.5 21 21"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
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
                            <title>plus_circle [#ffffff1427]</title>{" "}
                            <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                            <g
                              id="Page-1"
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              {" "}
                              <g
                                id="Dribbble-Light-Preview"
                                transform="translate(-179.000000, -600.000000)"
                                fill="#ffffff"
                              >
                                {" "}
                                <g
                                  id="icons"
                                  transform="translate(56.000000, 160.000000)"
                                >
                                  {" "}
                                  <path
                                    d="M137.7,450 C137.7,450.552 137.2296,451 136.65,451 L134.55,451 L134.55,453 C134.55,453.552 134.0796,454 133.5,454 C132.9204,454 132.45,453.552 132.45,453 L132.45,451 L130.35,451 C129.7704,451 129.3,450.552 129.3,450 C129.3,449.448 129.7704,449 130.35,449 L132.45,449 L132.45,447 C132.45,446.448 132.9204,446 133.5,446 C134.0796,446 134.55,446.448 134.55,447 L134.55,449 L136.65,449 C137.2296,449 137.7,449.448 137.7,450 M133.5,458 C128.86845,458 125.1,454.411 125.1,450 C125.1,445.589 128.86845,442 133.5,442 C138.13155,442 141.9,445.589 141.9,450 C141.9,454.411 138.13155,458 133.5,458 M133.5,440 C127.70085,440 123,444.477 123,450 C123,455.523 127.70085,460 133.5,460 C139.29915,460 144,455.523 144,450 C144,444.477 139.29915,440 133.5,440"
                                    id="plus_circle-[#ffffff1427]"
                                  >
                                    {" "}
                                  </path>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              )}
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
