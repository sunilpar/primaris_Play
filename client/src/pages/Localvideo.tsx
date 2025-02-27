import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import small from "../assets/smalllogo.png";

import Home from "./Home";

import video1 from "../assets/gillimain.mp4";
import video2 from "../assets/Astartes II.mp4";
import video3 from "../assets/horus.mp4";
import video4 from "../assets/necrons.mp4";

function Localvideo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slug = useParams();
  const src = slug.src;
  const title = slug.title;
  console.log(title);

  var video = "";
  switch (src) {
    case "video1":
      video = video1;

      break;
    case "video2":
      video = video2;

      break;
    case "video3":
      video = video3;

      break;
    case "video4":
      video = video4;

      break;

    default:
      break;
  }

  return (
    <>
      <div className="video  p-2 ">
        <div className="playback min-w-[400px] w-full">
          <div className="rounded-2xl">
            <video
              src={video}
              controls
              autoPlay
              className="max-w-full h-auto rounded-xl"
            ></video>
          </div>
          <div className="title like and logo ">
            <div className=" title text-left font-bold p-2 mt-4 text-2xl">
              {title}
            </div>
            <div className="logo like flex flex-row justify-between">
              <div className="logo flex ">
                <img className="w-[60px] h-[60px]" src={small} alt="" />
                <div className="flex flex-col">
                  <div className="channel_name mt-[7.4px] font-bold ">
                    Admin
                  </div>
                  <div className="channel_sub text-sm opacity-70 ">
                    10Bil subscribers
                  </div>
                </div>
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
  );
}

export default Localvideo;
