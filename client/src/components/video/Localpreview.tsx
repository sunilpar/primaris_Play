import { Link } from "react-router-dom";

import small from "../../assets/smalllogo.png";

import video1 from "../../assets/gillimain.mp4";
import thumb1 from "../../assets/t_guilliman.jpg";

import video2 from "../../assets/Astartes II.mp4";
import thumb2 from "../../assets/t_astartes.png";

import video3 from "../../assets/horus.mp4";
import thumb3 from "../../assets/t_horus.png";

import video4 from "../../assets/necrons.mp4";
import thumb4 from "../../assets/t_necrons.jpg";

interface LocalVideoProps {
  name: string;
  title: string;
}

function Localpreview({ name, title }: LocalVideoProps) {
  var video = "";
  var Thumbnail = "";
  var Title = "";
  if (video) {
  }
  switch (name) {
    case "video1":
      (video = video1), (Thumbnail = thumb1), (Title = title);

      break;
    case "video2":
      (video = video2), (Thumbnail = thumb2), (Title = title);

      break;
    case "video3":
      (video = video3), (Thumbnail = thumb3), (Title = title);

      break;
    case "video4":
      (video = video4), (Thumbnail = thumb4), (Title = title);

      break;

    default:
      break;
  }

  return (
    <>
      <div className="video p-3 sm:justify-center ">
        <Link to={`/localvideo/${name}/${Title}`}>
          <div className="thumbnail bg-[#1b1b1d] rounded-2xl hover:scale-105">
            <img
              className=" h-fit max-w-[374px] rounded-2xl"
              src={Thumbnail}
              alt=""
            />
          </div>
        </Link>

        <div className="for title and avatar flex w-[374px] mt-2">
          <div className="avatar rounded-full mr-2 h-[60px] w-[60px] ">
            <img src={small} alt="" />
          </div>
          <div>
            <div className="title text-left w-[314px]  text-xl font-semibold">
              {Title}
            </div>
            <div className="channel and date flex opacity-75 ">
              <div className="channel name text-left ">Admin</div>
              <div className="date pl-[20px] text-left "> 40k hrs ago </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Localpreview;
