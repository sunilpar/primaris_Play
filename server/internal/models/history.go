package models

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
)

type HistoryModelInterface interface {
	AddHistory(video_uid uuid.UUID, user_uid uuid.UUID) error
	DeleteHistory(video_uid uuid.UUID, user_uid uuid.UUID) error
	GetHistory(user_uid uuid.UUID) ([]Historyform, error)
}

type Historyform struct {
	Video_UID uuid.UUID `json:"video_UID"`
}

type HistoryModel struct{ DB *sql.DB }

func (m *HistoryModel) AddHistory(video_uid uuid.UUID, user_uid uuid.UUID) error {

	stmt := `INSERT INTO history (video, views)
        VALUES ($1, ARRAY[$2::UUID])
        ON CONFLICT (video) DO UPDATE
        SET views = array_append(history.views, $2::UUID)
        WHERE NOT history.views @> ARRAY[$2::UUID];`
	_, err := m.DB.Exec(stmt, video_uid, user_uid)
	if err != nil {
		return err
	}
	fmt.Println("history added ")
	return nil
}

func (m *HistoryModel) DeleteHistory(video_uid uuid.UUID, user_uid uuid.UUID) error {

	stmt := `UPDATE history
        SET views = array_remove(views, $2::UUID)
        WHERE video = $1;`
	_, err := m.DB.Exec(stmt, video_uid, user_uid)
	if err != nil {
		return err
	}
	fmt.Println("history removed ")
	return nil
}

func (m *HistoryModel) GetHistory(user_uid uuid.UUID) ([]Historyform, error) {
	var history []Historyform
	stmt := `SELECT video FROM history
    WHERE $1 = ANY (views) ORDER BY video DESC;`

	rows, err := m.DB.Query(stmt, user_uid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var view Historyform

		if err = rows.Scan(&view.Video_UID); err != nil {
			return nil, fmt.Errorf("scanning history: %v", err)
		}
		history = append(history, view)
	}
	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("iterating over rows: %v", err)
	}

	fmt.Println("history fetched")
	return history, nil
}
