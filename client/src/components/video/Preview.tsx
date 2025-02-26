import React from "react";
import vid1 from "../../assets/t_guillmuain.png";
import small from "../../assets/smalllogo.png";

// needs skeleton
function Preview() {
  return (
    <>
      <div className="video p-3">
        <div className="thumbnail bg-[#1b1b1d] rounded-2xl">
          <img className=" h-fit w-[374px] rounded-2xl" src={vid1} alt="" />
        </div>
        <div className="for title and avatar flex w-[374px] mt-2">
          <div className="avatar rounded-full mr-2 h-[60px] w-[60px] ">
            <img src={small} alt="" />
          </div>
          <div>
            <div className="title text-left w-[314px]  text-xl font-semibold">
              Guilliman to his emperor
            </div>
            <div className="channel and date flex opacity-75 ">
              <div className="channel name text-left ">Admin</div>
              <div className="date pl-[20px] text-left "> 7hr ago </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
