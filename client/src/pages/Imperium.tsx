import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import strip from "../assets/strip.png";
import Featured from "@/components/home/Featured";
import Home from "./Home";
import sitevideo from "../assets/site_hero_vid_mute.mp4";
import emperor from "../assets/h_emperor.png";
import lion from "../assets/h_Lion El’Jonson.png";
import guilliman from "../assets/h_Guilliman.png";
import Leman_Russ from "../assets/h_Leman Russ_e_y.png";
import sanguinius from "../assets/h_sanguinius.png";

import currentUser from "@/utils/Session.helper";
import Spinner from "@/components/skeleton/Spinner";
import DecryptedText from "@/blocks/TextAnimations/DecryptedText/DecryptedText";

function Imperium() {
  const [Loggedin, setLoggedin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const user = currentUser.getData();
      if (user) {
        setLoading(true);
        setLoggedin(currentUser.isLogged);
      } else {
        console.log(" user isn't logged in ");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return !loading ? (
    <>
      <div className="relative min-h-screen flex flex-col justify-center  ">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={sitevideo}
          autoPlay
          loop
          muted
        />
        <div className="z-13  w-full flex flex-col justify-center  ">
          <div className=" flex justify-center mt-[92px] mb-[-102px]">
            <div className="flex flex-col  font-bold text-2xl lg:text-5xl ">
              <DecryptedText
                text="They are the Defenders of Humanity. "
                characters="111!XZK"
                speed={20}
                maxIterations={5}
                sequential
                revealDirection="start"
                className="text-left"
                animateOn="hover"
              />
              <DecryptedText
                text="They are my Space Marines And "
                characters="111!XZK"
                speed={20}
                maxIterations={5}
                sequential
                revealDirection="start"
                className="text-left"
                animateOn="hover"
              />
              <DecryptedText
                text="They shall know no fear."
                characters="111!XZK"
                speed={20}
                maxIterations={5}
                sequential
                revealDirection="start"
                className="text-left"
                animateOn="hover"
              />
            </div>
          </div>
          <div className=" mb-[-171px] mt-[125px] flex sm:justify-center justify-start w-full">
            <button className=" p-2 hover:bg-[#c4ab88] bg-[#c1a479] text-black font-bold rounded-md">
              Login
            </button>
            <button className=" p-2 ml-[100px] hover:bg-[#c4ab88] bg-[#c1a479] text-black font-bold rounded-md">
              Login
            </button>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent z-12 "></div>
        <div className="relative w-full  mx-auto overflow-hidden h-[700px] flex justify-center">
          {/* Sanguinius */}
          <div className="absolute left-[0.8px] top-[346px] z-0">
            <img
              className="w-[749px] h-[479px] min-w-[749px]"
              src={sanguinius}
              alt="Sanguinius"
            />
          </div>

          {/* Leman Russ */}
          <div className="absolute left-[269px] top-[314px] z-1">
            <img
              className="w-[557px] h-[513px] max-w-[100vw]"
              src={Leman_Russ}
              alt="Leman Russ"
            />
          </div>

          {/* Emperor */}
          <div className="absolute left-[658px] top-[251px] z-0">
            <img
              className="w-[341px] h-[576px] max-w-[100vw]"
              src={emperor}
              alt="Emperor"
            />
          </div>

          {/* Lion */}
          <div className="absolute left-[915px] top-[146px] z-0">
            <img
              className="w-[359px] h-[682px] max-w-[100vw]"
              src={lion}
              alt="Lion"
            />
          </div>

          {/* Guilliman */}
          <div className="absolute left-[1055px] top-[347px] z-0">
            <img
              className="w-[615px] h-[480px] max-w-[100vw]"
              src={guilliman}
              alt="Guilliman"
            />
          </div>
        </div>
      </div>

      <div className="h-[5px] overflow-clip z-20">
        <img src={strip} alt="" />
      </div>
      <Featured />
      <div className="h-[5px] overflow-clip">
        <img src={strip} alt="" />
      </div>
      <div className="mt-6">
        <Home />
      </div>
    </>
  ) : (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <Spinner />
      </div>
    </>
  );
}

export default Imperium;
