package dbrepo

import (
	"context"
	"database/sql"
	"errors"
	"server/internal/models"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type PostgresDBRepo struct {
	DB *sql.DB
}

const dbTimeout = time.Second * 3

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) AllTodos() ([]*models.ToDo, error) {

	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		SELECT
			id, title, description, completed,
			due_date, created_at, updated_at
		FROM
			car_service
		ORDER BY
			title
	`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var todos []*models.ToDo

	for rows.Next() {
		var todo models.ToDo
		err := rows.Scan(
			&todo.ID,
			&todo.Title,
			&todo.Description,
			&todo.Completed,
			&todo.DueDate,
			&todo.CreatedAt,
			&todo.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		todos = append(todos, &todo)
	}

	return todos, nil
}

func (m *PostgresDBRepo) AllUsers() ([]*models.User, error) {

	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		SELECT
			id, username, email, password, role, first_name, last_name, car_id, appointments, created_at, updated_at
		FROM
			users
		ORDER BY
			username
	`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []*models.User

	for rows.Next() {
		var user models.User
		err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Password,
			&user.Role,
			&user.FirstName,
			&user.LastName,
			&user.CarID,
			&user.Appointments,
			&user.CreatedAt,
			&user.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		users = append(users, &user)
	}

	return users, nil
}

func (m *PostgresDBRepo) AllAppointments() ([]*models.Appointment, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
		SELECT
			id, customer_id, mechanic_id, car_id, appointment_date, appointment_type, appointment_status,created_at, updated_at
		FROM
			appointments
		ORDER BY
			customer_id
	`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var appointments []*models.Appointment

	for rows.Next() {
		var appointment models.Appointment
		err := rows.Scan(
			&appointment.ID,
			&appointment.CustomerID,
			&appointment.MechanicID,
			&appointment.CarID,
			&appointment.AppointmentDate,
			&appointment.AppointmentType,
			&appointment.AppointmentStatus,
			&appointment.CreatedAt,
			&appointment.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		appointments = append(appointments, &appointment)
	}
	return appointments, nil
}

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
			SELECT 
				id, username, first_name, last_name, email, password, role, car_id, created_at, updated_at 
			FROM 
				users 
			WHERE email = $1`
	var user models.User
	row := m.DB.QueryRowContext(ctx, query, email)

	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Role,
		&user.CarID,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) GetUserByID(id int) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `
			SELECT 
				id, username, first_name, last_name, email, password, role, car_id, created_at, updated_at 
			FROM 
				users 
			WHERE id = $1`
	var user models.User
	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Role,
		&user.CarID,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *PostgresDBRepo) CreateUser(user *models.User) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	// Check if email is already used
	existingUser, err := m.GetUserByEmail(user.Email)
	if err != nil {
		return 0, err
	}
	if existingUser != nil {
		return 0, errors.New("email already used")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	query := `
		INSERT INTO users (username, first_name, last_name, email, password, role, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id`

	var newID int
	err = m.DB.QueryRowContext(
		ctx,
		query,
		user.Username,
		user.FirstName,
		user.LastName,
		user.Email,
		hashedPassword,
		user.Role,
		time.Now(),
		time.Now(),
	).Scan(&newID)

	if err != nil {
		return 0, err
	}

	return newID, nil
}
