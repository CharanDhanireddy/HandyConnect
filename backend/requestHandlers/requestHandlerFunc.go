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

// GetCityList
// @Summary Get all cities
// @Description get all cities in which services are available
// @Success 200 {array} []structTypes.City
// @Router /cities [get]
func GetCityList(c *gin.Context) {

	fmt.Println("Returning the city search criteria:")
	cities, err := dbOperations.DisplayCity()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, cities)
}

func ReturnVendor(c *gin.Context) {

	fmt.Println("Returning the vendor search criteria:")
	vend_list, err := dbOperations.DisplayVendorData()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, vend_list)
}

func CustData(c *gin.Context) {

	fmt.Println("Returning the customer data:")
	cust, err := dbOperations.DisplayCustData()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, cust)
}

func ReturnServiceList(c *gin.Context) {

	fmt.Println("Returning the list of services in the selected city:")
	serv_list := dbOperations.DisplayServiceData()
	c.JSON(http.StatusOK, serv_list)
}

func ReturnBookingCust(c *gin.Context) {
	fmt.Println("Returning the Bookings for selected customer:")
	cust_book := dbOperations.DisplayCustBookings()
	c.JSON(http.StatusOK, cust_book)
}

func ReturnBookingVend(c *gin.Context) {
	fmt.Println("Returning the Bookings for selected vendor:")
	vend_book := dbOperations.DisplayVendBookings()
	c.JSON(http.StatusOK, vend_book)
}
