import React, { useEffect, useState } from "react";
import Localpreview from "../video/Localpreview";
import videoService from "@/backend/video";
import Preview from "../video/Preview";

interface Video {
  id: string;
  video_url: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  created: string;
}

function Featured() {
  const [video, setVideo] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVideos: Video[] = [];

        for (let i = 0; i < featuredvideo.length; i++) {
          const id = featuredvideo[i];
          const response = await videoService.getVideoById(id);

          if (response) {
            fetchedVideos.push(response);
          }
        }

        setVideo(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featuredvideo = [
    "9d1b3479-d3ea-44d6-b71d-68ab9f8db3db",
    "e0b13181-3aaf-45d2-868d-4a9e44ea9c90",
    "d5e90bb3-41e4-4f52-8681-d7c3a1bd95c9",
    "d73d38e8-5d49-47a8-a920-39c5871e0192",
    "43bca966-48f7-457a-a5c2-a9f97229c8b3",
    "1294c203-4373-4023-8c4a-cf454cc029ec",
  ];
  return video.length > 0 ? (
    <>
      <div className="min-h-screen flex flex-col justify-center p-2 mt-20  relative ">
        <div className="flex justify-center flex-wrap items-center  z-10">
          <Localpreview name={"video1"} title={"Guilliman to his Emperor"} />
          <Localpreview name={"video2"} title={"Emperor's Angels"} />
          <Localpreview name={"video3"} title={"The heretic son Horus"} />
          <Localpreview name={"video4"} title={"Ancient enemy"} />
        </div>
        <div className="flex justify-center flex-wrap items-center  mb-40">
          {video.map((vid) => (
            <Preview key={vid.id} video={vid} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Featured;
