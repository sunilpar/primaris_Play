import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/backend/auth";
import currentUser from "@/utils/Session.helper";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const user = currentUser.getData();
        if (user != null) {
          await authService.Logout();
          currentUser.clear();
          navigate("/");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center min-h-screen items-center">
      Logging out...
    </div>
  );
};

export default Logout;
