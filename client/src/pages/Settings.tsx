import React, { useState, useEffect } from "react";
import currentUser from "@/utils/Session.helper";
import videoService from "@/backend/video";
import { Link, useNavigate } from "react-router-dom";
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
type Props = {};

function Settings({}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
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
      } catch (error) {
        console.error("no current user ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <div>Settings</div>;
}

export default Settings;
