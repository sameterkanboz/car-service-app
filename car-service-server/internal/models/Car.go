package models

type Car struct {
	ID        int      `json:"id"`
	Model     string   `json:"model"`
	Brand     string   `json:"brand"`
	Type      string   `json:"type"`
	Year      int      `json:"year"`
	Color     string   `json:"color"`
	Plate     string   `json:"plate"`
	Issues    []string `json:"issues"`
	CreatedAt string   `json:"created_at"`
	UpdatedAt string   `json:"updated_at"`
}
