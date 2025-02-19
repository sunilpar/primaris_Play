package models

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
)

type SubcriptionModelInterface interface {
	InsertSubscription(subscridber uuid.UUID, channel uuid.UUID) error
	RemoveSubcription(subscriber uuid.UUID, channel uuid.UUID) error
	IsSubed(subscriber uuid.UUID, channel uuid.UUID) (bool, error)
	SubCount(channel uuid.UUID) (int, error)
}

type SubcriptionModel struct{ DB *sql.DB }

func (m *SubcriptionModel) InsertSubscription(subscriber uuid.UUID, channel uuid.UUID) error {

	stmt := `INSERT INTO subscriptions (subscriber, channel)
	VALUES ($1,$2);`
	_, err := m.DB.Exec(stmt, subscriber, channel)
	if err != nil {
		return err
	}

	fmt.Println("subbed")
	return nil
}
func (m *SubcriptionModel) RemoveSubcription(subscriber uuid.UUID, channel uuid.UUID) error {

	stmt := `DELETE FROM subscriptions
 	WHERE subscriber = $1 AND channel = $2;`
	_, err := m.DB.Exec(stmt, subscriber, channel)
	if err != nil {
		return err
	}

	fmt.Println("unsubbed")
	return nil
}
func (m *SubcriptionModel) IsSubed(subscriber uuid.UUID, channel uuid.UUID) (bool, error) {
	var exist bool
	stmt := `SELECT EXISTS (
             SELECT 1
            FROM subscriptions
             WHERE subscriber = $1  and channel = $2);`
	err := m.DB.QueryRow(stmt, subscriber, channel).Scan(&exist)
	if err != nil {
		return false, err
	}

	return exist, nil
}
func (m *SubcriptionModel) SubCount(channel uuid.UUID) (int, error) {
	var count int
	stmt := `SELECT COUNT(subscriber) FROM subscriptions
	 WHERE channel = $1;`
	err := m.DB.QueryRow(stmt, channel).Scan(&count)
	if err != nil {
		return 0, err
	}

	return count, nil
}
