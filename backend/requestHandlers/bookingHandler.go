package requestHandlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"handy/dbOperations"
	schema "handy/schema"
	"log"
	"net/http"
	"strconv"
)

func GetServiceAvailability(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Availability API hit!..")

		if r.Method != http.MethodGet {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			return
		}
		query := r.URL.Query()
		cityParam, present := query["city_id"]
		if !present || len(cityParam) == 0 {
			fmt.Println("cityId not present")
			w.WriteHeader(400)
		}
		cityId, err := strconv.Atoi(cityParam[0])
		if err != nil {
			log.Println("stoi error city")
			fmt.Println(err)
			return
		}
		serviceParam, present := query["service_id"]
		if !present || len(serviceParam) == 0 {
			fmt.Println("serviceId not present")
			w.WriteHeader(400)
		}
		serviceId, err := strconv.Atoi(serviceParam[0])
		if err != nil {
			log.Println("stoi error service")
			fmt.Println(err)
			return
		}

		json.NewEncoder(w).Encode(dbOperations.ServiceAvailability(sqliteDatabase, cityId, serviceId))
	}
}

func CreateBooking(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(405) // Return 405 Method Not Allowed.
			return
		}

		var request schema.BookingSchema

		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		response, err := dbOperations.InsertBooking(sqliteDatabase, request)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		json.NewEncoder(w).Encode(response)
	}
}
