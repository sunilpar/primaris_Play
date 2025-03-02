import React, { useEffect, useState } from "react";
import playlistService from "@/backend/playlist";
import currentUser from "@/utils/Session.helper";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../skeleton/Spinner";

interface AddToPopPlaylistProps {
  video_uid: string;
  isOpen: boolean;
  onClose: () => void;
}
interface Playlist {
  playlist_uid: string;
  Playlist_name: string;
  video_uid: string[];
  user_uid: string;
  ispublic: boolean;
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

const Popplaylist: React.FC<AddToPopPlaylistProps> = ({
  video_uid,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [createNew, setCreateNew] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  const [islogged, setIslogged] = useState<boolean>(false);
  const [loggeduser, setLoggeduser] = useState<User | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const user = currentUser.getData();
        setLoggeduser(user);
        setIslogged(currentUser.isLogged());

        if (user) {
          const response = await playlistService.getAllPlaylist(user.id);
          setPlaylist(response || []);
        }
      } catch (error) {
        console.error("error while getting the playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  function add(playlist_uid: string, video_uid: string) {
    (async () => {
      try {
        setLoading1(true);
        const response = await playlistService.addVideo(
          playlist_uid,
          video_uid
        );
        setLoading1(false);
      } catch (error) {}
    })();
  }

  function create(name: string) {
    (async () => {
      try {
        setLoading1(true);
        const response = await playlistService.createPlaylist(
          video_uid,
          name,
          true
        );
        setLoading1(false);
      } catch (error) {}
    })();
  }

  return !loading ? (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
        onClick={onClose}
      >
        <div
          className={`bg-[#1d1e20] ring-2 ring-[#c4ab88] p-6  shadow-lg w-[350px] relative transition-all duration-300 ${
            createNew ? "min-h-[250px]" : "min-h-[180px]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2  text-[#c4ab88]"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-lg font-bold mb-4">Add Video to Playlist</h2>
          {/* map of playlist here */}
          <div>
            {playlist && playlist.length > 0 ? (
              <div>
                {playlist.map((ply) => (
                  <div className="flex justify-between">
                    <div className="playlistname mb-5 text-3xl font-bold text-[#c4ab88]">
                      {ply.Playlist_name}
                    </div>

                    {!loading1 && !ply.video_uid.includes(video_uid) ? (
                      <button
                        onClick={() => add(ply.playlist_uid, video_uid)}
                        className="flex items-center opacity-80"
                      >
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>add to this playlist</title>
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M15 12H12M12 12H9M12 12V9M12 12V15M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z"
                              stroke="#ffffff"
                              stroke-width="2"
                              stroke-linecap="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                    ) : (
                      <div className="opacity-80 mt-2">
                        <svg
                          fill="#ffffff"
                          width="30px"
                          height="20px"
                          viewBox="0 0 512 512"
                          id="_x30_1"
                          version="1.1"
                          xmlSpace="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <title>already in playlist</title>
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M434.068,46.758L314.607,9.034C295.648,3.047,275.883,0,256,0s-39.648,3.047-58.607,9.034L77.932,46.758 C52.97,54.641,36,77.796,36,103.973v207.39c0,38.129,18.12,73.989,48.816,96.607l117.032,86.234 C217.537,505.764,236.513,512,256,512s38.463-6.236,54.152-17.796l117.032-86.234C457.88,385.352,476,349.492,476,311.363v-207.39 C476,77.796,459.03,54.641,434.068,46.758z M347.924,227.716l-98.995,98.995c-11.716,11.716-30.711,11.716-42.426,0l-42.427-42.426 c-11.716-11.716-11.716-30.711,0-42.426l0,0c11.716-11.716,30.711-11.716,42.426,0l21.213,21.213l77.782-77.782 c11.716-11.716,30.711-11.716,42.426,0h0C359.64,197.005,359.64,216,347.924,227.716z"></path>
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-xl">
                {" "}
                there are no playlist of yours brother create one ?
              </div>
            )}
          </div>

          {!createNew ? (
            <button
              className="bg-[#223e20] text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setCreateNew(true)}
            >
              + Create New Playlist
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="p-2 border rounded-lg w-full"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <button
                className="bg-[#0d3e09] text-white px-4 py-2 rounded-lg w-full"
                onClick={() => {
                  create(playlistName);
                  setCreateNew(false);
                  onClose();
                }}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
        onClick={onClose}
      >
        <div
          className={`bg-[#1d1e20] ring-2 ring-[#c4ab88] p-6 shadow-lg w-[350px] relative transition-all duration-300 ${
            createNew ? "min-h-[250px]" : "min-h-[180px]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2  text-[#c4ab88]"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-lg font-bold mb-4">Add Video to Playlist</h2>
          {/* map of playlist here */}
          <div className=" pluse h-[30px] w-[300px] mb-5 rounded-2xl"></div>

          {!createNew ? (
            <button className="bg-[#223e20] text-white px-4 py-2 rounded-lg w-full">
              + Create New Playlist
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="p-2 border rounded-lg w-full"
                placeholder="Enter playlist name"
              />
              <button
                className="bg-[#0d3e09] text-white px-4 py-2 rounded-lg w-full"
                onClick={() => {
                  console.log(
                    `Creating Playlist: ${playlistName} for video ${video_uid}`
                  );
                  setCreateNew(false);
                  setPlaylistName("");
                  onClose();
                }}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Popplaylist;
