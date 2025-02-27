package models

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
)

type VideoModelInterface interface {
	InsertVideoDetails(Videofile, Thumbnail, Title, Description string, ispublic bool, Owner uuid.UUID) error
	GiveVideoID(Videofile string, Owner uuid.UUID) (ID uuid.UUID, err error)
	VideoExists(video_uid uuid.UUID) (bool, error)
	UpdateThumbnail(video_uid uuid.UUID, url string) (string, error)
	UpdateVideoDetails(VIdeo_UID uuid.UUID, Title, Description string, Ispublic bool) error
	GetVideoByID(Video_uid uuid.UUID) (video Video, err error)
	GetVideoByTitle(title string) (video Video, err error)
	SearchVideo(query string) (videos []Video, err error)
	GetAllVideo(id uuid.UUID) (videos []Video, err error)
	AllVideo() (videos []Video, err error)
}

type Video struct {
	ID          uuid.UUID `json:"id"`
	Videofile   string    `json:"videofile"`
	Thumbnail   string    `json:"thumbnail"`
	Owner       uuid.UUID `json:"owner"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Ispublic    bool      `json:"ispublic"`
	Created     time.Time `json:"created"`
}

type VideoModel struct{ DB *sql.DB }

func (m *VideoModel) InsertVideoDetails(Videofile, Thumbnail, Title, Description string, ispublic bool, Owner uuid.UUID) error {

	stmt := `INSERT INTO videos(videofile, thumbnail, owner, title, description ,isPublic)
	VALUES ($1, $2, $3, $4, $5, $6);`
	_, err := m.DB.Exec(stmt, Videofile, Thumbnail, Owner, Title, Description, ispublic)
	if err != nil {
		return err
	}

	fmt.Println("video added")
	return nil
}
func (m *VideoModel) GiveVideoID(Videofile string, Owner uuid.UUID) (ID uuid.UUID, err error) {
	stmt := `SELECT video_uid FROM videos
	WHERE owner = $1 AND
	 videofile = $2 ;`
	err = m.DB.QueryRow(stmt, Owner, Videofile).Scan(&ID)
	if err != nil {
		return uuid.Nil, err
	}
	return ID, nil
}
func (m *VideoModel) VideoExists(video_uid uuid.UUID) (bool, error) {
	var exists bool
	stmt := ` SELECT EXISTS (
        SELECT 1
        FROM videos
        WHERE video_uid = $1);`

	err := m.DB.QueryRow(stmt, video_uid).Scan(&exists)
	return exists, err
}
func (m *VideoModel) UpdateThumbnail(video_uid uuid.UUID, url string) (string, error) {
	var oldurl string
	stmt := `SELECT thumbnail from videos
 		WHERE video_uid = $1;`
	err := m.DB.QueryRow(stmt, video_uid).Scan(&oldurl)
	if err != nil {
		return "", err
	}
	err = appendToFile(oldurl)
	if err != nil {
		return "", err
	}

	stmt = ` UPDATE videos
     SET thumbnail = $1
     WHERE video_uid= $2;`
	_, err = m.DB.Exec(stmt, url, video_uid)
	return url, err
}
func appendToFile(data string) error {
	tempDir := "./temp"
	if err := os.MkdirAll(tempDir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create temp directory: %v", err)
	}

	filePath := filepath.Join(tempDir, "delete_asset")

	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	_, err = file.WriteString(data + "\n")
	if err != nil {
		return fmt.Errorf("failed to write to file: %v", err)
	}

	fmt.Println("Data appended successfully!")
	return nil
}
func (m *VideoModel) UpdateVideoDetails(VIdeo_UID uuid.UUID, Title, Description string, Ispublic bool) error {
	stmt := `UPDATE videos
 	SET title = $2, description = $3, ispublic = $4
	 WHERE video_uid = $1 ;`

	_, err := m.DB.Exec(stmt, VIdeo_UID, Title, Description, Ispublic)
	return err

}
func (m *VideoModel) GetVideoByID(Video_uid uuid.UUID) (video Video, err error) {
	stmt := ` SELECT * from videos
	WHERE video_uid = $1;`
	err = m.DB.QueryRow(stmt, Video_uid).Scan(&video.ID, &video.Videofile, &video.Thumbnail, &video.Owner, &video.Title, &video.Description, &video.Ispublic, &video.Created)
	if err != nil {
		return Video{}, err
	}
	return video, nil
}
func (m *VideoModel) GetVideoByTitle(title string) (video Video, err error) {
	stmt := ` SELECT * from videos
	WHERE title = $1;`
	err = m.DB.QueryRow(stmt, title).Scan(&video.ID, &video.Videofile, &video.Thumbnail, &video.Owner, &video.Title, &video.Description, &video.Ispublic, &video.Created)
	if err != nil {
		return Video{}, err
	}
	return video, nil
}
func (m *VideoModel) SearchVideo(query string) (videos []Video, err error) {
	stmt := `SELECT * FROM videos
	WHERE (title ILIKE '%' || $1|| '%' OR description ILIKE '%' || $1|| '%')
  	AND ispublic = true
	ORDER BY
  	GREATEST(
  	SIMILARITY(title, $1),
  	SIMILARITY(description, $1)
 	) DESC;`

	rows, err := m.DB.Query(stmt, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var video Video

		if err = rows.Scan(&video.ID, &video.Videofile, &video.Thumbnail, &video.Owner, &video.Title, &video.Description, &video.Ispublic, &video.Created); err != nil {
			return nil, fmt.Errorf("scanning video: %v", err)
		}
		videos = append(videos, video)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	fmt.Println("query fetched")
	return videos, nil
}
func (m *VideoModel) GetAllVideo(id uuid.UUID) (videos []Video, err error) {
	stmt := `SELECT * FROM videos
	WHERE owner = $1;`

	rows, err := m.DB.Query(stmt, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var video Video

		if err = rows.Scan(&video.ID, &video.Videofile, &video.Thumbnail, &video.Owner, &video.Title, &video.Description, &video.Ispublic, &video.Created); err != nil {
			return nil, fmt.Errorf("scanning comment: %v", err)
		}
		videos = append(videos, video)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	fmt.Println("query fetched")
	return videos, nil
}
func (m *VideoModel) AllVideo() (videos []Video, err error) {
	stmt := `SELECT * FROM videos
	ORDER BY RANDOM();`

	rows, err := m.DB.Query(stmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var video Video

		if err = rows.Scan(&video.ID, &video.Videofile, &video.Thumbnail, &video.Owner, &video.Title, &video.Description, &video.Ispublic, &video.Created); err != nil {
			return nil, fmt.Errorf("scanning video: %v", err)
		}
		videos = append(videos, video)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	fmt.Println("query fetched")
	return videos, nil
}
