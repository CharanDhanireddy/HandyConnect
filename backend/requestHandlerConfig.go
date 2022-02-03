package main

import (
	"log"
	"net/http"
)

func handleRequests() {
	http.HandleFunc("/", homePage)

	http.HandleFunc("/consumeapi", returnSearch) //pushing the consumer/vendor info to consumeapi

	http.HandleFunc("/cityapi", returnCity) //pushing the cities json to cityapi

	http.HandleFunc("/vendorapi", returnVendor)

	log.Fatal(http.ListenAndServe(":10000", nil))
}
