package main

import (
	"handy/requestHandlers"
	"log"
	"net/http"
)

func handleRequests() {
	http.HandleFunc("/", requestHandlers.HomePage)

//Get city list
	http.HandleFunc("/cities", requestHandlers.ReturnCity(sqliteDatabase)) //pushing the citiesjson to cityapi

//Post user login
	http.HandleFunc("/userLogin", requestHandlers.UserLogin(sqliteDatabase))

//Post user sign up
	http.HandleFunc("/customerSignUp", requestHandlers.CustomerSignUp(sqliteDatabase))

//Post vendor login
	http.HandleFunc("/vendorLogin", requestHandlers.UserLogin(sqliteDatabase))

//Post vendor sign up
	http.HandleFunc("/vendorSignUp", requestHandlers.VendorSignUp(sqliteDatabase))

//Get customer profile
	http.HandleFunc("/customer", requestHandlers.CustData(sqliteDatabase))

//Get Vendor profile
	http.HandleFunc("/vendor", requestHandlers.ReturnVendor(sqliteDatabase))

//Get Services for city
	http.HandleFunc("/services", requestHandlers.ReturnCity(sqliteDatabase))

//Get dates for service in a city
	http.HandleFunc("/availability", requestHandlers.GetServiceAvailability(sqliteDatabase))

//Post create booking
	http.HandleFunc("/booking", requestHandlers.CreateBooking(sqliteDatabase))

// //Get bookings of user
	// http.HandleFunc("/booking", ReturnCiy(qliteDatabase))

// //Get bookings of vendor
	// http.HandleFunc("/booking", ReturnCiy(qliteDatabase))

http.HandleFunc("/vendorapi", requestHandlers.ReturnVendor(sqliteDatabase))

log.Fatal(http.ListenAndServe(":10000", nil))

}
