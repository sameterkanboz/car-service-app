package models

type Mechanic struct {
	ID           int           `json:"id"`
	UserName     string        `json:"username"`
	FirstName    string        `json:"first_name"`
	LastName     string        `json:"last_name"`
	Appointments []Appointment `json:"appointments"`
	Locations    []Location    `json:"locations"`
	CreatedAt    string        `json:"created_at"`
	UpdatedAt    string        `json:"updatet_at"`
}
