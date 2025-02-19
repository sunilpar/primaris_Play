package main

import (
	"database/sql"
	"flag"
	"github/sunilpar/yt-api/internal/models"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/go-playground/form/v4"
	"github.com/joho/godotenv"
)

type application struct {
	errorLog    *log.Logger
	infoLog     *log.Logger
	users       models.UserModelInterface
	video       models.VideoModelInterface
	sub         models.SubcriptionModelInterface
	comment     models.CommentModelInterface
	likes       models.LikesModelInterface
	history     models.HistoryModelInterface
	playlist    models.PlaylistModelInterface
	formDecoder *form.Decoder
}

func main() {

	addr := flag.String("addr", ":4000", "HTTP network address")
	flag.Parse()
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db, err := openDB()
	if err != nil {
		errorLog.Fatal(err)
	}
	defer db.Close()
	formDecoder := form.NewDecoder()

	app := &application{
		errorLog:    errorLog,
		infoLog:     infoLog,
		users:       &models.UserModel{DB: db},
		video:       &models.VideoModel{DB: db},
		sub:         &models.SubcriptionModel{DB: db},
		comment:     &models.CommentModel{DB: db},
		likes:       &models.LikesModel{DB: db},
		history:     &models.HistoryModel{DB: db},
		playlist:    &models.PlaylistModel{DB: db},
		formDecoder: formDecoder,
	}

	srv := &http.Server{
		Addr:     *addr,
		ErrorLog: errorLog,
		Handler:  app.routes(),
	}

	infoLog.Printf("server on port on http://localhost%v", *addr)
	err = srv.ListenAndServe()
	errorLog.Fatal(err)

}

func openDB() (*sql.DB, error) {

	DB_URI := os.Getenv("DB_URI")
	conn, _ := url.Parse(DB_URI)

	conn.RawQuery = "sslmode=verify-ca;sslrootcert=ca.pem"

	db, err := sql.Open("postgres", conn.String())
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}
