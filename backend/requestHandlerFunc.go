package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "welcome to the homepage!")
	fmt.Println("Endpoint hit!")
}

//json for customer/vendor information

// func returnSearch(w http.ResponseWriter, r *http.Request) { //can be revamped to push customer/vendor info

// 	fmt.Println("Returning the user search criteria:")
// 	json.NewEncoder(w).Encode(items)

// }

//json for city information

func returnCity(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the city search criteria:")
	cities := displayCity(sqliteDatabase)
	json.NewEncoder(w).Encode(cities)

}

func returnVendor(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the vendor search criteria:")
	vend_list := displayVendorData(sqliteDatabase)
	json.NewEncoder(w).Encode(vend_list)
}

func custData(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the customer data:")
	cust := displayCustData(sqliteDatabase)
	json.NewEncoder(w).Encode(cust)
}

func returnServiceList(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the list of services in the selected city:")
	serv_list := displayServiceData(sqliteDatabase)
	json.NewEncoder(w).Encode(serv_list)
}
