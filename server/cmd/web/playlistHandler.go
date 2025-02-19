package main

import (
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"

	"github.com/google/uuid"
)

type Playlistform struct {
	Name                string `json:"name"`
	Video_UID           string `json:"video_UID"`
	Playlist_uid        string `json:"Playlist_uid"`
	IsPublic            bool   `json:"ispublic"`
	validator.Validator `form:"-"`
}

func (app *application) createPlaylist(w http.ResponseWriter, r *http.Request) {
	var form Playlistform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Name), "ispublic", "ispublic cannot be blank")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}
	video_UID, err := uuid.Parse(form.Video_UID)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}

	playlist, err := app.playlist.CreatePlaylist(video_UID, user.ID, form.Name, form.IsPublic)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		fmt.Printf("name is  :%+v \n", form.Name)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, playlist)
}

func (app *application) updatePlaylist(w http.ResponseWriter, r *http.Request) {
	var form Playlistform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Name), "name", "name cannot be blank")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}
	playlist_uid, err := uuid.Parse(form.Playlist_uid)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}

	playlist, err := app.playlist.UpdatePlaylist(playlist_uid, user.ID, form.Name, form.IsPublic)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", playlist_uid)
		fmt.Printf("name is  :%+v \n", form.Name)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, playlist)
}

func (app *application) addVideos(w http.ResponseWriter, r *http.Request) {
	var form Playlistform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	Video_UID, err := uuid.Parse(form.Video_UID)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}

	playlist_uid, err := uuid.Parse(form.Playlist_uid)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}

	playlist, err := app.playlist.AddVideos(playlist_uid, Video_UID)
	if err != nil {
		fmt.Printf("video_id id :%+v \n", playlist_uid)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, playlist)
}

func (app *application) getPlaylistByID(w http.ResponseWriter, r *http.Request) {
	var form Playlistform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}
	playlist_uid, err := uuid.Parse(form.Playlist_uid)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}

	playlist, err := app.playlist.GetPlaylistByID(playlist_uid)
	if err != nil {
		fmt.Printf("video_id id :%+v \n", playlist_uid)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, playlist)
}

func (app *application) getPlaylistByName(w http.ResponseWriter, r *http.Request) {
	var form Playlistform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Name), "name", "name cannot be blank")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	playlist, err := app.playlist.GetPlaylistByName(form.Name)
	if err != nil {
		fmt.Printf("playlist name was :%+v \n", form.Name)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, playlist)
}

func (app *application) removePlaylist(w http.ResponseWriter, r *http.Request) {
	var form Playlistform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}
	playlist_uid, err := uuid.Parse(form.Playlist_uid)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	err = app.playlist.DeletePlaylist(playlist_uid, user.ID)
	if err != nil {
		fmt.Printf("video_id id :%+v \n", playlist_uid)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "playlist deleted succesfully")
}

func (app *application) getAllPlaylist(w http.ResponseWriter, r *http.Request) {

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	playlist, err := app.playlist.GetAllPlaylist(user.ID)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, playlist)
}
