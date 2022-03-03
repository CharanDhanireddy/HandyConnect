package requestHandlers

import (
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

func ReturnCity(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the city search criteria:")
	cities := dbOperations.DisplayCity()
	json.NewEncoder(w).Encode(cities)

}

func ReturnVendor(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the vendor search criteria:")
	vend_list := dbOperations.DisplayVendorData()
	json.NewEncoder(w).Encode(vend_list)
}

func CustData(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Returning the customer data:")
	cust := dbOperations.DisplayCustData()
	json.NewEncoder(w).Encode(cust)
}
