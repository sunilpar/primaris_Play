import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class AuthService {
  async getUserById(id: string) {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/getuser/${id}`, data, "get");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    return null;
  }

  async SearchUser(query: string) {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/search/${query}`, data, "get");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    return null;
  }

  async Login(email: string, password: string) {
    try {
      const data = {
        Email: email,
        Password: password,
      };

      return await AxiosHelper(`${apiUrl}/user/login`, data, "post");
    } catch (error) {
      console.error("Error while logging in:", error);
    }
    return null;
  }

  async Logout() {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/logout`, data, "get");
    } catch (error) {
      console.error("Error while logging userout:", error);
    }
    return null;
  }

  async RefreshSession() {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/refreshsession`, data, "get");
    } catch (error) {
      console.error("Error while refreshing the session:", error);
    }
    return null;
  }

  async Signup(
    fullname: string,
    username: string,
    email: string,
    password: string,
    avatar: string,
    coverimage: string
  ) {
    try {
      const data = {
        Fullname: fullname,
        Username: username,
        Email: email,
        Password: password,
        Avatar: avatar,
        Coverimage: coverimage,
      };

      return await AxiosHelper(`${apiUrl}/user/signup`, data, "post");
    } catch (error) {
      console.error("Error while signup:", error);
    }
    return null;
  }

  async ChangePassword(oldpassword: string, newpassword: string) {
    try {
      const data = {
        OldPassword: oldpassword,
        NewPassword: newpassword,
      };

      return await AxiosHelper(`${apiUrl}/user/changepassword`, data, "post");
    } catch (error) {
      console.error("Error while changing the password", error);
    }
    return null;
  }

  async ChangeUserDetails(
    fullname: string,
    username: string,
    email: string,
    avatar: string,
    coverimage: string
  ) {
    try {
      const data = {
        Fullname: fullname,
        Username: username,
        Email: email,
        Avatar: avatar,
        Coverimage: coverimage,
      };

      return await AxiosHelper(
        `${apiUrl}/user/changeuserdetails`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error while signup:", error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
