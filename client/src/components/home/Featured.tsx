import React from "react";
import Particles from "@/blocks/Backgrounds/Particles/Particles";
import vid1 from "../../assets/t_guillmuain.png";
import small from "../../assets/smalllogo.png";

import Preview from "../video/Preview";

function Featured() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full h-screen absolute z--10 opacity-100">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="flex justify-center flex-wrap items-center ">
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
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </div>
    </div>
  );
}

export default Featured;
