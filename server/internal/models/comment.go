package models

import (
	"database/sql"
	"fmt"
	"github/sunilpar/yt-api/internal/validator"
	"time"

	"github.com/google/uuid"
)

type CommentModelInterface interface {
	InsertComment(video_uid uuid.UUID, user_uid uuid.UUID, comment string) error
	UpdateComment(video_uid uuid.UUID, user_uid uuid.UUID, comment string) error
	DeleteComment(video_uid uuid.UUID, user_uid uuid.UUID) error
	GetComment(video_uid uuid.UUID) ([]Commentform, error)
}
type Commentform struct {
	Comment_UID         uuid.UUID `json:"comment_UID"`
	Video_UID           uuid.UUID `json:"video_UID"`
	User_UID            uuid.UUID `json:"user_UID"`
	Comment             string    `json:"comment"`
	Created             time.Time `json:"created"`
	validator.Validator `form:"-"`
}

type CommentModel struct{ DB *sql.DB }

func (m *CommentModel) InsertComment(video_uid uuid.UUID, user_uid uuid.UUID, comment string) error {

	stmt := `INSERT INTO comments (video_uid, user_uid, comment)
	VALUES ($1,$2,$3);`
	_, err := m.DB.Exec(stmt, video_uid, user_uid, comment)
	if err != nil {
		return err
	}
	fmt.Println("comment added ")
	return nil
}
func (m *CommentModel) UpdateComment(video_uid uuid.UUID, user_uid uuid.UUID, comment string) error {

	stmt := `
	UPDATE comments
 	SET comment = $3
	WHERE video_uid = $1 AND user_uid = $2;`
	_, err := m.DB.Exec(stmt, video_uid, user_uid, comment)
	if err != nil {
		return err
	}
	fmt.Println("comment updated ")
	return nil
}
func (m *CommentModel) DeleteComment(video_uid uuid.UUID, user_uid uuid.UUID) error {

	stmt := `DELETE FROM comments
	 WHERE video_uid = $1  AND user_uid = $2 ;`
	_, err := m.DB.Exec(stmt, video_uid, user_uid)
	if err != nil {
		return err
	}
	fmt.Println("comment deleted")
	return nil
}
func (m *CommentModel) GetComment(video_uid uuid.UUID) ([]Commentform, error) {
	var comments []Commentform
	stmt := ` select * from comments
	 WHERE video_uid = $1 ;`

	rows, err := m.DB.Query(stmt, video_uid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var comment Commentform

		if err = rows.Scan(&comment.Comment_UID, &comment.Video_UID, &comment.User_UID, &comment.Comment, &comment.Created); err != nil {
			return nil, fmt.Errorf("scanning comment: %v", err)
		}
		comments = append(comments, comment)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	fmt.Println("comment fetched")
	return comments, nil
}
