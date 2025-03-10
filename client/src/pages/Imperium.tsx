import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import strip from "../assets/strip.png";
import Featured from "@/components/home/Featured";
import Home from "./Home";
import sitevideo from "../assets/site_hero_vid_mute.mp4";
import emperor from "../assets/h_e_emperor.png";
import lion from "../assets/h_Lion El’Jonson.png";
import guilliman from "../assets/h_Guilliman.png";
import Leman_Russ from "../assets/h_Leman Russ_e_y.png";
import sanguinius from "../assets/h_sanguinius.png";

import currentUser from "@/utils/Session.helper";
import Spinner from "@/components/skeleton/Spinner";
import DecryptedText from "@/blocks/TextAnimations/DecryptedText/DecryptedText";
import authService from "@/backend/auth";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

function Imperium() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [Loggedin, setLoggedin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".E", {
      scrollTrigger: {
        trigger: ".E",
        scrub: 1,
      },
      scale: 1.5,
      duration: 1,
    });

    gsap.to(".s", {
      scrollTrigger: {
        trigger: ".s",
        scrub: 1,
      },
      y: -125,
      duration: 1,
    });

    gsap.to(".l", {
      scrollTrigger: {
        trigger: ".l",
        scrub: 1,
      },
      y: 50,
      duration: 1,
    });

    gsap.to(".L", {
      scrollTrigger: {
        trigger: ".L",
        scrub: 1,
      },
      y: -100,
      duration: 1,
    });

    gsap.to(".g", {
      scrollTrigger: {
        trigger: ".g",
        scrub: 1,
      },
      y: -125,
      duration: 1,
    });
  });

  useEffect(() => {
    try {
      const user = currentUser.getData();
      if (user) {
        setLoading(true);
        setLoggedin(currentUser.isLogged());
      } else {
        console.log(" user isn't logged in ");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  async function loginastester() {
    try {
      const response = await authService.Login("test@gmail.com", "12345678");
      console.log("Login response:", response);

      if (response) {
        setUser(response);
        currentUser.putData(response);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  }

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
        <div className="z-13  w-full flex flex-col justify-center font-display ">
          <div className=" flex justify-center mt-[92px] mb-[-102px]">
            <div className="flex flex-col font-bold text-2xl lg:text-5xl p-2 drop-shadow-lg text-[#fcd58d] ">
              <DecryptedText
                text="They are the Defenders of Humanity. "
                characters="ŀŋľþøŧĳ"
                speed={30}
                maxIterations={5}
                sequential
                revealDirection="start"
                className="text-left  "
                animateOn="view"
              />
              <DecryptedText
                text="They are my Space Marines And "
                characters="ŀŋľþøŧĳ"
                speed={70}
                maxIterations={5}
                sequential
                revealDirection="start"
                className="text-left"
                animateOn="view"
              />
              <DecryptedText
                text="They Shall know No Fear."
                characters="ŀŋľþøŧĳ"
                speed={80}
                maxIterations={5}
                sequential
                revealDirection="start"
                className="text-left"
                animateOn="view"
              />
            </div>
          </div>
          {Loggedin ? (
            <>
              <div className="mb-[-171px] mt-[125px] flex justify-start w-full font-secondary">
                <Link to={"/search/NA"}>
                  <button className="px-3 py-2 lg:ml-[340px] ml-5 bg-black text-white font-bold rounded-md ring-2 ring-[#fcd58d] transition duration-300 ease-in-out transform hover:ring-3 hover:ring-[#fcd58d] hover:shadow-lg hover:shadow-yellow-500/50">
                    search
                  </button>
                </Link>
                <Link to={"/upload"}>
                  <button className="px-3 py-2 ml-[16.8px] bg-black text-white font-bold rounded-md ring-2 ring-[#fcd58d] transition duration-300 ease-in-out transform hover:ring-3 hover:ring-[#fcd58d] hover:shadow-lg hover:shadow-yellow-500/50">
                    Upload a video
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="mb-[-171px] mt-[125px] flex justify-start w-full font-secondary">
                <Link to={"/login"}>
                  <button className="px-3 py-2 lg:ml-[340px] ml-5 bg-black text-white font-bold rounded-md ring-2 ring-[#fcd58d] transition duration-300 ease-in-out transform hover:ring-3 hover:ring-[#fcd58d] hover:shadow-lg hover:shadow-yellow-500/50">
                    Login
                  </button>
                </Link>

                <button
                  onClick={() => loginastester()}
                  className="px-3 py-2 ml-[16.8px] bg-black text-white font-bold rounded-md ring-2 ring-[#fcd58d] transition duration-300 ease-in-out transform hover:ring-3 hover:ring-[#fcd58d] hover:shadow-lg hover:shadow-yellow-500/50"
                >
                  Login as Tester
                </button>
              </div>
            </>
          )}
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent z-12 "></div>
        <div className="relative w-full  mx-auto overflow-hidden h-[700px] flex justify-center ">
          {/* Sanguinius */}
          <div className="absolute left-[0.8px] top-[346px] z-0 s">
            <img
              className="w-[749px] h-[479px] min-w-[749px]"
              src={sanguinius}
              alt="Sanguinius"
            />
          </div>

          {/* Leman Russ */}
          <div className="absolute left-[269px] top-[314px] z-1 l">
            <img
              className="w-[557px] h-[513px] max-w-[100vw]"
              src={Leman_Russ}
              alt="Leman Russ"
            />
          </div>

          {/* Emperor */}
          <div className="absolute left-[658px] top-[251px] z-0 E">
            <img
              className="w-[341px] h-[576px] max-w-[100vw]"
              src={emperor}
              alt="Emperor"
            />
          </div>

          {/* Lion */}
          <div className="absolute left-[915px] top-[146px] z-0 L">
            <img
              className="w-[359px] h-[682px] max-w-[100vw]"
              src={lion}
              alt="Lion"
            />
          </div>

          {/* Guilliman */}
          <div className="absolute left-[1055px] top-[347px] z-0 g">
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
