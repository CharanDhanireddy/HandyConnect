package requestHandlers

import (
	"database/sql"
	"encoding/json"
	"handy/dbOperations"
	schema "handy/schema"
	"handy/structTypes"
	"log"
	"net/http"
)

func UserLogin(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			return
		}

		var request structTypes.LoginRequest

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
			http.Error(w, err.Error(), 500) // Return 500 Internal Server Error.
			return
		}

		if !ok {
			log.Printf("Unauthorized access for user: %v", request.Username)
			json.NewEncoder(w).Encode("Wrong password or username")
			w.WriteHeader(401)
			return
		}
		json.NewEncoder(w).Encode("Successfully logged in")
		w.WriteHeader(200)
	}
}

func verifyUserLogin(username string, password string) (bool, error) {
	if username == "test_user@gmail.com" && password == "test_password" {
		return true, nil
	}
	return false, nil

}

func CustomerSignUp(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			return
		}

		var request schema.CustomerProfileSchema

		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		dbOperations.InsertCustomer(sqliteDatabase, request)

		json.NewEncoder(w).Encode("New customer created")
		w.WriteHeader(200)
	}
}

func VendorSignUp(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			return
		}

		var request schema.VendorProfileSchema

		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		dbOperations.InsertVendor(sqliteDatabase, request)

		json.NewEncoder(w).Encode("New vendor created")
		w.WriteHeader(200)
	}
}
