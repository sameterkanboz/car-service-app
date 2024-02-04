package models

type Location struct {
	ID              int     `json:"id"`
	Name            string  `json:"name"`
	Longtitude      float64 `json:"longtitude"`
	Latitude        float64 `json:"latitude"`
	LatitudeDelta   float64 `json:"latitude_delta"`
	LongtitudeDelta float64 `json:"longtitude_delta"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
}
