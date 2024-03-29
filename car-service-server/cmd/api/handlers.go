package main

import (
	"errors"
	"log"
	"net/http"
	"server/internal/models"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Car Service API is active!",
		Version: "1.0.0",
	}

	_ = app.writeJSON(w, http.StatusOK, payload)
}

func (app *application) AllTodos(w http.ResponseWriter, r *http.Request) {
	todos, err := app.DB.AllTodos()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	_ = app.writeJSON(w, http.StatusOK, todos)
}

func (app *application) AllAppointments(w http.ResponseWriter, r *http.Request) {
	appointments, err := app.DB.AllAppointments()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	_ = app.writeJSON(w, http.StatusOK, appointments)
}

func (app *application) authenticate(w http.ResponseWriter, r *http.Request) {
	// authenticate user
	var requestPayload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := app.readJSON(w, r, &requestPayload)
	if err != nil {
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	// Get user by email
	user, err := app.DB.GetUserByEmail(requestPayload.Email)
	if err != nil {
		app.errorJSON(w, errors.New("email not found. invalid credentials"), http.StatusBadRequest)
		return
	}

	// Check if user is nil
	if user == nil {
		app.errorJSON(w, errors.New("user not found"), http.StatusNotFound)
		return
	}

	// Check if password matches
	valid, err := user.PasswordMatches(requestPayload.Password)
	if err != nil || !valid {
		app.errorJSON(w, errors.New("password doesn't match"), http.StatusBadRequest)
		return
	}

	// Prepare JWT user
	u := jwtUser{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Role:      user.Role,
	}

	// Generate token pair
	tokens, err := app.auth.GenerateTokenPair(&u)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	log.Println(tokens.Token)
	refreshCookie := app.auth.GetRefreshCookie(tokens.RefreshToken)
	http.SetCookie(w, refreshCookie)

	app.writeJSON(w, http.StatusAccepted, tokens)
}

func (app *application) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := app.readJSON(w, r, &user)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	id, err := app.DB.CreateUser(&user)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	log.Println("User created with ID: ", id)
	app.writeJSON(w, http.StatusCreated, id)
}

func (app *application) refreshToken(w http.ResponseWriter, r *http.Request) {

	for _, cookie := range r.Cookies() {
		if cookie.Name == app.auth.CookieName {
			claims := &Claims{}
			refreshToken := cookie.Value

			_, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(app.JWTSecret), nil
			})
			if err != nil {
				app.errorJSON(w, errors.New("unauthorized"), http.StatusUnauthorized)
				return
			}

			userID, err := strconv.Atoi(claims.Subject)
			if err != nil {
				app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			user, err := app.DB.GetUserByID(userID)
			if err != nil {
				app.errorJSON(w, errors.New("unknown user"), http.StatusUnauthorized)
				return
			}

			u := jwtUser{
				ID:        user.ID,
				FirstName: user.FirstName,
				LastName:  user.LastName,
				Role:      user.Role,
			}

			tokenPairs, err := app.auth.GenerateTokenPair(&u)
			if err != nil {
				app.errorJSON(w, errors.New("error generating token"), http.StatusUnauthorized)
				return
			}

			http.SetCookie(w, app.auth.GetRefreshCookie(tokenPairs.RefreshToken))
		}
	}
}

func (app *application) logout(w http.ResponseWriter, r *http.Request) {

	http.SetCookie(w, app.auth.GetExpiredRefreshCookie())
	w.WriteHeader(http.StatusAccepted)
}

func (app *application) AllUsers(w http.ResponseWriter, r *http.Request) {
	users, err := app.DB.AllUsers()
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	_ = app.writeJSON(w, http.StatusOK, users)
}

func (app *application) GetUserByUsername(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("email")
	user, err := app.DB.GetUserByUserName(username)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	_ = app.writeJSON(w, http.StatusOK, user)
}

func (app *application) DeleteUser(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	err := app.DB.DeleteUser(email)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	app.writeJSON(w, http.StatusAccepted, "user deleted")
	w.WriteHeader(http.StatusAccepted)
}

func (app *application) GetAllMechanics(w http.ResponseWriter, r *http.Request) {
	mechanics, err := app.DB.GetAllMechanics()
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	_ = app.writeJSON(w, http.StatusOK, mechanics)
}

// ALL CARS, ALL APPOINTMENTS TODO
