package requestHandlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"handy/dbOperations"
	"net/http"
)

func HomePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "welcome to the homepage!")
	fmt.Println("Endpoint hit!")
}

//json for customer/vendor information

// func returnSearch(w http.ResponseWriter, r *http.Request) { //can be revamped to push customer/vendor info

// 	fmt.Println("Returning the user search criteria:")
// 	json.NewEncoder(w).Encode(items)

// }

//json for city information

func ReturnCity(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Returning the city search criteria:")
		cities := dbOperations.DisplayCity(sqliteDatabase)
		json.NewEncoder(w).Encode(cities)

	}
}

func ReturnVendor(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Returning the vendor search criteria:")
		vend_list := dbOperations.DisplayVendorData(sqliteDatabase)
		json.NewEncoder(w).Encode(vend_list)
	}
}

func CustData(sqliteDatabase *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Returning the customer data:")
		cust := dbOperations.DisplayCustData(sqliteDatabase)
		json.NewEncoder(w).Encode(cust)
	}
}
