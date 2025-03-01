import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import videoService from "@/backend/video.ts";
import Preview from "@/components/video/Preview";
import Spinner from "@/components/skeleton/Spinner";
interface Video {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  created: string;
}
function Home() {
  const [video, setVideo] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await videoService.getVideosforHome();
        setLoading(false);
        if (response != null) {
          setVideo(response);
        }
      } catch (error) {
        console.error("error while getting video \n", error);
      }
    })();
  }, []);

  return !loading ? (
    <>
      <div className=" flex flex-wrap justify-center">
        {video.map((vid) => (
          <Preview key={vid.id} video={vid} />
        ))}
      </div>
    </>
  ) : (
    <>
      <Spinner />
    </>
  );
}

export default Home;
