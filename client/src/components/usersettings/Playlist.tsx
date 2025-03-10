import { useEffect, useState } from "react";
import playlistService from "@/backend/playlist";
import currentUser from "@/utils/Session.helper";
import Historylist from "./Historylist";
import { v4 as uuidv4 } from "uuid";

type Props = {
  id: string;
};
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

function Playlist({ id }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  const [_islogged, setIslogged] = useState<boolean>(false);
  const [_loggeduser, setLoggeduser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const loggeduser = currentUser.isLogged();
        setIslogged(currentUser.isLogged());
        const response = await playlistService.getAllPlaylist(id);
        setPlaylist(response || []);
        if (loggeduser) {
          setLoggeduser(currentUser.getData());
        }
      } catch (error) {
        console.error("error while getting the playlist");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return !loading && playlist.length > 0 ? (
    <>
      <div className="flex justify-center flex-wrap">
        {playlist.map((playlist) => (
          <div className="ring-2 ring-[#c4ab88] rounded-2xl p-5 flex flex-col justify-start m-5">
            <div className="playlistname mb-5 text-3xl font-bold">
              {playlist.Playlist_name}
            </div>
            {playlist.video_uid.map((vid) => (
              <div className="mb-5">
                <Historylist key={uuidv4()} video_uid={vid} disable={true} />
                <div></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="flex justify-center opacity-70">
        channel has no playlist
      </div>
    </>
  );
}

export default Playlist;
