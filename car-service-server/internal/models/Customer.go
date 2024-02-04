package models

type Customer struct {
	Cars         []Car         `json:"cars"`
	Appointments []Appointment `json:"appointments"`
}
