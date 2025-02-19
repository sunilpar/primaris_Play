package main

import (
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"
	"time"

	"github.com/google/uuid"
)

type Commentform struct {
	Video_UID           string    `json:"video_UID"`
	User_UID            string    `json:"user_UID"`
	Comment             string    `json:"comment"`
	Created             time.Time `json:"created"`
	validator.Validator `form:"-"`
}

func (app *application) addComment(w http.ResponseWriter, r *http.Request) {
	var form Commentform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	form.CheckField(validator.NotBlank(form.Comment), "comment", "comment cannot be blank")
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
	err = app.comment.InsertComment(video_UID, user.ID, form.Comment)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "comment added ")
}

func (app *application) updateComment(w http.ResponseWriter, r *http.Request) {
	var form Commentform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}
	form.CheckField(validator.NotBlank(form.Comment), "comment", "comment cannot be blank")
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
	err = app.comment.UpdateComment(video_UID, user.ID, form.Comment)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "comment updated ")
}

func (app *application) deleteComment(w http.ResponseWriter, r *http.Request) {
	var form Commentform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
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
	err = app.comment.DeleteComment(video_UID, user.ID)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "comment deleted")
}
func (app *application) getComments(w http.ResponseWriter, r *http.Request) {
	var form Commentform
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.serverError(w, err)
		return
	}

	video_UID, err := uuid.Parse(form.Video_UID)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}
	comments, err := app.comment.GetComment(video_UID)
	if err != nil {
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, comments)
}
