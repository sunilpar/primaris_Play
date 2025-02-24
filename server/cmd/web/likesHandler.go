package main

import (
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"

	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
)

type Likeform struct {
	Like_UID            string `json:"like_UID"`
	Video_UID           string `json:"video_uid"`
	User_UID            string `json:"user_uid"`
	validator.Validator `form:"-"`
}

func (app *application) addLikes(w http.ResponseWriter, r *http.Request) {
	var form Likeform
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

	err = app.likes.AddLikes(video_UID, user.ID)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "like added")
}

func (app *application) removeLikes(w http.ResponseWriter, r *http.Request) {
	var form Likeform
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

	err = app.likes.RemoveLikes(video_UID, user.ID)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "like removed")
}

func (app *application) getLikes(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	idstr := params.ByName("id")
	id, err := uuid.Parse(idstr)
	if err != nil || id == uuid.Nil {
		app.notFound(w)
		return
	}

	likes, err := app.likes.GetLikes(id)
	if err != nil {
		fmt.Printf("video_id id :%+v \n", id)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, likes)
}
