import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class VideoService {
  async getVideoById(id: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/video/getVideoById/${id}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error fetching video :", error);
    }
    return null;
  }

  async SearchVideo(query: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/video/search/${query}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error search fetching video :", error);
    }
    return null;
  }

  async uploadImage(file: File | null) {
    if (!file) {
      console.log("cant upload empty file ");
      return;
    }

    try {
      const data = {
        Thumbnail: file,
      };
      return await AxiosHelper(
        `${apiUrl}/user/video/thumbnailUpload`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error search fetching video :", error);
    }
    return null;
  }
  async uploadVideo(file: File | null) {
    if (!file) {
      console.log("cant upload empty file ");
      return;
    }

    try {
      const data = {
        Videofile: file,
      };
      return await AxiosHelper(
        `${apiUrl}/user/video/videoUpload`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error search fetching video :", error);
    }
    return null;
  }

  async getAllVideo() {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/video/getallvideo`, data, "get");
    } catch (error) {
      console.error("Error fetching video of user:", error);
    }
    return null;
  }
}

const videoService = new VideoService();
export default videoService;
