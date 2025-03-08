package main

import (
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"

	"github.com/google/uuid"
)

type Historyform struct {
	Video_UID           string `json:"video_UID"`
	User_UID            string `json:"user_UID"`
	validator.Validator `form:"-"`
}

func (app *application) addHistory(w http.ResponseWriter, r *http.Request) {
	var form Historyform
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

	err = app.history.AddHistory(video_UID, user.ID)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "history added ")
}

func (app *application) removeHistory(w http.ResponseWriter, r *http.Request) {
	var form Historyform
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

	err = app.history.DeleteHistory(video_UID, user.ID)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("video_id id :%+v \n", video_UID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "history removed ")
}

func (app *application) getHistory(w http.ResponseWriter, r *http.Request) {

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	history, err := app.history.GetHistory(user.ID)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, history)
}
