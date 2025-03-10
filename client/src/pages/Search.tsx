import { useState, useEffect } from "react";
import Searchbar from "@/components/sidebar/Searchbar";
import { useParams } from "react-router-dom";
import videoService from "@/backend/video.ts";
import Preview from "@/components/video/Preview";
import authService from "@/backend/auth";
import Userpeview from "@/components/video/Userpeview";

//fix the search presestinace bug

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

function Search() {
  const [user, setUser] = useState<User[]>([]);
  const [video, setVideo] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const slug = useParams();
  var query = slug.query || "NA";

  // const reloadPage = (): void => {
  //   window.location.reload();
  // };
  //this might be solutin to presentance bug in search

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (query == "NA" || query == "") {
          console.error("query cant be empty");
          setLoading(false);
          return;
        }
        const response = await videoService.SearchVideo(query);
        getuser();
        setLoading(false);
        if (!response || response.length == 0) {
          console.log("no video was found with query :", query);
          return;
        }
        setVideo(response);
      } catch (error) {
        console.error("error while searching video \n", error);
      }
    })();
  }, [query]);

  function getuser() {
    (async () => {
      try {
        setLoading(true);
        if (query == "NA" || query == "") {
          console.error("query cant be empty");
          setLoading(false);
          return;
        }
        var response1 = await authService.SearchUser(query);

        if (response1.length != 0) {
          setUser(response1);
        }
      } catch (error) {
        console.log("no user was found with query :", query, error);
      }
    })();
  }

  return !loading ? (
    <>
      <div className="flex  flex-col justify-center font-secondary">
        <div className="searchbar">
          <Searchbar />
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          <div className="videosearch">
            <div className=" flex flex-col mt-10 ">
              {video.length > 0 ? (
                video.map((vid) => <Preview key={vid.id} video={vid} />)
              ) : (
                <div className="flex justify-center text-gray-400 mt-10  ">
                  No videos as "{query}" was found...
                </div>
              )}
            </div>
          </div>
          <div className="usersearch">
            <div className=" flex flex-col mt-10 mr-10">
              {user.length > 0 ? (
                user.map((usr) => <Userpeview key={usr.id} user={usr} />)
              ) : (
                <div className="flex justify-center text-gray-400 mt-10">
                  No channel named "{query}" was found...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div>Loading...</div>
    </>
  );
}

export default Search;
