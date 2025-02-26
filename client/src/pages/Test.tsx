// // xxx get user by id
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import authservice from "../backend/auth.ts";
// import videoService from "@/backend/video.ts";
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
//   const id = "0571a444-d80f-4908-aac5-b88cf47d9459";
//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.getUserById(id);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   const query = "sun";
//   function search() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await authservice.SearchUser(query);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }
//   function Allvids() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.getAllVideo();
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
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
//             get user with id
//           </button>

//           <button
//             onClick={search}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             search user
//           </button>

//           <button
//             onClick={Allvids}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get all vids
//           </button>
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

// //xxx insert video
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
//   const video_url = Vurl;
//   const thumbnail_url = Iurl;
//   const title = "ASTARTES 2";
//   const description =
//     "A love letter to warhammer universe by Syama Pedersen. he made this series by him self. the video playback you see in the hero page of this site is the second series that officially made by him with warhammer support ";
//   const ispublic = true;

//   function insert() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.insertVideo(
//           video_url,
//           thumbnail_url,
//           title,
//           description,
//           ispublic
//         );
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVurl(response);
//         }
//       } catch (error) {
//         console.error(
//           "error while inserting the details of the video  \n",
//           error
//         );
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
//           {Iurl && Vurl && (
//             <div>
//               <button
//                 onClick={insert}
//                 className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//               >
//                 insert the vid to db
//               </button>
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

// //xxx update thumbnail
// import React, { useState, ChangeEvent } from "react";
// import strip from "../assets/strip.png";
// import videoService from "@/backend/video.ts";
// function Test() {
//   const [Iurl, setIurl] = useState<string | null>(null);
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
//   const video_uid = "e0b13181-3aaf-45d2-868d-4a9e44ea9c90";
//   const thumbnail_uid = Iurl;

//   function update() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.updateThumbnail(
//           thumbnail_uid,
//           video_uid
//         );
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setIurl(response);
//         }
//       } catch (error) {
//         console.error("error while asking to update thumbnail \n", error);
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

//           {Iurl && (
//             <div>
//               <button
//                 onClick={update}
//                 className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//               >
//                 update
//               </button>
//               <img src={Iurl} alt="" />
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

// //xxx change video details
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
//     ispublic: boolean;
//     created: string;
//   }

//   const [video, setVideo] = useState<Video | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const id = "e0b13181-3aaf-45d2-868d-4a9e44ea9c90";
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
//   var title = video?.title;
//   var description = video?.description;
//   var ispublic = video?.ispublic;

//   title = "ASTARTES 2";

//   function update() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await videoService.updateVideoDetails(
//           id,
//           title,
//           description,
//           ispublic
//         );
//         setLoading(false);
//         console.log("res from backend\n", response);
//         if (response != null) {
//           setVideo(response);
//         }
//       } catch (error) {
//         console.error("error while updating the video details\n", error);
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

//           {video && (
//             <div className="flex justify-center flex-col">
//               {video.title}
//               <button
//                 onClick={update}
//                 className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//               >
//                 update video
//               </button>
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

//SUBSCRIPTION

// //xxx get sub count and if subbed
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import subService from "@/backend/sub.ts";
// function Test() {
//   const [count, setcount] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const channel_id = "d24a7709-eb89-4356-b6ba-12803d55f60e";

//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await subService.getSubCount(channel_id);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function issubed() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await subService.ifSubbed(channel_id);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
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
//             get sub count
//           </button>
//           <button
//             onClick={issubed}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             is subbed?
//           </button>
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

// // xxx add and remove sub
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import subService from "@/backend/sub.ts";
// function Test() {
//   const [count, setcount] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const channel_id = "0571a444-d80f-4908-aac5-b88cf47d9459";

//   function addsub() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await subService.addSub(channel_id);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function rmsub() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await subService.rmsub(channel_id);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={addsub}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//           add sub
//           </button>
//           <button
//             onClick={rmsub}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             rm sub
//           </button>
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

// COMMENTS
// //xxx get comments
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import commentService from "@/backend/comment";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const video_Uid = "3ce9dbfa-b342-420b-ba2e-a0e42ff3157b";

//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await commentService.getcomments(video_Uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
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
//             get comments
//           </button>
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

// //xxx add update and delete comments
// import React, { useState, useEffect } from "react";
// import strip from "../assets/strip.png";
// import commentService from "@/backend/comment";
// import { rm } from "fs";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const video_Uid = "e0b13181-3aaf-45d2-868d-4a9e44ea9c90";
//   const comment = "cant wait for astartes 2 ";

//   function addcomment() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await commentService.addComments(video_Uid, comment);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function rmcomment() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await commentService.removeComments(video_Uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }
//   function updatecomment() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await commentService.updateComments(
//           video_Uid,
//           comment
//         );
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={addcomment}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             add comment
//           </button>

//           <button
//             onClick={updatecomment}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             update comment
//           </button>

