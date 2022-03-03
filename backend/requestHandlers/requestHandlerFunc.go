package requestHandlers

import (
	"fmt"
	"handy/dbOperations"
	"net/http"

	"github.com/gin-gonic/gin"
)

// HomePage ... HomePage
// @Summary Get HomePage
// @Description get HomePage
// @Tags Home
// @Success 200 {object} object
// @Failure 404 {object} object
// @Router / [get]
func HomePage(c *gin.Context) {
	c.JSON(http.StatusOK, "welcome to the homepage!")
	fmt.Println("Endpoint hit!")
}

//json for customer/vendor information

// func returnSearch(w http.ResponseWriter, r *http.Request) { //can be revamped to push customer/vendor info

// 	fmt.Println("Returning the user search criteria:")
// 	json.NewEncoder(w).Encode(items)

// }

//json for city information

func ReturnCity(c *gin.Context) {

	fmt.Println("Returning the city search criteria:")
	cities := dbOperations.DisplayCity()
	c.JSON(http.StatusOK, cities)
}

func ReturnVendor(c *gin.Context) {

	fmt.Println("Returning the vendor search criteria:")
	vend_list := dbOperations.DisplayVendorData()
	c.JSON(http.StatusOK, vend_list)
}

func CustData(c *gin.Context) {

	fmt.Println("Returning the customer data:")
	cust := dbOperations.DisplayCustData()
	c.JSON(http.StatusOK, cust)
}
