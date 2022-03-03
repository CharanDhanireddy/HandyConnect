package requestHandlers

import (
	"fmt"
	"handy/dbOperations"
	schema "handy/schema"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetServiceAvailability
// @Summary get service's availability in a city
// @Produce json
// @Param city_id path string true "city ID"
// @Param service_id path string true "service ID"
// @Success 200 {array} []structTypes.Date
// @Failure 400 {object} object
// @Router /availability [get]
func GetServiceAvailability(c *gin.Context) {
	log.Println("Availability API hit!..")

	cityId, err := strconv.Atoi(c.Param("city_id"))
	if err != nil {
		log.Println("stoi error for cityId")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer cityId")
		return
	}

	serviceId, err := strconv.Atoi(c.Param("service_id"))
	if err != nil {
		log.Println("stoi error for serviceId")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer serviceId")
		return
	}

	c.JSON(http.StatusOK, dbOperations.ServiceAvailability(cityId, serviceId))
}

// CreateBooking
// @Summary create new service booking
// @Produce json
// @Param data body schema.BookingSchema true "booking data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Router /booking [post]
func CreateBooking(c *gin.Context) {

	var request schema.BookingSchema

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.

	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	response, err := dbOperations.InsertBooking(request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response)
}
