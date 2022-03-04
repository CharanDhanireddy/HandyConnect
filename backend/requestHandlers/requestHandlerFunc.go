package requestHandlers

import (
	"fmt"
	"handy/dbOperations"
	"log"
	"net/http"
	"strconv"

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
	c.JSON(http.StatusOK, "welcome to the HandyConnect homepage!")
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
	vendorId, err := strconv.Atoi(c.Query("vendor_id"))
	if err != nil {
		fmt.Println("stoi error for vendor_id")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer vendor_id")
		return
	}
	vend_list, err := dbOperations.DisplayVendorData(vendorId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, vend_list)
}

func CustData(c *gin.Context) {
	customerId, err := strconv.Atoi(c.Query("customer_id"))
	if err != nil {
		fmt.Println("stoi error for customer_id")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer customer_id")
		return
	}

	cust, err := dbOperations.DisplayCustData(customerId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, cust)
}

func ReturnServiceList(c *gin.Context) {
	cityId, err := strconv.Atoi(c.Query("city_id"))
	if err != nil {
		log.Println("stoi error for cityId")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer cityId")
		return
	}
	serv_list := dbOperations.DisplayServiceData(cityId)
	c.JSON(http.StatusOK, serv_list)
}

func ReturnBookingCust(c *gin.Context) {
	customerId, err := strconv.Atoi(c.Query("customer_id"))
	if err != nil {
		fmt.Println("stoi error for customer_id")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer customer_id")
		return
	}
	cust_book := dbOperations.DisplayCustBookings(customerId)
	c.JSON(http.StatusOK, cust_book)
}

func ReturnBookingVend(c *gin.Context) {

	vendorId, err := strconv.Atoi(c.Query("vendor_id"))
	if err != nil {
		fmt.Println("stoi error for vendor_id")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer vendor_id")
		return
	}

	vend_book := dbOperations.DisplayVendBookings(vendorId)
	c.JSON(http.StatusOK, vend_book)
}
