package main

import (
	"handy/requestHandlers"
	"log"
	"net/http"
)

func handleRequests() {
	http.HandleFunc("/", requestHandlers.HomePage)

	//Get city list
	http.HandleFunc("/cities", requestHandlers.ReturnCity) //pushing the citiesjson to cityapi

	//Post user login
	http.HandleFunc("/userLogin", requestHandlers.UserLogin)

	//Post user sign up
	http.HandleFunc("/customerSignUp", requestHandlers.CustomerSignUp)

	//Post vendor login
	http.HandleFunc("/vendorLogin", requestHandlers.UserLogin)

	//Post vendor sign up
	http.HandleFunc("/vendorSignUp", requestHandlers.VendorSignUp)

	//Get customer profile
	http.HandleFunc("/customer", requestHandlers.CustData)

	//Get Vendor profile
	http.HandleFunc("/vendor", requestHandlers.ReturnVendor)

	//Get Services for city
	http.HandleFunc("/services", requestHandlers.ReturnCity)

	//Get dates for service in a city
	http.HandleFunc("/availability", requestHandlers.GetServiceAvailability)

	//Post create booking
	http.HandleFunc("/booking", requestHandlers.CreateBooking)

	// //Get bookings of user
	// http.HandleFunc("/booking", ReturnCiy)

	// //Get bookings of vendor
	// http.HandleFunc("/booking", ReturnCiy)

	http.HandleFunc("/vendorapi", requestHandlers.ReturnVendor)

	log.Fatal(http.ListenAndServe(":10000", nil))

}
