package models

import (
	"database/sql"
	"fmt"
	"github/sunilpar/yt-api/internal/validator"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type PlaylistModelInterface interface {
	CreatePlaylist(video_uid uuid.UUID, user_uid uuid.UUID, Name string, Ispublic bool) (Playlistform, error)
	UpdatePlaylist(playlist_uid uuid.UUID, user_uid uuid.UUID, Name string, Ispublic bool) (Playlistform, error)
	AddVideos(playlist_uid uuid.UUID, Video_uid uuid.UUID) (Playlistform, error)
	GetPlaylistByID(playlist_uid uuid.UUID) (Playlistform, error)
	GetPlaylistByName(Name string) (Playlistform, error)
	DeletePlaylist(playlist_uid uuid.UUID, user_uid uuid.UUID) error
	GetAllPlaylist(user_UID uuid.UUID) ([]Playlistform, error)
}

type Playlistform struct {
	Playlist_uid        uuid.UUID   `json:"playlist_uid"`
	Playlist_name       string      `json:"Playlist_name"`
	Video_uid           []uuid.UUID `json:"video_uid"`
	User_uid            uuid.UUID   `json:"user_uid"`
	IsPublic            bool        `json:"ispublic"`
	validator.Validator `form:"-"`
}

type PlaylistModel struct{ DB *sql.DB }

func (m *PlaylistModel) CreatePlaylist(video_uid uuid.UUID, user_uid uuid.UUID, Name string, Ispublic bool) (Playlistform, error) {
	var playlist Playlistform

	stmt := `INSERT INTO playlist (playlist_name, videos,owner,ispublic)
	VALUES ($1,ARRAY[ $2 ::UUID],$3, $4);
	`
	_, err := m.DB.Exec(stmt, Name, video_uid, user_uid, Ispublic)
	if err != nil {
		return Playlistform{}, err
	}
	fmt.Println("playlist added ")
	stmt = ` SELECT * FROM playlist
	 WHERE owner = $1 AND playlist_name  = $2 ;`
	err = m.DB.QueryRow(stmt, user_uid, Name).Scan(&playlist.Playlist_uid, &playlist.Playlist_name, pq.Array(&playlist.Video_uid), &playlist.User_uid, &playlist.IsPublic)
	if err != nil {
		return Playlistform{}, err
	}

	return playlist, nil
}

func (m *PlaylistModel) UpdatePlaylist(playlist_uid uuid.UUID, user_uid uuid.UUID, Name string, Ispublic bool) (Playlistform, error) {
	var playlist Playlistform

	stmt := ` UPDATE playlist
 	SET ispublic = $2, playlist_name = $3
	WHERE playlist_uid = $1;`
	_, err := m.DB.Exec(stmt, playlist_uid, Ispublic, Name)
	if err != nil {
		return Playlistform{}, err
	}
	fmt.Println("playlist updated ")
	stmt = ` SELECT * FROM playlist
	 WHERE owner = $1 AND playlist_name  = $2 ;`
	err = m.DB.QueryRow(stmt, user_uid, Name).Scan(&playlist.Playlist_uid, &playlist.Playlist_name, pq.Array(&playlist.Video_uid), &playlist.User_uid, &playlist.IsPublic)
	if err != nil {
		return Playlistform{}, err
	}

	return playlist, nil
}

func (m *PlaylistModel) AddVideos(playlist_uid uuid.UUID, Video_uid uuid.UUID) (Playlistform, error) {
	var playlist Playlistform

	stmt := `UPDATE playlist
	SET videos = array_append(videos,$2)
	WHERE playlist_uid = $1;`
	_, err := m.DB.Exec(stmt, playlist_uid, Video_uid)
	if err != nil {
		return Playlistform{}, err
	}
	fmt.Println("viddeos added to playlist")

	stmt = ` SELECT * FROM playlist
	 WHERE playlist_uid = $1;`
	err = m.DB.QueryRow(stmt, playlist_uid).Scan(&playlist.Playlist_uid, &playlist.Playlist_name, pq.Array(&playlist.Video_uid), &playlist.User_uid, &playlist.IsPublic)
	if err != nil {
		return Playlistform{}, err
	}

	return playlist, nil
}
func (m *PlaylistModel) GetPlaylistByID(playlist_uid uuid.UUID) (Playlistform, error) {
	var playlist Playlistform
	stmt := ` SELECT * FROM playlist
	 WHERE playlist_uid = $1;`
	err := m.DB.QueryRow(stmt, playlist_uid).Scan(&playlist.Playlist_uid, &playlist.Playlist_name, pq.Array(&playlist.Video_uid), &playlist.User_uid, &playlist.IsPublic)
	if err != nil {
		return Playlistform{}, err
	}

	return playlist, nil
}
func (m *PlaylistModel) GetPlaylistByName(Name string) (Playlistform, error) {
	var playlist Playlistform
	stmt := ` SELECT * FROM playlist
	 WHERE playlist_name = $1;`
	err := m.DB.QueryRow(stmt, Name).Scan(&playlist.Playlist_uid, &playlist.Playlist_name, pq.Array(&playlist.Video_uid), &playlist.User_uid, &playlist.IsPublic)
	if err != nil {
		return Playlistform{}, err
	}

	return playlist, nil
}
func (m *PlaylistModel) DeletePlaylist(playlist_uid uuid.UUID, user_uid uuid.UUID) error {

	stmt := ` DELETE FROM playlist
	 WHERE playlist_uid = $1 AND owner = $2;`

	_, err := m.DB.Exec(stmt, playlist_uid, user_uid)
	if err != nil {
		return err
	}

	return nil
}

func (m *PlaylistModel) GetAllPlaylist(user_UID uuid.UUID) ([]Playlistform, error) {
	var playlists []Playlistform
	stmt := `SELECT * FROM playlist
	 WHERE owner = $1;`

	rows, err := m.DB.Query(stmt, user_UID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var playlist Playlistform

		if err = rows.Scan(&playlist.Playlist_uid, &playlist.Playlist_name, pq.Array(&playlist.Video_uid), &playlist.User_uid, &playlist.IsPublic); err != nil {

			return nil, fmt.Errorf("scanning comment: %v", err)
		}
		playlists = append(playlists, playlist)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	return playlists, nil
}
