package main

import (
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"

	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
)

type Subform struct {
	Channel             string `json:"Channel"`
	validator.Validator `form:"-"`
}

func (app *application) AddSubcription(w http.ResponseWriter, r *http.Request) {
	var form Subform
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
	Channel, err := uuid.Parse(form.Channel)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}
	fmt.Printf("sub id :%+v \n", user.ID)
	fmt.Printf("sub id :%+v \n", Channel)
	err = app.sub.InsertSubscription(user.ID, Channel)
	if err != nil {
		fmt.Printf("the user id is L%+v\n", user.ID)
		fmt.Printf("the channel id is L%+v\n", Channel)
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "subcribed")
}
func (app *application) RemoveSubcription(w http.ResponseWriter, r *http.Request) {
	var form Subform
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
	Channel, err := uuid.Parse(form.Channel)
	if err != nil {
		WriteJSON(w, 400, "channel cant be empty or invalid ")
		return
	}
	err = app.sub.RemoveSubcription(user.ID, Channel)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "unsubcribed")
}

func (app *application) CheckIfSubed(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	idstr := params.ByName("id")
	id, err := uuid.Parse(idstr)
	if err != nil || id == uuid.Nil {
		app.notFound(w)
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}

	isSubed, err := app.sub.IsSubed(user.ID, id)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, isSubed)
}

func (app *application) Subcount(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	idstr := params.ByName("id")
	id, err := uuid.Parse(idstr)
	if err != nil || id == uuid.Nil {
		app.notFound(w)
		return
	}
	subcount, err := app.sub.SubCount(id)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, subcount)
}
