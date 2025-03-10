import React, { useState, useEffect } from "react";
import currentUser from "@/utils/Session.helper";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

const avatars = [
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633795/a_Ultramarine_kyslth.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633800/a_Black_Legions_phkry6.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633797/a_Dark_Angels_fh1baz.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633797/a_Space_Wolves_gmxw1n.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633806/a_Death_Guard_jkel7x.png",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633846/a_World_Eaters_h5lbmj.png",
];
const coverImages = [
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633796/b_Ultramarines_batrcn.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633799/b_Black_Legion_nv6j2a.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633798/b_Dark_Angels_y1j3gg.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633795/b_Space_Wolves_u3ms8x.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633799/b_Death_Guard_uibokz.jpg",
  "https://res.cloudinary.com/daxgavwpd/image/upload/v1740633798/b_World_Eaters_uf6qew.jpg",
];

interface AvatarselectionProps {
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCoverImage: React.Dispatch<React.SetStateAction<string>>;
}

function Avatarselection({
  setSelectedAvatar,
  setSelectedCoverImage,
}: AvatarselectionProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [_user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const userData = currentUser.getData();
  //     if (!userData) {
  //       navigate("/");
  //     }
  //     setUser(userData);
  //     setSelectedAvatar(userData.avatar);
  //     setSelectedCoverImage(userData.coverimage);
  //     setLoading(false);
  //   })();
  // }, [navigate, setSelectedAvatar, setSelectedCoverImage]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const userData = currentUser.getData();
      if (!userData) {
        navigate("/");
      } else {
        setUser(userData);
        setSelectedAvatar(userData.avatar || avatars[0]);
        setSelectedCoverImage(userData.coverimage || coverImages[0]);
      }
      setLoading(false);
    })();
  }, [navigate, setSelectedAvatar, setSelectedCoverImage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl m-2 font-bold">Select a New Avatar</h3>
      <div
        className="m-5 justify-between flex-wrap"
        style={{ display: "flex", gap: "20px" }}
      >
        <div className="flex flex-wrap gap-2">
          {avatars.map((avatar) => (
            <img
              className="rounded-full "
              key={avatar}
              src={avatar}
              alt="Avatar Option"
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                objectFit: "cover",
              }}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </div>
      </div>

      <h3 className="text-2xl m-2 font-bold">Select a New Cover Image</h3>
      <div
        className=" flex-wrap justify-center lg:flex-row flex-col"
        style={{ display: "flex", gap: "10px" }}
      >
        {coverImages.map((cover) => (
          <img
            className="lg:w-[30%] lg:h-[201px] object-cover"
            key={cover}
            src={cover}
            alt="Cover Option"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedCoverImage(cover)}
          />
        ))}
      </div>
    </div>
  );
}

export default Avatarselection;
