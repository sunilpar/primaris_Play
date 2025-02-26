import React from "react";
import { Link } from "react-router-dom";
import strip from "../assets/strip.png";
import Featured from "@/components/home/Featured";

function Imperium() {
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
      <Featured />
      <div className="h-[5px] overflow-clip">
        <img src={strip} alt="" />
      </div>
    </>
  );
}

export default Imperium;
