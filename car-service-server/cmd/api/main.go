package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"server/internal/repository"
	"server/internal/repository/dbrepo"
	"time"
)

const port = 8080

type application struct {
	DSN          string
	Domain       string
	DB           repository.DatabaseRepo
	auth         Auth
	JWTSecret    string
	JWTIssuer    string
	JWTAudience  string
	CookieDomain string
}

func main() {
	//setting app config
	var app application
	// read from command line

	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=car_service sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.StringVar(&app.JWTSecret, "jwt-secret", "verysecret", "signin secret")
	flag.StringVar(&app.JWTIssuer, "jwt-issuer", "example.com", "signin issuer")
	flag.StringVar(&app.JWTAudience, "jwt-audience", "example.com", "signin audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "domain")
	flag.Parse()
	//connect to db

	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}

	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:        app.JWTIssuer,
		Audience:      app.JWTAudience,
		Secret:        app.JWTSecret,
		TokenExpiry:   time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CookiePath:    "/",
		CookieName:    "__Host-refresh_token",
		CookieDomain:  app.CookieDomain,
	}

	log.Println("Starting server on port ", port)

	//start server

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())

	if err != nil {
		fmt.Println("Error starting server: ", err)
	}
}
