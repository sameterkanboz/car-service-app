package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"server/internal/repository"
	"server/internal/repository/dbrepo"
)

const port = 8080

type application struct {
	DSN    string
	Domain string
	DB     repository.DatabaseRepo
}

func main() {
	//setting app config
	var app application
	// read from command line

	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=car_service sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")

	flag.Parse()
	//connect to db

	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}

	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.Domain = "http://localhost:8080"

	log.Println("Starting server on port ", port)

	//start server

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())

	if err != nil {
		fmt.Println("Error starting server: ", err)
	}
}
