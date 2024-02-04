package dbrepo

import (
	"context"
	"database/sql"
	"server/internal/models"
	"time"
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

// func (m *PostgresDBRepo) AllUsers() []*models.Customer
