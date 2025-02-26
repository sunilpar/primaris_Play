import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class LikesService {
  async getLikes(video_uid: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/like/get/${video_uid}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error getting video:", error);
    }
    return null;
  }

  async addLike(video_uid: string) {
    try {
      const data = {
        Video_UID: video_uid,
      };

      return await AxiosHelper(`${apiUrl}/user/like/add`, data, "post");
    } catch (error) {
      console.error("Error while adding like:", error);
    }
    return null;
  }

  async removeLike(video_uid: string) {
    try {
      const data = {
        Video_UID: video_uid,
      };

      return await AxiosHelper(`${apiUrl}/user/like/remove`, data, "post");
    } catch (error) {
      console.error("Error while removing like:", error);
    }
    return null;
  }
}

const likesService = new LikesService();
export default likesService;
