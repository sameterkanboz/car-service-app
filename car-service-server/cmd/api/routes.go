package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {

	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)
	mux.Use(app.enableCORS)

	mux.Get("/", app.Home)
	mux.Get("/allTodos", app.AllTodos)

	mux.Post("/authenticate", app.authenticate)
	mux.Post("/createUser", app.CreateUser)
	mux.Delete("/deleteUser", app.DeleteUser)
	mux.Get("/refresh", app.refreshToken)
	mux.Get("/logout", app.logout)
	mux.Get("/user", app.GetUserByUsername)

	mux.Get("/allAppointments", app.AllAppointments)
	// mux.Get("allUsers", app.AllUsers)
	mux.Route("/admin", func(mux chi.Router) {
		mux.Use(app.authRequired)
		mux.Get("/allUsers", app.AllUsers)
	})

	return mux

}
