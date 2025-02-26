import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class SubService {
  async getSubCount(channel_id: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/subcription/subcount/${channel_id}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error fetching subcount :", error);
    }
    return null;
  }

  async ifSubbed(channel_id: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/subcription/isSubbed/${channel_id}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error while checking is user is subbed :", error);
    }
    return null;
  }
  async addSub(channel_id: string) {
    if (!channel_id) {
      console.log("cant upload empty file ");
      return;
    }

    try {
      const data = {
        Channel: channel_id,
      };
      return await AxiosHelper(`${apiUrl}/user/subcription/add`, data, "post");
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
    return null;
  }

  async rmsub(channel_id: string) {
    if (!channel_id) {
      console.log("cant upload empty file ");
      return;
    }

    try {
      const data = {
        Channel: channel_id,
      };
      return await AxiosHelper(
        `${apiUrl}/user/subcription/remove`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error removing subscription:", error);
    }
    return null;
  }
}
const subService = new SubService();
export default subService;
