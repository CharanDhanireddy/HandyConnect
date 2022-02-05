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
	http.HandleFunc("/customerSignUp", customerSignUp)

	//Post vendor login
	http.HandleFunc("/vendorLogin", userLogin)

	//Post vendor sign up
	http.HandleFunc("/vendorSignUp", vendorSignUp)

	//Get User profile
	http.HandleFunc("/user", returnCity)

	//Get Vendor profile
	http.HandleFunc("/vendor", returnCity)

	//Get Services for city
	http.HandleFunc("/services", returnCity)

	//Get dates for service in a city
	http.HandleFunc("/availability", GetServiceAvailability)

	//Post create booking
	http.HandleFunc("/booking", CreateBooking)

	// //Get bookings of user
	// http.HandleFunc("/booking", returnCiy)

	// //Get bookings of vendor
	// http.HandleFunc("/booking", returnCiy)

	http.HandleFunc("/vendorapi", returnVendor)

	log.Fatal(http.ListenAndServe(":10000", nil))

}
