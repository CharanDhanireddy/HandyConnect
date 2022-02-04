package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func userLogin(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		return
	}

	var request loginRequest

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ok, err := verifyUserLogin(request.Username, request.Password)
	if err != nil {
		log.Printf("Login user DB error, %v", err)
		w.WriteHeader(500) // Return 500 Internal Server Error.
		return
	}

	if !ok {
		log.Printf("Unauthorized access for user: %v", request.Username)
		w.WriteHeader(401) // Wrong password or username, Return 401.
		return
	}

	w.WriteHeader(200) // Successfully logged in.
}

func verifyUserLogin(username string, password string) (bool, error) {
	return false, nil
}

func userSignUp(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		return
	}

	var request UserProfileSchema

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	insertUser(sqliteDatabase, request)

	w.WriteHeader(200) // Successfully logged in.
}
