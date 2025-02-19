package main

import (
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"

	"github.com/google/uuid"
)

type VideoInsert struct {
	VIdeo_UID           uuid.UUID `json:"video_uid"`
	ID                  string    `json:"id"`
	Videofile           string    `json:"videofile"`
	Thumbnail           string    `json:"thumbnail"`
	Title               string    `json:"title"`
	Description         string    `json:"description"`
	Ispublic            bool      `json:"ispublic"`
	validator.Validator `form:"-"`
}
type UploadFile struct {
	Video               string `json:"video"`
	Video_url           string `json:"video_url"`
	Thumbnail           string `json:"thumbnail"`
	Thumbnail_url       string `json:"thumbnail_url"`
	validator.Validator `form:"-"`
}

type Query struct {
	Query               string `json:"query"`
	validator.Validator `form:"-"`
}

// make it so that when you send time data parse it in human readable form
func (app *application) insertVideoData(w http.ResponseWriter, r *http.Request) {
	var form VideoInsert

	err := app.decodePostForm(r, &form)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}
	//validations
	form.CheckField(validator.NotBlank(form.Videofile), "Videofile", "Videofile  cannot be blank")
	form.CheckField(validator.NotBlank(form.Thumbnail), "Thumbnail", "Thumbnail cannot be blank")
	form.CheckField(validator.NotBlank(form.Title), "Title", "Title cannot be blank")
	form.CheckField(validator.NotBlank(form.Description), "Description", "Description cannot be blank")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	err = app.video.InsertVideoDetails(form.Videofile, form.Thumbnail, form.Title, form.Description, form.Ispublic, user.ID)
	if err != nil {
		app.serverError(w, err)
		return
	}
	form.VIdeo_UID, err = app.video.GiveVideoID(form.Videofile, user.ID)
	if err != nil {
		WriteJSON(w, 500, "error during retival of uploaded video_uid")
		return
	}
	WriteJSON(w, 200, form)

}
func (app *application) videoUpload(w http.ResponseWriter, r *http.Request) {
	url, err := app.uploadfile("Videofile", w, r)
	if err != nil {
		WriteJSON(w, 500, "error during videoupload upload may be file size was too big ")
		return
	}
	WriteJSON(w, 200, url)

}
func (app *application) thumbnailUpload(w http.ResponseWriter, r *http.Request) {
	url, err := app.uploadfile("Thumbnail", w, r)
	if err != nil {
		WriteJSON(w, 500, "error during thumbnail upload but video was uploaded")
		return
	}

	WriteJSON(w, 200, url)

}
func (app *application) changeThumbnail(w http.ResponseWriter, r *http.Request) {
	var form VideoInsert
	//might need to check if the current logged in user is the one making this request
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}
	VIdeo_UID, err := uuid.Parse(form.ID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Thumbnail), "Thumbnail", "thumbnail  cannot be blank")
	if VIdeo_UID == uuid.Nil {
		app.clientError(w, 401)
		return
	}
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	exist, err := app.video.VideoExists(VIdeo_UID)
	if err != nil || !exist {
		app.serverError(w, err)
		return
	}

	url, err := app.video.UpdateThumbnail(VIdeo_UID, form.Thumbnail)
	if err != nil {
		WriteJSON(w, 500, "couldn't update the thumbnail file ")
		return
	}
	WriteJSON(w, 200, url)

}
func (app *application) changeVideoDetails(w http.ResponseWriter, r *http.Request) {
	var form VideoInsert
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}
	VIdeo_UID, err := uuid.Parse(form.ID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Title), "Title", "Title cannot be blank")
	form.CheckField(validator.NotBlank(form.Description), "Description", "Description cannot be blank")
	if VIdeo_UID == uuid.Nil {
		app.clientError(w, 401)
		return
	}
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	exist, err := app.video.VideoExists(VIdeo_UID)
	if err != nil || !exist {
		app.serverError(w, err)
		return
	}

	err = app.video.UpdateVideoDetails(VIdeo_UID, form.Title, form.Description, form.Ispublic)
	if err != nil {
		WriteJSON(w, 500, "couldn't update the thumbnail file ")
		return
	}
	video, err := app.video.GetVideoByID(VIdeo_UID)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, video)

}
func (app *application) getVideoByID(w http.ResponseWriter, r *http.Request) {
	var form VideoInsert
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}
	VIdeo_UID, err := uuid.Parse(form.ID)
	if err != nil {
		WriteJSON(w, 400, "could parse sent ID")
		return
	}

	video, err := app.video.GetVideoByID(VIdeo_UID)
	if err != nil {
		WriteJSON(w, 400, "could't get video by id ")
		return
	}
	WriteJSON(w, 200, video)

}
func (app *application) getVideoByTitle(w http.ResponseWriter, r *http.Request) {
	var form VideoInsert
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	video, err := app.video.GetVideoByTitle(form.Title)
	if err != nil {
		WriteJSON(w, 400, "could't get video by title ")
		return
	}
	WriteJSON(w, 200, video)

}
func (app *application) searchVideosByQuery(w http.ResponseWriter, r *http.Request) {
	var form Query
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Query), "query", "query cannot be blank")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	videos, err := app.video.SearchVideo(form.Query)
	if err != nil {
		WriteJSON(w, 400, "could't get video by title ")
		return
	}
	WriteJSON(w, 200, videos)

}
func (app *application) getAllVideosOfUser(w http.ResponseWriter, r *http.Request) {

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}
	videos, err := app.video.GetAllVideo(user.ID)
	if err != nil {
		WriteJSON(w, 400, fmt.Sprintf("the while reading from db %+v", err))
		return
	}
	WriteJSON(w, 200, videos)

}
