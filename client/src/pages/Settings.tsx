import React, { useState, useEffect } from "react";
import currentUser from "@/utils/Session.helper";
import authService from "@/backend/auth";
import { Link, useNavigate } from "react-router-dom";
import Avatarselection from "@/components/usersettings/Avatarselection";

interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  coverimage: string;
  created: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [selectedCoverImage, setSelectedCoverImage] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const currentUserData = currentUser.getData();
      if (!currentUserData) {
        navigate("/");
      } else {
        setUser(currentUserData);
        setFormData(currentUserData);
        setSelectedAvatar(currentUserData.avatar);
        setSelectedCoverImage(currentUserData.coverimage);
      }
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    if (user) {
      await authService.ChangeUserDetails(
        formData.fullname || user.fullname,
        formData.username || user.username,
        formData.email || user.email,
        selectedAvatar || user.avatar,
        selectedCoverImage || user.coverimage
      );
      setUser({
        ...user,
        ...formData,
        avatar: selectedAvatar,
        coverimage: selectedCoverImage,
      });
      alert("changes will apper after you RE LOGIN");
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords do not match");

      return;
    }
    await authService.ChangePassword(
      passwords.oldPassword,
      passwords.newPassword
    );
    alert("Password changed successfully it will take effect in next login");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="coverimg and avatar">
        <div
          className="relative logo flex w-full lg:h-[400px] min-h-[300px]  rounded-2xl pt-10 sm:pt-0 overflow-hidden"
          style={{
            backgroundImage: `url(${selectedCoverImage || user?.coverimage})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent from-1% opacity-60 z-20"></div>
          <div className=" object-cover rounded-full  flex flex-col justify-end z-50 ml-5">
            <img
              src={selectedAvatar || user?.avatar}
              alt="Avatar"
              className="w-[200px] h-[200px] object-cover rounded-full border-2 border-[#c4ab88] cursor-pointer"
            />
            <p className="mt-[7.4px] text-2xl font-extrabold flex justify-center">
              {user?.username}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full ">
        {/* Add Avatarselection Component */}
        <Avatarselection
          setSelectedAvatar={setSelectedAvatar}
          setSelectedCoverImage={setSelectedCoverImage}
        />
        <div className="lg:mr-20 flex lg:justify-end justify-center">
          <button
            onClick={handleSaveChanges}
            className="bg-[#c4ab88] px-4 py-2 rounded font-bold text-black mt-[19px]"
          >
            Update
          </button>
        </div>

        <div className="p-6 flex flex-wrap justify-center gap-10">
          <div className="userupdate ring-2 ring-[#c4ab88] p-6 rounded-2xl min-h-[400px]">
            <div className="mb-5 text-xl font-bold lg:w-[300px]">
              Change your user information
            </div>
            <div className="flex flex-col gap-4 font-bold">
              {editingField === "username" ? (
                <>
                  <div className="opacity-80 text-[#c4ab88]"> Username:</div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="text-white underline"
                  />
                </>
              ) : (
                <>
                  <div className="opacity-80 text-[#c4ab88]"> Username:</div>
                  <div className="flex justify-between font-bold ">
                    <p> {user?.username}</p>
                    <button onClick={() => setEditingField("username")}>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Edit</title>
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                            fill="#ffffff"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>
                </>
              )}
              {editingField === "fullname" ? (
                <>
                  <div className="opacity-80 text-[#c4ab88]"> Fullname:</div>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="text-white underline "
                  />
                </>
              ) : (
                <>
                  <div className="opacity-80 text-[#c4ab88]"> Fullname:</div>
                  <div className="flex justify-between">
                    <p> {user?.fullname}</p>
                    <button onClick={() => setEditingField("fullname")}>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Edit</title>
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                            fill="#ffffff"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>
                </>
              )}
              {editingField === "email" ? (
                <>
                  <div className="opacity-80 text-[#c4ab88]"> Email:</div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-white underline"
                  />
                </>
              ) : (
                <>
                  <div className="opacity-80 text-[#c4ab88]"> Email:</div>
                  <div className="flex justify-between">
                    <p> {user?.email}</p>
                    <button onClick={() => setEditingField("email")}>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Edit</title>
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                            fill="#ffffff"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </div>
                </>
              )}
              <button
                onClick={handleSaveChanges}
                className="bg-[#c4ab88] px-4 py-2 rounded text-black"
              >
                Update
              </button>
            </div>
          </div>

          <div className="userupdate ring-2 ring-[#c4ab88] p-6 rounded-2xl text-xl flex flex-col justify-between ">
            <div className="mb-5 text-xl font-bold lg:w-[300px]">
              Change your Password
            </div>
            <input
              type="password"
              placeholder="Old Password"
              className="opacity-80 text-[#c4ab88] mb-6"
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              className="opacity-80 text-[#c4ab88] mb-6"
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="opacity-80 text-[#c4ab88] mb-6"
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmNewPassword: e.target.value,
                })
              }
            />
            <button
              onClick={handlePasswordChange}
              className="bg-[#c4ab88] px-4 py-2 rounded text-black font-bold"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
