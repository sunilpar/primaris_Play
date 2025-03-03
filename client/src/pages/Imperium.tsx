import React from "react";
import { Link } from "react-router-dom";
import strip from "../assets/strip.png";
import Featured from "@/components/home/Featured";
import Home from "./Home";

function Imperium() {
  return (
    <>
      <div className="min-h-screen flex justify-center"></div>

      <div className="h-[5px] overflow-clip">
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
  );
}

export default Imperium;
