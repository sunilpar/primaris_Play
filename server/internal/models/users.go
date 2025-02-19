package models

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type UserModelInterface interface {
	Insert(username, fullname, email, avatar, coverimage, Password string) error
	Get(ID uuid.UUID) (*User, error)
	Authenticate(email, password string) (uuid.UUID, error)
	SignJWT(w http.ResponseWriter, id uuid.UUID) (refreshtoken string, err error)
	Exists(email string) (bool, error)
	UpdatePassword(id uuid.UUID, Password string) error
	UpdateUserdetails(id uuid.UUID, Username, Fullname, Email, Coverimage, Avatar string) error
	ValidateRefreshToken(user_uid uuid.UUID) (string, error)
	InsertIntoSession(id uuid.UUID, refresh_token string) error
	UpdateSession(id uuid.UUID, refresh_token string) error
	SearchUser(query string) (users []User, err error)
}

type User struct {
	ID         uuid.UUID `json:"id"`
	Username   string    `json:"username"`
	Fullname   string    `json:"fullname"`
	Email      string    `json:"email"`
	Avatar     string    `json:"avatar"`
	Coverimage string    `json:"coverimage"`
	Created    time.Time `json:"created"`
}

type UserModel struct{ DB *sql.DB }

func (m *UserModel) Insert(Username, Fullname, Email, Avatar, Coverimage, Password string) error {

	HashedPassword, err := bcrypt.GenerateFromPassword([]byte(Password), 12)
	if err != nil {
		return err
	}

	stmt := `
  INSERT INTO users (username, fullname, email, coverimage, hash_password, avatar)
  VALUES ($1, $2,$3, $4, $5, $6);

`
	_, err = m.DB.Exec(stmt, Username, Fullname, Email, Coverimage, string(HashedPassword), Avatar)
	if err != nil {
		return err
	}

	fmt.Println("data inserted")
	return nil
}
func (m *UserModel) Get(ID uuid.UUID) (*User, error) {
	stmt := `SELECT user_uid, username, fullname, email, avatar, coverimage, created 
	FROM users WHERE user_uid= $1; `
	row := m.DB.QueryRow(stmt, ID)
	u := &User{}

	err := row.Scan(&u.ID, &u.Username, &u.Fullname, &u.Email, &u.Avatar, &u.Coverimage, &u.Created)
	if err != nil {
		return nil, err
	}

	return u, nil
}
func (m *UserModel) Authenticate(email, password string) (uuid.UUID, error) {
	var id uuid.UUID
	var hashedPassword []byte

	stmt := "SELECT user_uid, hash_password FROM users WHERE email = $1"

	err := m.DB.QueryRow(stmt, email).Scan(&id, &hashedPassword)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return uuid.Nil, ErrInvalidCredentials
		} else {
			return uuid.Nil, err
		}
	}

	err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(password))
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return uuid.Nil, ErrInvalidCredentials
		} else {
			return uuid.Nil, err
		}
	}
	return id, nil
}
func (m *UserModel) SignJWT(w http.ResponseWriter, id uuid.UUID) (refreshtoken string, err error) {
	auth_token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	auth_tokenString, err := auth_token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "", err
	}

	refresh_token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	refresh_tokenString, err := refresh_token.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil {
		return "", err
	}

	cookie1 := &http.Cookie{
		Name:     "authorization",
		Value:    auth_tokenString,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
	}

	cookie2 := &http.Cookie{
		Name:     "refresh_token",
		Value:    refresh_tokenString,
		Expires:  time.Now().Add(24 * 7 * time.Hour),
		HttpOnly: true,
	}

	http.SetCookie(w, cookie1)
	http.SetCookie(w, cookie2)

	return refresh_tokenString, nil
}
func (m *UserModel) Exists(email string) (bool, error) {
	var exists bool
	stmt := `SELECT EXISTS (
            SELECT 1
            FROM users
            WHERE email = $1);`

	err := m.DB.QueryRow(stmt, email).Scan(&exists)
	return exists, err
}
func (m *UserModel) UpdatePassword(id uuid.UUID, Password string) error {
	HashedPassword, err := bcrypt.GenerateFromPassword([]byte(Password), 12)
	if err != nil {
		return err
	}
	stmt := `UPDATE users
	SET hash_password= $1
	WHERE user_uid= $2;
	`
	_, err = m.DB.Exec(stmt, string(HashedPassword), id)
	if err != nil {
		return err
	}
	return nil

}
func (m *UserModel) UpdateUserdetails(id uuid.UUID, Username, Fullname, Email, Coverimage, Avatar string) error {
	stmt := `UPDATE users
	SET username = $1, fullname = $2, email= $3, coverimage = $4, avatar= $5
	WHERE user_uid = $6;`

	_, err := m.DB.Exec(stmt, Username, Fullname, Email, Coverimage, Avatar, id)
	if err != nil {
		return err
	}
	return nil

}
func (m *UserModel) ValidateRefreshToken(user_uid uuid.UUID) (string, error) {
	var refresh_token string
	stmt := `SELECT refreshtoken FROM session 
		WHERE user_uid = $1;`

	err := m.DB.QueryRow(stmt, user_uid).Scan(&refresh_token)
	return refresh_token, err
}
func (m *UserModel) InsertIntoSession(id uuid.UUID, refresh_token string) error {
	stmt := `INSERT INTO session( user_uid, refreshtoken)
	VALUES ($1,$2);
	`
	_, err := m.DB.Exec(stmt, id, refresh_token)
	if err != nil {
		return err
	}
	return nil

}
func (m *UserModel) UpdateSession(id uuid.UUID, refresh_token string) error {
	stmt := `UPDATE session
	SET refreshtoken = $1
	 WHERE user_uid = $2;`
	_, err := m.DB.Exec(stmt, refresh_token, id)
	if err != nil {
		return err
	}
	return nil

}
func (m *UserModel) SearchUser(query string) (users []User, err error) {
	stmt := `SELECT user_uid,username,fullname,email,avatar,coverimage,created FROM users
	WHERE username ILIKE '%' || $1 || '%'
	ORDER BY SIMILARITY(username, $1) DESC;`

	rows, err := m.DB.Query(stmt, query)
	if err != nil {

		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user User

		if err = rows.Scan(&user.ID, &user.Username, &user.Fullname, &user.Email, &user.Avatar, &user.Coverimage, &user.Created); err != nil {
			return nil, fmt.Errorf("scanning comment: %v", err)
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	fmt.Println("query fetched")
	return users, nil

}
