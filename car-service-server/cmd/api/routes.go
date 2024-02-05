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

	mux.Get("/allAppointments", app.AllAppointments)

	return mux

}
