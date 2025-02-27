import React from "react";
import { useParams } from "react-router-dom";
import subService from "@/backend/sub";
import videoService from "@/backend/video";
import authService from "@/backend/auth";

function Channel() {
  const slug = useParams();
  const id = slug.id || "";
  return <div>Channel</div>;
}

export default Channel;
