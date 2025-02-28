import React, { useEffect, useState } from "react";
import commentService from "@/backend/comment";
import authService from "@/backend/auth";
interface LikebtnProps {
  video_id: string;
}
interface Comment {
  id: string;
  video_id: string;
  user_id: string;
  comment: string;
  created: string;
}
interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}
function Comment({ video_id }: LikebtnProps) {
  const [user, setUser] = useState<User[]>([]);
  const [comment, setComment] = useState<Comment[]>([]);
  const [islogged, setIslogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (video_id) {
      setLoading(true);
      getcomments(video_id);
      setLoading(false);
    }
  }, [video_id]);

  function getcomments(video_id: string) {
    (async () => {
      try {
        setLoading(true);
        const response = await commentService.getcomments(video_id);
        setLoading(false);
        if (response != null) {
          setComment(response);
        }
      } catch (error) {
        console.error("error while getting comments \n", error);
      }
    })();
  }

  function getusers(user_id: string) {
    (async () => {
      try {
        setLoading(true);
        const response = await authService.getUserById(user_id);
        setLoading(false);
        if (response != null) {
          //1 user comes
        }
      } catch (error) {
        console.error("error while getting comments \n", error);
      }
    })();
  }

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="border-b pb-4 mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 text-white rounded-md  focus:outline-none focus:ring-0"
          />
        </div>

        {comment.map((cmt) => (
          <div key={cmt.id} className="flex gap-3 mb-5 ">
            <div>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">10</span> • 10
              </p>
              <p className="text-white">{cmt.comment}</p>
              <div className="flex gap-4 mt-2 text-gray-400 text-sm">
                <button className="hover:text-blue-500">👍 10</button>
                <button className="hover:text-blue-500">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;

// import React, { useEffect, useState } from "react";
// import commentService from "@/backend/comment";
// import authService from "@/backend/auth";

// interface cmtProps {
//   video_id: string;
// }

// interface Comment {
//   id: string;
//   video_id: string;
//   user_id: string;
//   comment: string;
//   created: string;
// }

// interface User {
//   id: string;
//   username: string;
//   avatar: string;
// }

// function Comment({ video_id }: cmtProps) {
//   const [users, setUsers] = useState<Map<string, User>>(new Map());
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (video_id) {
//       setLoading(true);
//       getcomments(video_id);
//       setLoading(false);
//     }
//   }, [video_id]);

//   function getcomments(video_id: string) {
//     (async () => {
//       try {
//         const response = await commentService.getcomments(video_id);
//         if (response) {
//           setComments(response);
//           response.forEach((comment: Comment) => {
//             getusers(comment.user_id);
//           });
//         }
//       } catch (error) {
//         console.error("Error while getting comments:", error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }

//   function getusers(user_id: string) {
//     if (!users.has(user_id)) {
//       (async () => {
//         try {
//           const response = await authService.getUserById(user_id);
//           if (response) {
//             setUsers((prevUsers) => new Map(prevUsers).set(user_id, response));
//           }
//         } catch (error) {
//           console.error("Error while getting user:", error);
//         }
//       })();
//     }
//   }

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4">
//       <div className="border-b pb-4 mb-4">
//         <input
//           type="text"
//           placeholder="Add a comment..."
//           className="w-full p-2 text-white rounded-md focus:outline-none focus:ring-0"
//         />
//       </div>

//       {comments.map((cmt) => {
//         const user = users.get(cmt.user_id);
//         return (
//           <div key={cmt.id} className="flex gap-3 mb-5">
//             <div>
//               {user ? (
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={user.avatar}
//                     alt={user.username}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <p className="text-sm text-gray-400">
//                     <span className="font-semibold text-white">
//                       {user.username}
//                     </span>
//                     {" • "}
//                     {new Date(cmt.created).toLocaleString()}
//                   </p>
//                 </div>
//               ) : (
//                 <p>Loading user...</p>
//               )}
//               <p className="text-white mt-2">{cmt.comment}</p>
//               <div className="flex gap-4 mt-2 text-gray-400 text-sm">
//                 <button className="hover:text-blue-500">👍 10</button>
//                 <button className="hover:text-blue-500">Reply</button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Comment;
