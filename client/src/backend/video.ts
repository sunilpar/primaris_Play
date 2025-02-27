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
  async getVideosforHome() {
    try {
      const data = {};
      return await AxiosHelper(`${apiUrl}/user/allvideo/search`, data, "get");
    } catch (error) {
      console.error("Error fetching video :", error);
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

  async updateThumbnail(thumbnail_url: string | null, video_uid: string) {
    try {
      const data = {
        ID: video_uid,
        Thumbnail: thumbnail_url,
      };
      return await AxiosHelper(
        `${apiUrl}/user/video/updateThumbnail`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error while updating thumbnail", error);
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

  async insertVideo(
    video_url: string | null,
    thumbnail_url: string | null,
    title: string,
    description: string,
    ispublic: boolean
  ) {
    if (
      video_url == null ||
      thumbnail_url == null ||
      title == "" ||
      description == ""
    ) {
      console.error("given field cant be empty ");
    }
    try {
      const data = {
        Videofile: video_url,
        Thumbnail: thumbnail_url,
        Title: title,
        Description: description,
        Ispublic: ispublic,
      };
      return await AxiosHelper(
        `${apiUrl}/user/video/insertDetails`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error while inserting the video details:", error);
    }
    return null;
  }

  async updateVideoDetails(
    video_uid: string,
    title: string | undefined,
    description: string | undefined,
    ispublic: boolean | undefined
  ) {
    if (video_uid == "" || !title || !description || !ispublic) {
      console.error("non of the fileds can be blank");
    }

    try {
      const data = {
        ID: video_uid,
        Title: title,
        Description: description,
        Ispublic: ispublic,
      };
      return await AxiosHelper(
        `${apiUrl}/user/video/updateOtherdetails`,
        data,
        "post"
      );
    } catch (error) {
      console.error("Error while inserting the video details:", error);
    }
    return null;
  }
}

const videoService = new VideoService();
export default videoService;
