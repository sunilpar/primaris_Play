package models

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
)

type LikesModelInterface interface {
	AddLikes(video_uid uuid.UUID, user_uid uuid.UUID) error
	RemoveLikes(video_uid uuid.UUID, user_uid uuid.UUID) error
	GetLikes(video_uid uuid.UUID) (int, error)
}

type LikesModel struct{ DB *sql.DB }

func (m *LikesModel) AddLikes(video_uid uuid.UUID, user_uid uuid.UUID) error {

	stmt := `INSERT INTO likes (video, likedby)
	VALUES ($1,$2);`
	_, err := m.DB.Exec(stmt, video_uid, user_uid)
	if err != nil {
		return err
	}
	fmt.Println("like added")
	return nil
}

func (m *LikesModel) RemoveLikes(video_uid uuid.UUID, user_uid uuid.UUID) error {

	stmt := `DELETE FROM likes
	WHERE video = $1 AND likedby = $2;`
	_, err := m.DB.Exec(stmt, video_uid, user_uid)
	if err != nil {
		return err
	}
	fmt.Println("like removed")
	return nil
}

func (m *LikesModel) GetLikes(video_uid uuid.UUID) (int, error) {
	var likes int
	stmt := ` SELECT COUNT(likedby) FROM likes
	 WHERE video = $1;`

	err := m.DB.QueryRow(stmt, video_uid).Scan(&likes)
	if err != nil {
		return 0, err
	}

	fmt.Println("like fetched")
	return likes, nil
}
