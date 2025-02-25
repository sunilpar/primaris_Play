// xxx get user by id
import React, { useState, useEffect } from "react";
import strip from "../assets/strip.png";
import authservice from "../backend/auth.ts";
import videoService from "@/backend/video.ts";
function Test() {
  interface User {
    id: string;
    username: string;
    fullname: string;
    email: string;
    avatar: string;
    coverimage: string;
    created: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const id = "0571a444-d80f-4908-aac5-b88cf47d9459";
  function Onclick() {
    (async () => {
      try {
        setLoading(true);
        const response = await authservice.getUserById(id);
        setLoading(false);
        console.log("res from server", response);
      } catch (error) {}
    })();
  }

  const query = "sun";
  function search() {
    (async () => {
      try {
        setLoading(true);
        const response = await authservice.SearchUser(query);
        setLoading(false);
        console.log("res from server", response);
      } catch (error) {}
    })();
  }
  function Allvids() {
    (async () => {
      try {
        setLoading(true);
        const response = await videoService.getAllVideo();
        setLoading(false);
        console.log("res from server", response);
      } catch (error) {}
    })();
  }
  return !loading ? (
    <>
      <div className="min-h-screen flex justify-center">
        <div>
          <button
            onClick={Onclick}
            className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
          >
            get user with id
          </button>

          <button
            onClick={search}
            className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
          >
            search user
          </button>

          <button
            onClick={Allvids}
            className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
          >
            get all vids
          </button>
        </div>
      </div>

      <div className="h-[5px] overflow-clip">
        <img src={strip} alt="" />
      </div>

      <div className="min-h-screen flex justify-center"></div>
    </>
  ) : (
    <>
      <div className="flex justify-center text-4xl">
        <h1>loading ...</h1>
      </div>
    </>
  );
}
export default Test;

// // xxx user login and  logout
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import authservice from "../backend/auth.ts";
// function Test() {
//   interface User {
//     id: string;
//     username: string;
//     fullname: string;
//     email: string;
//     avatar: string;
//     coverimage: string;
//     created: string;
//   }

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const email = "guest@gmail.com";
//   const password = "12345678";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.Login(email, password);
//         setLoading(false);
//         console.log("res from after login", response);
//         if (response != null) {
//           setUser(response);
//         }
//       } catch (error) {
//         console.error("error while logging in ", error);
//       }
//     })();
//   }

//   function logout() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.Logout();
//         setLoading(false);
//         console.log("res from after logout", response);
//         if (response != null) {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("error while logging out ", error);
//       }
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             login as guest
//           </button>
//           {user && (
//             <div className="flex justify-center flex-col">
//               hi {user.username}
//               <div className="flex justify-center">
//                 <button
//                   onClick={logout}
//                   className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//                 >
//                   logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// // xxx user refresh session
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import authservice from "../backend/auth.ts";
// function Test() {
//   interface User {
//     id: string;
//     username: string;
//     fullname: string;
//     email: string;
//     avatar: string;
//     coverimage: string;
//     created: string;
//   }

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const email = "sunil@gmail.com";
//   const password = "12345678";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.Login(email, password);
//         setLoading(false);
//         console.log("res from after login", response);
//         if (response != null) {
//           setUser(response);
//         }
//       } catch (error) {
//         console.error("error while logging in \n", error);
//       }
//     })();
//   }

//   function refresh() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.RefreshSession();
//         setLoading(false);
//         console.log("res from after refresh session :\n", response);
//         if (response != null) {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("error while refreshing the session ", error);
//       }
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             login as sunil
//           </button>
//           {user && (
//             <div className="flex justify-center flex-col">
//               hi {user.username}
//               <div className="flex justify-center">
//                 <button
//                   onClick={refresh}
//                   className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//                 >
//                   refresh
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// // xxx user sign in
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import authservice from "../backend/auth.ts";
// function Test() {
//   interface User {
//     id: string;
//     username: string;
//     fullname: string;
//     email: string;
//     avatar: string;
//     coverimage: string;
//     created: string;
//   }

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fullname = "guest tester";
//   const username = "guest";
//   const email = "guest@gmail.com";
//   const password = "12345678";
//   const avatar =
//     "https://res.cloudinary.com/daxgavwpd/image/upload/v1740394673/pngwing.com_uz1qls.png";
//   const coverimage =
//     "https://res.cloudinary.com/daxgavwpd/image/upload/v1740394778/alexander-korepov-black-legion-fin_plxbmq.jpg";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.Signup(
//           fullname,
//           username,
//           email,
//           password,
//           avatar,
//           coverimage
//         );
//         setLoading(false);
//         console.log(
//           "res from after signup if good change backend \n",
//           response
//         );
//         if (response != null) {
//           setUser(response);
//         }
//       } catch (error) {
//         console.error("error while signing in \n", error);
//       }
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             sign up as guest
//           </button>
//           {user && (
//             <div className="flex justify-center flex-col">
//                {user.username}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// // xxx user change password
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import authservice from "../backend/auth.ts";
// function Test() {
//   interface User {
//     id: string;
//     username: string;
//     fullname: string;
//     email: string;
//     avatar: string;
//     coverimage: string;
//     created: string;
//   }

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const oldpassword = "123456789";
//   const newpassword = "12345678";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.ChangePassword(
//           oldpassword,
//           newpassword
//         );
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setUser(response);
//         }
//       } catch (error) {
//         console.error("error while signing in \n", error);
//       }
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             change password
//           </button>
//           {user && <div className="flex justify-center flex-col"></div>}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// // xxx change user details
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import authservice from "../backend/auth.ts";
// function Test() {
//   interface User {
//     id: string;
//     username: string;
//     fullname: string;
//     email: string;
//     avatar: string;
//     coverimage: string;
//     created: string;
//   }

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fullname = "test guest";
//   const username = "guest";
//   const email = "guest@gmail.com";
//   const avatar =
//     "https://res.cloudinary.com/daxgavwpd/image/upload/v1740394673/pngwing.com_uz1qls.png";
//   const coverimage =
//     "https://res.cloudinary.com/daxgavwpd/image/upload/v1740394778/alexander-korepov-black-legion-fin_plxbmq.jpg";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.ChangeUserDetails(
//           fullname,
//           username,
//           email,
//           avatar,
//           coverimage
//         );
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setUser(response);
//         }
//       } catch (error) {
//         console.error("error while signing in \n", error);
//       }
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             change details of guest
//           </button>
//           {user && (
//             <div className="flex justify-center flex-col">{user.username}</div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// VIDEOS
// // xxx get video by id
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import videoService from "@/backend/video.ts";
// function Test() {
//   interface Video {
//     id: string;
//     video_url: string;
//     thumbnail: string;
//     owner: string;
//     title: string;
//     description: string;
//     created: string;
//   }

//   const [video, setVideo] = useState<Video | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const id = "59a002e0-b308-4090-bbd7-b0f681161ce7";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.getVideoById(id);
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVideo(response);
//         }
//       } catch (error) {
//         console.error("error while getting video \n", error);
//       }
//     })();
//   }
//   const query = "balrog";
//   function search() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.SearchVideo(query);
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVideo(response);
//         }
//       } catch (error) {
//         console.error("error while searching videos \n", error);
//       }
//     })();
//   }
//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get video by id
//           </button>
//           <button
//             onClick={search}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             search video
//           </button>
//           {video && (
//             <div className="flex justify-center flex-col">{video.title}</div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// // xxx upload image
// import React, { useState, ChangeEvent } from "react";
// import strip from "../assets/strip.png";
// import videoService from "@/backend/video.ts";
// function Test() {
//   const [Iurl, setIurl] = useState<string | null>(null);
//   const [Vurl, setVurl] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const getfile = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   function uploadImage() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.uploadImage(selectedFile);
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setIurl(response);
//         }
//       } catch (error) {
//         console.error("error while uploading a image  \n", error);
//       }
//     })();
//   }
//   function uploadVideo() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.uploadVideo(selectedFile);
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVurl(response);
//         }
//       } catch (error) {
//         console.error("error while uploading a video  \n", error);
//       }
//     })();
//   }
//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div className="">
//           <input
//             className="bg-[#1b1b1d] hover:bg-[#242526] flex justify-center"
//             type="file"
//             onChange={getfile}
//           />
//           <button
//             onClick={uploadImage}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             click to upload image
//           </button>
//           <button
//             onClick={uploadVideo}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             click to upload video
//           </button>
//           {Iurl && (
//             <div>
//               <img src={Iurl} alt="" />
//             </div>
//           )}
//           {Vurl && (
//             <div>
//               <video src={Vurl}></video>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }
// export default Test;

// // xxx insert video
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import videoService from "@/backend/video.ts";
// function Test() {
//   interface Video {
//     id: string;
//     video_url: string;
//     thumbnail: string;
//     owner: string;
//     title: string;
//     description: string;
//     created: string;
//   }

//   const [video, setVideo] = useState<Video | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const id = "59a002e0-b308-4090-bbd7-b0f681161ce7";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.getVideoById(id);
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVideo(response);
//         }
//       } catch (error) {
//         console.error("error while getting video \n", error);
//       }
//     })();
//   }
//   const query = "balrog";
//   function search() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.SearchVideo(query);
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVideo(response);
//         }
//       } catch (error) {
//         console.error("error while searching videos \n", error);
//       }
//     })();
//   }
//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={Onclick}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get video by id
//           </button>
//           <button
//             onClick={search}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             search video
//           </button>
//           {video && (
//             <div className="flex justify-center flex-col">{video.title}</div>
//           )}
//         </div>
//       </div>

//       <div className="h-[5px] overflow-clip">
//         <img src={strip} alt="" />
//       </div>

//       <div className="min-h-screen flex justify-center"></div>
//     </>
//   ) : (
//     <>
//       <div className="flex justify-center text-4xl">
//         <h1>loading ...</h1>
//       </div>
//     </>
//   );
// }

// export default Test;
