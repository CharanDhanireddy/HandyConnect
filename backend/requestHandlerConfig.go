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
	http.HandleFunc("/userSignUp", userLogin)

	//Post vendor login
	http.HandleFunc("/vendorLogin", userLogin)

	//Post vendor sign up
	http.HandleFunc("/vendorSignUp", userLogin)

	//Get User profile
	http.HandleFunc("/user", returnCity)

	//Get Vendor profile
	http.HandleFunc("/vendor", returnCity)

	//Get Services for city
	http.HandleFunc("/services", returnCity)

	//Get dates for service in a city
	http.HandleFunc("/availability", returnCity)

	//Post create booking
	http.HandleFunc("/booking", userLogin)

	// //Get bookings of user
	// http.HandleFunc("/booking", returnCiy)

	// //Get bookings of vendor
	// http.HandleFunc("/booking", returnCiy)

	// http.HandleFunc("/consumeapi", returnSearch) //pushing the consumer/vendor info to consumepi

	http.HandleFunc("/vendorapi", returnVendor)

	log.Fatal(http.ListenAndServe(":10000", nil))
}
