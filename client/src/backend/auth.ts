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
}

const authService = new AuthService();
export default authService;
