package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/justinas/nosurf"
	"github.com/rs/cors"
)

type contextKey string

const userContextKey contextKey = "user"

type CustomClaims struct {
	UserID uuid.UUID `json:"id"`
	jwt.RegisteredClaims
}

func secureHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Security-Policy", "default-src 'self'; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com")
		w.Header().Set("Referrer-Policy", "origin-when-cross-origin")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "deny")
		w.Header().Set("X-XSS-Protection", "0")
		next.ServeHTTP(w, r)
	})
}

func (app *application) logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.infoLog.Printf("%s - %s %s %s", r.RemoteAddr, r.Proto, r.Method, r.URL.RequestURI())
		next.ServeHTTP(w, r)
	})
}

func (app *application) recoverPanic(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				w.Header().Set("Connection", "close")
				app.serverError(w, fmt.Errorf("%s", err))
			}
		}()

		next.ServeHTTP(w, r)
	})
}

func noSurf(next http.Handler) http.Handler {
	csrfHandler := nosurf.New(next)
	csrfHandler.SetBaseCookie(http.Cookie{HttpOnly: true, Path: "/", Secure: true})
	return csrfHandler
}

func (app *application) requireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("authorization")
		if err != nil {
			WriteJSON(w, 401, fmt.Sprintf("error is :%v", err)) //if route doesnt have user it will not recognize cookie ??
			return
		}
		tokenString := cookie.Value

		claims := &CustomClaims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("SECRET")), nil
		})
		if err != nil {
			app.serverError(w, err)
			return
		}

		if !token.Valid {
			WriteJSON(w, 401, "token was not valid ")
			return
		}

		if claims.ExpiresAt.Time.Before(time.Now()) {
			WriteJSON(w, 401, "token has already expire please log in ")
			return
		}

		user, err := app.users.Get(claims.UserID)
		if err != nil {
			WriteJSON(w, 500, " couldn't get user data from Db after token validation ")
			return
		}

		ctx := context.WithValue(r.Context(), userContextKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

var corsHandler = cors.New(cors.Options{
	AllowedOrigins:   []string{"http://localhost:*"},
	AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	AllowedHeaders:   []string{"Content-Type", "Authorization"},
	AllowCredentials: true,
})

func (app *application) cors(next http.Handler) http.Handler {
	return corsHandler.Handler(next)
}
