package main

import (
	// "log"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "welcome to the homepage!")
	fmt.Println("Endpoint hit!")
}

//json for customer/vendor information

func returnSearch(w http.ResponseWriter, r *http.Request) { //can be revamped to push customer/vendor info

	fmt.Println("Returning the user search criteria:")
	json.NewEncoder(w).Encode(items)

}

//json for city information

func returnCity(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the city search criteria:")
	json.NewEncoder(w).Encode(cities)

}

func returnVendor(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the vendor search criteria:")
	displayVendor(sqliteDatabase)
	json.NewEncoder(w).Encode(vend_list)

}

func userLogin(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		w.WriteHeader(405) // Return 405 Method Not Allowed.
		return
	}

	var schema loginSchema

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&schema)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ok, err := verifyUserLogin(schema.Username, schema.Password)
	if err != nil {
		log.Printf("Login user DB error, %v", err)
		w.WriteHeader(500) // Return 500 Internal Server Error.
		return
	}

	if !ok {
		log.Printf("Unauthorized access for user: %v", schema.Username)
		w.WriteHeader(401) // Wrong password or username, Return 401.
		return
	}

	w.WriteHeader(200) // Successfully logged in.
}

func verifyUserLogin(username string, password string) (bool, error) {
	return true, nil
}
