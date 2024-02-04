package models

type Appointment struct {
	ID                int    `json:"id"`
	CustomerID        int    `json:"customer_id"`
	MechanicID        int    `json:"mechanic_id"`
	CarID             int    `json:"car_id"`
	AppointmentDate   string `json:"appointment_date"`
	AppointmentType   string `json:"appointment_type"`
	AppointmentStatus string `json:"appointment_status"`
	CreatedAt         string `json:"created_at"`
	UpdatedAt         string `json:"updated_at"`
}
