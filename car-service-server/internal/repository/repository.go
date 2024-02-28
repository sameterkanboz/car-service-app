package repository

import (
	"database/sql"
	"server/internal/models"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllTodos() ([]*models.ToDo, error)
	AllUsers() ([]*models.User, error)
	AllAppointments() ([]*models.Appointment, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	CreateUser(user *models.User) (int, error)
	GetUserByUserName(username string) (*models.User, error)
	DeleteUser(email string) error
	GetAllMechanics() ([]*models.User, error)
}
