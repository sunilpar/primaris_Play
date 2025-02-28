import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import currentUser from "@/utils/Session.helper";
interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

function Sidebar() {
  const [Loggedin, setLoggedin] = useState<boolean>(false);
  const [ioading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const user = currentUser.getData();
      if (user) {
        setLoggedin(true);
        setUser(user);
      } else {
        console.log(" user isn't logged in ");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen sticky top-0 ">
        <div className="">
          <Link to={"/"}>
            <div className="mt-11 pb-6 flex justify-center scale-200">
              <img className="" src={logo} alt="" />
            </div>
          </Link>

          <Link to={"/home"}>
            <div className=" flex justify-center opacity-70 hover:scale-125">
              <svg
                fill="#ffffff"
                width="60px"
                height="60px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Home</title>
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z"></path>
                </g>
              </svg>
            </div>
          </Link>

          <Link to={"/search/NA"}>
            <div className=" flex justify-center opacity-70 hover:scale-125">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <title>search</title>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
          </Link>

          {!Loggedin && (
            <Link to={"/login"}>
              <div className=" flex justify-center opacity-70 hover:scale-125">
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>login</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L8.41421 17C7.63316 17.7811 6.36683 17.781 5.58579 17L6.29289 16.2929L5.58579 17L2.29289 13.7071C1.90237 13.3166 1.90237 12.6834 2.29289 12.2929C2.68342 11.9024 3.31658 11.9024 3.70711 12.2929L7 15.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289ZM21.7071 7.29289C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071C10.9024 17.3166 10.9024 16.6834 11.2929 16.2929L20.2929 7.29289C20.6834 6.90237 21.3166 6.90237 21.7071 7.29289Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </Link>
          )}

          {!Loggedin && (
            <Link to={"/signup"} title="signup">
              <div className=" flex justify-center opacity-70 hover:scale-125">
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>signup</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </Link>
          )}

          {Loggedin && (
            <Link to={`/profile/${user?.id}`}>
              <div
                className=" flex justify-center opacity-70 hover:scale-125 hover:opacity-100 mt-5 rounded-full"
                title="user details"
              >
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={user?.avatar}
                  alt=""
                />
              </div>
            </Link>
          )}

          {Loggedin && (
            <Link to={`/history`}>
              <div className=" flex justify-center opacity-70 hover:scale-125 mt-5">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>History</title>
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z"
                      fill="#ffffff"
                    ></path>{" "}
                    <path
                      d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </Link>
          )}
        </div>

        {/* below */}

        <div>
          {Loggedin && (
            <Link to={"/logout"}>
              <button onClick={() => setLoggedin(false)}>
                <div className=" flex justify-center opacity-70 hover:scale-125">
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Logout</title>
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M10.5 12L17 12"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M14.5 9L17 12"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M14.5 15L17 12"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M17 17C17 19.2091 15.2091 20 13 20H10C7.79086 20 6 18.2091 6 16V8C6 5.79086 7.79086 4 10 4H13C15.2091 4 17 4.79086 17 7"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </button>
            </Link>
          )}

          {Loggedin && (
            <Link to={"/settings"}>
              <div className=" flex justify-center opacity-70 hover:scale-125">
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="m4.929 4.93.001-.002.002.001.527-.528a.575.575 0 0 1 .786-.025l1.21 1.061c.332.305.774.492 1.26.492.514 0 .98-.21 1.316-.548.318-.32.52-.754.539-1.235h.004l.105-1.607a.575.575 0 0 1 .574-.537h.746V2v.002h.747c.303 0 .554.235.574.537l.105 1.607h.005c.019.484.223.92.544 1.24.336.335.8.543 1.312.543.492 0 .94-.192 1.272-.504l1.196-1.05a.575.575 0 0 1 .786.026l.528.528.002-.002v.002l-.001.002.528.527a.575.575 0 0 1 .026.786l-1.06 1.212a1.85 1.85 0 0 0-.492 1.258c0 .515.21.98.548 1.317.32.318.753.52 1.235.539v.004l1.606.105c.303.02.538.271.538.574V12H22v.002h-.002v.746a.575.575 0 0 1-.537.574l-1.607.107v.001c-.484.02-.92.223-1.24.544-.335.336-.543.8-.543 1.312 0 .486.187.928.493 1.26h-.002l1.062 1.211c.2.228.188.572-.026.786l-.528.528v.002h-.001l-.528.527a.575.575 0 0 1-.785.026l-1.168-1.021a1.851 1.851 0 0 0-1.302-.534c-.515 0-.98.21-1.317.548-.318.32-.52.755-.54 1.238h-.004l-.105 1.607a.575.575 0 0 1-.54.536H11.22a.575.575 0 0 1-.54-.536l-.105-1.607h-.004a1.851 1.851 0 0 0-.545-1.244 1.851 1.851 0 0 0-1.31-.542c-.504 0-.96.2-1.295.526l-1.177 1.03a.575.575 0 0 1-.785-.027l-.528-.528-.001-.001-.528-.528a.575.575 0 0 1-.026-.786l1.062-1.21-.001-.001a1.85 1.85 0 0 0 .493-1.26c0-.515-.21-.98-.548-1.317a1.85 1.85 0 0 0-1.236-.539v-.001l-1.607-.107a.575.575 0 0 1-.537-.574v-.746H2V12h.001v-.747c0-.303.235-.554.538-.574l1.606-.105v-.004a1.851 1.851 0 0 0 1.242-.545c.335-.336.542-.8.542-1.31 0-.49-.19-.935-.499-1.267L4.376 6.244a.575.575 0 0 1 .026-.786l.528-.527-.001-.002zM16.286 12a4.286 4.286 0 1 1-8.572 0 4.286 4.286 0 0 1 8.572 0z"
                      fill="#ffffff"
                    ></path>
                  </g>
                </svg>{" "}
              </div>
            </Link>
          )}

          <a
            target="_blank"
            href="https://github.com/sunilpar?tab=overview&from=2025-02-01&to=2025-02-26"
          >
            <div className=" flex justify-center opacity-70 hover:scale-125">
              <svg
                height="40px"
                width="40px"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="#ffffff"
              >
                <title>About</title>
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css"> </style>{" "}
                  <g>
                    {" "}
                    <path
                      className="st0"
                      d="M366.042,378.266c-26.458-9.72-49.309-18.113-51.793-42.026c-1.149-11.024-0.214-23.982,2.702-37.507 c9.144-9.798,16.72-23.936,24.484-45.691c15.458-5.955,25.31-19.192,30.109-40.442c2.461-10.885-1.058-22.073-9.655-30.807 c0.773-13.206,0.095-13.928-0.402-14.456l-0.542-0.536H151.497v14.914c-9.897,9.115-13.61,19.503-11.038,30.885 c4.794,21.242,14.648,34.48,30.12,40.442c7.762,21.754,15.332,35.885,24.464,45.675c2.06,9.518,4.158,23.61,2.71,37.523 c-2.484,23.913-25.336,32.306-51.795,42.026c-36.32,13.338-77.484,28.462-77.484,88.641C68.474,485.634,126.653,512,256,512 c129.347,0,187.526-26.366,187.526-45.093C443.526,406.729,402.362,391.605,366.042,378.266z M233.908,484.578L203.021,359.12 l37.47,15.598l-2.302,20.66l6.572-0.148L233.908,484.578z M277.101,395.378l-2.302-20.66l37.47-15.598l-30.887,125.458 l-10.854-89.348L277.101,395.378z"
                    ></path>{" "}
                    <path
                      className="st0"
                      d="M91.083,82.779l54.864,24.13v36.397h222.66v-36.397l22.395-9.852v51.234c-4.75,0.753-8.389,4.728-8.389,9.495 c0,4.146,2.741,7.74,6.704,9.053l-6.378,40.217c-0.421,2.663,0.34,5.357,2.081,7.392c1.739,2.042,4.28,3.214,6.972,3.214h16.792 c2.692,0,5.233-1.172,6.968-3.214c1.745-2.034,2.506-4.728,2.085-7.392l-6.374-40.217c3.969-1.312,6.714-4.907,6.714-9.053 c0-4.767-3.643-8.742-8.397-9.495V88.804l13.686-6.017c2.696-1.172,4.439-3.789,4.439-6.654c0-2.85-1.739-5.458-4.433-6.646 L272.931,3.284C267.987,1.102,262.72,0,257.273,0c-5.446,0-10.712,1.102-15.652,3.284L91.081,69.487 c-2.692,1.188-4.431,3.796-4.431,6.646C86.649,79.006,88.392,81.614,91.083,82.779z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
