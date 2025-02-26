import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class HistoryService {
  async getHistory() {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/history/get`, data, "post");
    } catch (error) {
      console.error("Error fetching history :", error);
    }
    return null;
  }

  async addHistory(video_uid: string) {
    try {
      const data = {
        Video_UID: video_uid,
      };

      return await AxiosHelper(`${apiUrl}/user/history/add`, data, "post");
    } catch (error) {
      console.error("Error while adding history", error);
    }
    return null;
  }

  async removeHistory(video_uid: string) {
    try {
      const data = {
        Video_UID: video_uid,
      };

      return await AxiosHelper(`${apiUrl}/user/history/delete`, data, "post");
    } catch (error) {
      console.error("Error while removing history", error);
    }
    return null;
  }
}

const historyService = new HistoryService();
export default historyService;
