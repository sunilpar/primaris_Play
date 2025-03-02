import AxiosHelper from "../utils/axios.Helper.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export class PlaylistService {
  async getPlaylistById(playlist_uid: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/playlist/getbyid/${playlist_uid}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
    return null;
  }

  async getPlaylistByName(name: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/playlist/getbyname/${name}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error fetching playlist by name", error);
    }
    return null;
  }

  async getAllPlaylist(id: string) {
    try {
      const data = {};
      return await AxiosHelper(
        `${apiUrl}/user/playlist/getall/${id}`,
        data,
        "get"
      );
    } catch (error) {
      console.error("Error fetching all history of the user", error);
    }
    return null;
  }

  async createPlaylist(video_uid: string, name: string, ispublic: boolean) {
    if (video_uid == "" || name == "") {
      console.log("the fields cant be empty");
      return;
    }
    try {
      const data = {
        Video_UID: video_uid,
        Name: name,
        IsPublic: ispublic,
      };
      return await AxiosHelper(`${apiUrl}/user/playlist/create`, data, "post");
    } catch (error) {
      console.error("Error creating a playlist", error);
    }
    return null;
  }

  async addVideo(playlist_uid: string, video_uid: string) {
    if (playlist_uid == "" || video_uid == "") {
      console.log("the fields cant be empty");
      return;
    }
    try {
      const data = {
        Video_UID: video_uid,
        Playlist_uid: playlist_uid,
      };
      return await AxiosHelper(`${apiUrl}/user/playlist/add`, data, "post");
    } catch (error) {
      console.error("Error updating a video in playlist", error);
    }
    return null;
  }

  async updatePlaylist(playlist_uid: string, name: string, ispublic: boolean) {
    if (playlist_uid == "" || name == "") {
      console.log("the fields cant be empty");
      return;
    }
    try {
      const data = {
        Playlist_uid: playlist_uid,
        Name: name,
        IsPublic: ispublic,
      };
      return await AxiosHelper(`${apiUrl}/user/playlist/update`, data, "post");
    } catch (error) {
      console.error("Error updating a playlist", error);
    }
    return null;
  }

  async deletePlaylist(playlist_uid: string) {
    if (playlist_uid == "") {
      console.log("the fields cant be empty");
      return;
    }
    try {
      const data = {
        Playlist_uid: playlist_uid,
      };
      return await AxiosHelper(`${apiUrl}/user/playlist/remove`, data, "post");
    } catch (error) {
      console.error("Error deleting a playlist", error);
    }
    return null;
  }
}

const playlistService = new PlaylistService();
export default playlistService;
