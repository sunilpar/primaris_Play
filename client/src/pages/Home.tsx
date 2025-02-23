import React from "react";
import { Link } from "react-router-dom";
import strip from "../assets/strip.png";

function Home() {
  return (
    <>
      <div className="min-h-screen flex justify-center">
        <Link to={"/test"}>
          <button>to test </button>
        </Link>
      </div>

      <div className="h-[5px] overflow-clip">
        <img src={strip} alt="" />
      </div>

      <div className="min-h-screen flex justify-center"></div>
    </>
  );
}

export default Home;
