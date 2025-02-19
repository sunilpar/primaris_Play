package main

import (
	"errors"
	"fmt"
	"github/sunilpar/yt-api/internal/models"
	"github/sunilpar/yt-api/internal/validator"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
	_ "github.com/lib/pq"
)

type UserSignup struct {
	Username            string `json:"username"`
	Fullname            string `json:"fullname"`
	Email               string `json:"email"`
	Password            string `json:"password"`
	Coverimage          string `json:"coverimage"`
	Avatar              string `json:"avatar"`
	validator.Validator `form:"-"`
}

type UserLogin struct {
	Email               string `json:"email"`
	Password            string `json:"password"`
	validator.Validator `form:"-"`
}
type UserPasswordChange struct {
	Email               string `json:"email"`
	OldPassword         string `json:"oldpassword"`
	NewPassword         string `json:"newpassword"`
	validator.Validator `form:"-"`
}

func (app *application) getuser(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context()) //look more into context
	idstr := params.ByName("id")
	id, err := uuid.Parse(idstr)
	if err != nil || id == uuid.Nil {
		app.notFound(w)
		return
	}

	user, err := app.users.Get(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecord) {
			app.notFound(w)
		} else {
			app.serverError(w, err)
		}
		return
	}
	err = WriteJSON(w, 200, user)
	if err != nil {
		app.serverError(w, err)
	}

}
func (app *application) login(w http.ResponseWriter, r *http.Request) {
	var form UserLogin
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}

	form.CheckField(validator.NotBlank(form.Email), "email", "This field cannot be blank")
	form.CheckField(validator.Matches(form.Email, validator.EmailRX), "email", "This field must be a valid email address")
	form.CheckField(validator.NotBlank(form.Password), "password", "This field cannot be blank")
	form.CheckField(validator.MinChars(form.Password, 8), "password", "This field must be at least 8 characters long")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	id, err := app.users.Authenticate(form.Email, form.Password)
	if err != nil {
		if err == models.ErrInvalidCredentials {
			err = WriteJSON(w, 404, "invalid password")
			if err != nil {
				app.serverError(w, err)
			}
		}
		app.clientError(w, http.StatusBadRequest)
	}

	refreshtoken, err := app.users.SignJWT(w, id)
	if err != nil {
		app.serverError(w, err)
	}

	err = app.users.UpdateSession(id, refreshtoken)
	if err != nil {
		app.serverError(w, err)
		return
	}

	user, err := app.users.Get(id)
	if err != nil {
		app.serverError(w, err)
	}
	err = WriteJSON(w, 200, user)
	if err != nil {
		app.serverError(w, err)
	}

}
func (app *application) signup(w http.ResponseWriter, r *http.Request) {
	var form UserSignup

	err := app.decodePostForm(r, &form)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}
	//validations
	form.CheckField(validator.NotBlank(form.Username), "username", "username  cannot be blank")
	form.CheckField(validator.NotBlank(form.Fullname), "fullname", "fullname cannot be blank")
	form.CheckField(validator.NotBlank(form.Avatar), "avatar", "avatar cannot be blank")
	form.CheckField(validator.NotBlank(form.Coverimage), "coverimage", "coverimage cannot be blank")
	form.CheckField(validator.NotBlank(form.Email), "email", "email cannot be blank")
	form.CheckField(validator.Matches(form.Email, validator.EmailRX), "email", "email must be a valid email address")
	form.CheckField(validator.NotBlank(form.Password), "password", "password cannot be blank")
	form.CheckField(validator.MinChars(form.Password, 8), "password", "password must be at least 8 characters long")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}
	exists, err := app.users.Exists(form.Email)
	if err != nil {
		app.serverError(w, err)
	}
	if exists {
		WriteJSON(w, 401, "user with this email already exist")
		return
	}

	err = app.users.Insert(form.Username, form.Fullname, form.Email, form.Avatar, form.Coverimage, form.Password)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "user created")

}
func (app *application) logout(w http.ResponseWriter, r *http.Request) {

	cookie1 := &http.Cookie{
		Name:     "authorization",
		Value:    "",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		HttpOnly: true,
	}
	cookie2 := &http.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		HttpOnly: true,
	}
	http.SetCookie(w, cookie1)
	http.SetCookie(w, cookie2)
	WriteJSON(w, 200, "userlogged out")

}
func (app *application) changePassword(w http.ResponseWriter, r *http.Request) {
	var form UserPasswordChange

	err := app.decodePostForm(r, &form)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}
	form.CheckField(validator.NotBlank(form.OldPassword), "OldPassword", "OldPassword cannot be blank")
	form.CheckField(validator.NotBlank(form.NewPassword), "NewPassword", "Newpassword cannot be blank")
	form.CheckField(validator.MinChars(form.OldPassword, 8), "OldPassword", "Oldpassword must be at least 8 characters long")
	form.CheckField(validator.MinChars(form.NewPassword, 8), "NewPassword", "Newpassword must be at least 8 characters long")
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}
	id, err := app.users.Authenticate(user.Email, form.OldPassword)
	if err != nil {
		WriteJSON(w, 401, "old password doesn't match")
		return
	}
	err = app.users.UpdatePassword(id, form.NewPassword)
	if err != nil {
		app.serverError(w, err)
		return
	}
	WriteJSON(w, 200, "password was succesfully changed") //i'll let front end decide on how to logout

}
func (app *application) changeUserDetails(w http.ResponseWriter, r *http.Request) {
	var form UserSignup
	err := app.decodePostForm(r, &form)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}

	user, ok := r.Context().Value(userContextKey).(*models.User)
	if !ok {
		http.Error(w, "User not found in context", http.StatusInternalServerError)
		return
	}
	if user.Username != form.Username && strings.TrimSpace(form.Username) != "" {
		form.CheckField(validator.NotBlank(form.Username), "username", "username  cannot be blank")
		user.Username = form.Username
	}
	if user.Fullname != form.Fullname && strings.TrimSpace(form.Fullname) != "" {
		form.CheckField(validator.NotBlank(form.Fullname), "fullname", "fullname cannot be blank")
		user.Fullname = form.Fullname
	}
	if user.Avatar != form.Avatar && strings.TrimSpace(form.Avatar) != "" {
		form.CheckField(validator.NotBlank(form.Avatar), "avatar", "avatar cannot be blank")
		user.Avatar = form.Avatar
	}
	if user.Coverimage != form.Coverimage && strings.TrimSpace(form.Coverimage) != "" {
		form.CheckField(validator.NotBlank(form.Coverimage), "coverimage", "coverimage cannot be blank")
		user.Coverimage = form.Coverimage
	}
	if user.Email != form.Email && strings.TrimSpace(form.Email) != "" {
		form.CheckField(validator.NotBlank(form.Email), "email", "email cannot be blank")
		form.CheckField(validator.Matches(form.Email, validator.EmailRX), "email", "email must be a valid email address")
		user.Email = form.Email
	}
	if !form.Valid() {
		WriteJSON(w, 401, form.FieldErrors)
		return
	}

	err = app.users.UpdateUserdetails(user.ID, user.Username, user.Fullname, user.Email, user.Coverimage, user.Avatar)
	if err != nil {
		WriteJSON(w, 500, "error while updating the data in db")

	}
	WriteJSON(w, 200, "user details changed ")
}
func (app *application) refreshSession(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		app.clientError(w, http.StatusUnauthorized)
		return
	}
	tokenString := cookie.Value

	claims := &CustomClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("REFRESH_SECRET")), nil
	})
	if err != nil {
		app.serverError(w, err)
		return
	}

	if !token.Valid {
		app.clientError(w, http.StatusUnauthorized)
		return
	}

	if claims.ExpiresAt.Time.Before(time.Now()) {
		app.clientError(w, http.StatusUnauthorized)
		return
	}

	_, err = app.users.ValidateRefreshToken(claims.UserID)
	if err != nil {
		WriteJSON(w, 400, "couldn't verify the refreshtken please log in ")
		return
	}

	refresh_token, err := app.users.SignJWT(w, claims.UserID)
	if err != nil {
		WriteJSON(w, 500, "token signing process failed")
		return
	}

	err = app.users.UpdateSession(claims.UserID, refresh_token)
	if err != nil {
		app.serverError(w, err)
		return
	}

	WriteJSON(w, 200, "token refreshed successfully")

}
func (app *application) searchUserByQuery(w http.ResponseWriter, r *http.Request) {
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

	users, err := app.users.SearchUser(form.Query)
	if err != nil {
		WriteJSON(w, 400, fmt.Sprintf("the while reading from db %+v", err))
		return
	}
	WriteJSON(w, 200, users)

}