//           <button
//             onClick={rmcomment}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             rm comment
//           </button>
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

//LIKES

// // xxx get likes
// import React, { useState, useEffect } from "react";
// import likesService from "@/backend/likes";
// import strip from "../assets/strip.png";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const video_uid = "0571a444-d80f-4908-aac5-b88cf47d9459";

//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await likesService.getLikes(video_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
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
//             get likes
//           </button>
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

// // xxx add and remove like
// import React, { useState, useEffect } from "react";
// import likesService from "@/backend/likes";
// import strip from "../assets/strip.png";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const video_uid = "e0b13181-3aaf-45d2-868d-4a9e44ea9c90";

//   function Onclick() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await likesService.addLike(video_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }
//   function removeLike() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await likesService.removeLike(video_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
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
//             add like
//           </button>
//           <button
//             onClick={removeLike}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             remove like
//           </button>
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

//HISTORY
// // xxx get add and remove history
// import React, { useState, useEffect } from "react";
// import historyService from "@/backend/history";
// import strip from "../assets/strip.png";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const video_uid = "e0b13181-3aaf-45d2-868d-4a9e44ea9c90";

//   function gethistory() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await historyService.getHistory();
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function addhistory() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await historyService.addHistory(video_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function removehistory() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await historyService.removeHistory(video_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={gethistory}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get history
//           </button>
//           <button
//             onClick={addhistory}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             add history
//           </button>
//           <button
//             onClick={removehistory}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             remove history
//           </button>
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

//PLAYLIST
// // xxx get playlists
// import React, { useState, useEffect } from "react";
// import playlistService from "@/backend/playlist";
// import strip from "../assets/strip.png";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const playlist_uid = "e4495efc-5582-43d1-87ba-f90d2fafd28f";
//   const name = "lord of the rings";

//   function getbyid() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.getPlaylistById(playlist_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function getbyname() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.getPlaylistByName(name);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }
//   function getall() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.getAllPlaylist();
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={getbyid}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get history by id
//           </button>
//           <button
//             onClick={getbyname}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get by name
//           </button>

//           <button
//             onClick={getall}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             get all history
//           </button>
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

// // xxx add video update and delete playlists
// import React, { useState, useEffect } from "react";
// import playlistService from "@/backend/playlist";
// import strip from "../assets/strip.png";
// function Test() {
//   const [loading, setLoading] = useState<boolean>(false);

//   const playlist_uid = "d3689b28-ec0d-40d4-806d-cb402d6a7a91";
//   const video_uid = "e0b13181-3aaf-45d2-868d-4a9e44ea9c90";
//   const name = "Astartes series";
//   const name1 = "Astartes series";

//   function create() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.createPlaylist(
//           video_uid,
//           name,
//           true
//         );
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function add() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.addVideo(
//           playlist_uid,
//           video_uid
//         );
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function update() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.updatePlaylist(
//           playlist_uid,
//           name1,
//           true
//         );
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   function remove() {
//     (async () => {
//       try {
//         setLoading(true);
//         const response = await playlistService.deletePlaylist(playlist_uid);
//         setLoading(false);
//         console.log("res from server", response);
//       } catch (error) {}
//     })();
//   }

//   return !loading ? (
//     <>
//       <div className="min-h-screen flex justify-center">
//         <div>
//           <button
//             onClick={create}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             create playlist
//           </button>
//           <button
//             onClick={add}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             add video to playlist
//           </button>
//           <button
//             onClick={update}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             updating playlist
//           </button>
//           <button
//             onClick={remove}
//             className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
//           >
//             remove the playlist
//           </button>
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

// xxx get video by id
import React, { useState, useEffect } from "react";
import strip from "../assets/strip.png";
import videoService from "@/backend/video.ts";
function Test() {
  interface Video {
    id: string;
    video_url: string;
    thumbnail: string;
    owner: string;
    title: string;
    description: string;
    created: string;
  }

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const id = "59a002e0-b308-4090-bbd7-b0f681161ce7";
  function Onclick() {
    (async () => {
      try {
        setLoading(true);
        const response = await videoService.getVideoById(id);
        setLoading(false);
        console.log("res from backend\n", response);
        if (response != null) {
          setVideo(response);
        }
      } catch (error) {
        console.error("error while getting video \n", error);
      }
    })();
  }
  const query = "balrog";
  function search() {
    (async () => {
      try {
        setLoading(true);
        const response = await videoService.SearchVideo(query);
        setLoading(false);
        console.log("res from backend\n", response);
        if (response != null) {
          setVideo(response);
        }
      } catch (error) {
        console.error("error while searching videos \n", error);
      }
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
            get video by id
          </button>
          <button
            onClick={search}
            className="bg-[#1b1b1d] rounded-2xl  hover:bg-[#242526] p-2"
          >
            search video
          </button>
          {video && (
            <div className="flex justify-center flex-col">{video.title}</div>
          )}
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
