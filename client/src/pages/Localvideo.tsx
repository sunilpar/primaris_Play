import { useEffect } from "react";
import { useParams } from "react-router-dom";
import small from "../assets/smalllogo.png";
import Localpreview from "@/components/video/Localpreview";
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
      <div className="video  flex flex-wrap justify-center gap-3">
        <div className="playback min-w-[400px] lg:w-[60%] sm:w-full mt-5">
          <div className="rounded-2xl ">
            <video
              src={video}
              controls
              autoPlay
              className="w-full h-auto rounded-xl"
            ></video>
          </div>
          <div className="title like and logo ">
            <div className=" title text-left font-bold p-2 mt-4 text-2xl">
              {title}
            </div>
            <div className="logo like flex flex-row justify-between">
              <div className="logo flex ">
                <img
                  className="w-[60px] h-[60px] object-cover "
                  src={small}
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="channel_name mt-[7.4px] font-bold ">
                    Admin
                  </div>
                  <div className="channel_sub text-sm opacity-70 ">
                    10 Bil subscribers
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-wrap items-center  z-10">
            <Home />
          </div>
        </div>

        <div className="recommended flex flex-wrap lg:w-[300px] justify-start flex-col">
          <Localpreview name={"video1"} title={"Guilliman to his Emperor"} />
          <Localpreview name={"video2"} title={"Emperor's Angels"} />
          <Localpreview name={"video3"} title={"The heretic son Horus"} />
          <Localpreview name={"video4"} title={"Ancient enemy"} />
        </div>
      </div>
    </>
  );
}

export default Localvideo;
