import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class CommentService {
  async getcomments(video_uid: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/comment/get/${video_uid}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error fetching comments :", error);
    }
    return null;
  }

  async addComments(video_uid: string, comment: string) {
    try {
      const data = {
        Video_UID: video_uid,
        Comment: comment,
      };
      return await AxiosHelper(`${apiUrl}/user/comment/insert`, data, "post");
    } catch (error) {
      console.error("Error adding comments  :", error);
    }
    return null;
  }

  async updateComments(video_uid: string, comment: string) {
    try {
      const data = {
        Video_UID: video_uid,
        Comment: comment,
      };
      return await AxiosHelper(`${apiUrl}/user/comment/update`, data, "post");
    } catch (error) {
      console.error("Error updating comments  :", error);
    }
    return null;
  }

  async removeComments(video_uid: string) {
    try {
      const data = {
        Video_UID: video_uid,
      };
      return await AxiosHelper(`${apiUrl}/user/comment/delete`, data, "post");
    } catch (error) {
      console.error("Error removing comments  :", error);
    }
    return null;
  }
}

const commentService = new CommentService();
export default commentService;
