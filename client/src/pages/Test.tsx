import React, { useState, useEffect } from "react";
import strip from "../assets/strip.png";
import authservice from "../backend/auth.ts";
function Test() {
  interface User {
    id: string;
    username: string;
    fullname: string;
    email: string;
    avatar: string;
    coverimage: string;
    created: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await authservice.getUserById(
          "cd584d50-2f6b-4322-9cdf-5112084835ec"
        );
        setLoading(false);
        console.log("res from server", response);
      } catch (error) {}
    })();
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex justify-center"></div>

      <div className="h-[5px] overflow-clip">
        <img src={strip} alt="" />
      </div>

      <div className="min-h-screen flex justify-center"></div>
    </>
  ) : (
    <>
      <div className="flex justify-center text-4xl">
        <h1>loading ...</h1>
      </div>
    </>
  );
}

export default Test;
