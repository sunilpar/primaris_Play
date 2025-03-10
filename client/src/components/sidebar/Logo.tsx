import logo from "../../assets/h_logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to={"/"}>
        <div className="mt-3.5 pb-6 flex justify-center absolute top-[-20px] left-[-76px] z-50 ">
          <div className="sticky">
            <img className="h-[71px] w-[196px]" src={logo} alt="" />
          </div>
        </div>
      </Link>
    </>
  );
}

export default Logo;
