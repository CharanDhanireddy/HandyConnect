package main

import (
	"log"
	"net/http"
)

func handleRequests() {
	http.HandleFunc("/", homePage)

	//Get city list
	http.HandleFunc("/cities", returnCity) //pushing the cities json to cityapi

	//Post user login
	http.HandleFunc("/userLogin", userLogin)

	//Post user sign up

	//Post vendor login

	//Post vendor sign up

	//Get Services for city

	//Get dates for service in a city

	//Post create booking

	//Get bookings of user

	//Get bookings of vendor

	http.HandleFunc("/consumeapi", returnSearch) //pushing the consumer/vendor info to consumeapi

	http.HandleFunc("/vendorapi", returnVendor)

	log.Fatal(http.ListenAndServe(":10000", nil))
}
