package repository

import (
	"database/sql"
	"server/internal/models"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllTodos() ([]*models.ToDo, error)
	AllAppointments() ([]*models.Appointment, error)
	GetUserByEmail(email string) (*models.User, error)
}
