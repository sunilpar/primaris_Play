import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Sidebar() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen sticky top-0 ">
        <div className="">
          <Link to={"/"}>
            <div className="mt-3.5 pb-6 flex justify-center">
              <img src={logo} alt="" />
            </div>
          </Link>

          <Link to={"/"}>
            <div className=" flex justify-center">home </div>
          </Link>
        </div>

        <div>
          <div className="">about</div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
