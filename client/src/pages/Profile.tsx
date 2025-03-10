import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import videoService from "@/backend/video";
import authService from "@/backend/auth";
import subService from "@/backend/sub";
import currentUser from "@/utils/Session.helper";
import Preview from "@/components/video/Preview";
import Playlist from "@/components/usersettings/Playlist";
import Subscriberbtn from "@/components/video/Subscriberbtn";

interface Video {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
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

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [islogged, setIslogged] = useState<boolean | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const [showvid, setShowvid] = useState<boolean>(true);
  const [showplaylist, setShowplaylist] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        const response = await videoService.getAllVideo(id);
        if (response && response.length > 0) {
          setVideos(response);
        }
      } catch (error) {
        console.error("Error while fetching videos:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    getUser(id);
    getSubscription(id);
  }, [videos, id]);

  async function getUser(userId: string) {
    try {
      const response = await authService.getUserById(userId);
      setIslogged(currentUser.isLogged());
      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.error("Error while fetching user:", error);
    }
  }

  async function getSubscription(channe_Id: string) {
    try {
      const response = await subService.getSubCount(channe_Id);
      setCount(response);
    } catch (error) {
      console.error("Error while fetching subscriptions:", error);
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="">
        <div className="channel flex justify-center sm:mt-10 sm:mx-17">
          <div
            className="relative logo flex w-full lg:h-[400px] rounded-2xl pt-10 sm:pt-0 overflow-hidden"
            style={{
              backgroundImage: `url(${user?.coverimage})`,
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent from-1% opacity-90"></div>
            <div className="relative flex p-6 lg:mt-70">
              <img
                className="w-[100px] h-[100px] object-cover rounded-full "
                src={user?.avatar}
                alt=""
              />
              <div className="flex flex-col ml-4 text-2xl">
                <div className="channel_name mt-[7.4px] font-bold">
                  {user?.username}
                </div>
                <div className="channel_sub text-sm opacity-70">
                  {count} subscribers
                </div>
              </div>
              {islogged && (
                <Subscriberbtn islogged={islogged} ch_id={id || ""} />
              )}
            </div>
          </div>
        </div>

        <button
          className="ml-10 text-3xl font-bold opacity-70 mt-6"
          onClick={() => {
            setShowplaylist(false);
            setShowvid(true);
          }}
        >
          videos
        </button>
        <button
          className="ml-10 text-3xl font-bold opacity-70 mt-6"
          onClick={() => {
            setShowplaylist(true);
            setShowvid(false);
          }}
        >
          playlists
        </button>

        {showvid && (
          <div>
            {videos.length > 0 ? (
              <div>
                <div className="uservideos w-full flex flex-wrap sm:mx-17">
                  {videos.map((vid) => (
                    <Preview key={vid.id} video={vid} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center opacity-70">
                channel has no videos
              </div>
            )}
          </div>
        )}
        {showplaylist && <Playlist id={id || ""} />}
      </div>
    </div>
  );
}

export default Profile;
