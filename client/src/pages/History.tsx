import React, { useState, useEffect } from "react";
import currentUser from "@/utils/Session.helper";
import { Link, useNavigate } from "react-router-dom";
import historyService from "@/backend/history";
import Historylist from "@/components/usersettings/Historylist";
import { v4 as uuidv4 } from "uuid";
import Spinner from "@/components/skeleton/Spinner";

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}
interface Video {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  created: string;
}
interface History {
  video_UID: string;
}
type Props = {};

function History({}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const user = currentUser.getData();
        if (!user) {
          navigate("/");
        }
        setUser(user);
        const response = await historyService.getHistory();
        if (response) {
          setHistory(response);
        }
      } catch (error) {
        console.error("no current user ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return !loading ? (
    <>
      <div
        className="relative  flex rounded-2xl pt-10 sm:pt-0 overflow-hidden"
        style={{
          backgroundImage: `url(${user?.coverimage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent from-20% opacity-70"></div>
        <div className="flex lg:justify-between align-middle w-full flex-wrap justify-center ">
          <div className="sm:mt-10 sm:ml-15 sm:mr-5">
            <img
              className="w-[100px] h-[100px] object-cover rounded-full ring-[#c4ab88] ring-2 "
              src={user?.avatar}
              alt=""
            />
            <div className="flex flex-col ml-4 text-2xl">
              <div className="channel_name mt-[7.4px] font-bold">
                {user?.username}
              </div>
            </div>
          </div>

          {/* upload */}
          <div className="bg-[rgba(0,0,0,0.8)] p-5  mb-5 lg:w-[700px]  w-[300px] min-w-[340px] mt-10 ring-2 ring-[#c4ab88] rounded-2xl z-50">
            <div className="title font-bold mb-5 text-2xl">History</div>
            {history.length > 0 ? (
              <div className="flex flex-col gap-10 ">
                {history.map((vid) => (
                  <div className="">
                    <Historylist
                      key={uuidv4()}
                      video_uid={vid.video_UID}
                      disable={false}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex  gap-10 opacity-80 justify-center items-center font-bold">
                Your history seems to be clean..., Good job brother
              </div>
            )}
          </div>
          <div className="h-[100px] lg:w-[500px] w-[68px]"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    </>
  );
}

export default History;
