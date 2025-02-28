import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

const Userpeview: React.FC<{ user: User }> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="logo like flex  justify-between mt-10">
        <div className="logo flex ">
          <Link to={`/profile/${user.id}`}>
            <img
              className="w-[60px] h-[60px] object-cover rounded-full"
              src={user?.avatar}
              alt=""
            />
          </Link>
        </div>
      </div>
      <Link to={`/profile/${user.id}`}>
        <div className="flex flex-col">
          <div className="channel_name mt-[7.4px] font-bold ">
            {user?.username}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Userpeview;
