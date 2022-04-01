package requestHandlers

import (
	"fmt"
	"handy/dbOperations"
	schema "handy/schema"
	"handy/structTypes"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetServiceAvailability
// @Summary get service's availability in a city
// @Produce json
// @Param city_id query string true "city ID"
// @Param service_id query string true "service ID"
// @Success 200 {array} []structTypes.Date
// @Failure 400 {object} object
// @Router /availability [get]
func GetServiceAvailability(c *gin.Context) {
	log.Println("Availability API hit!..")

	cityId, err := strconv.Atoi(c.Query("city_id"))
	if err != nil {
		log.Println("stoi error for cityId")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer cityId")
		return
	}

	serviceId, err := strconv.Atoi(c.Query("service_id"))
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

// Cancel a booking
// @Summary Cancel a booking
// @Description Cancel a booking by booking ID
// @Param booking_id query string true "booking id"
// @Success 200 {object} object
// @Router /cancelBooking [delete]
func CancelBooking(c *gin.Context) {

	bookingId, err := strconv.Atoi(c.Query("booking_id"))
	if err != nil {
		fmt.Println("stoi error for booking_id")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "need integer booking_id")
		return
	}

	response, err := dbOperations.CancelBooking(bookingId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response)
}

// RescheduleBooking
// @Summary Reschedule a current booking
// @Produce json
// @Param data body structTypes.BookingRescheduleRequest true "Booking Reschedule Request"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Router /rescheduleBooking [post]
func RescheduleBooking(c *gin.Context) {

	var request structTypes.BookingRescheduleRequest

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.

	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	booking := dbOperations.GetBooking(request.BookingId)
	booking.Day = request.Day
	booking.Month = request.Month
	booking.Year = request.Year

	response1, err := dbOperations.InsertBooking(booking)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	response2, err := dbOperations.CancelBooking(request.BookingId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	fmt.Println(response2)
	c.JSON(http.StatusOK, response1)
}

// Rating provided by customer for a service vendor
// @Summary rating provided by customer for a booking
// @Produce json
// @Param data body structTypes.RatingRequest true "rating data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Router /customerRating [post]
func CustomerRating(c *gin.Context) {

	var request structTypes.RatingRequest

	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	response, err := dbOperations.UpdateCustomerRating(request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response)
}

// Rating provided by vendor for a customer
// @Summary rating provided by vendor for a customer
// @Produce json
// @Param data body structTypes.RatingRequest true "rating data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Router /vendorRating [post]
func VendorRating(c *gin.Context) {

	var request structTypes.RatingRequest

	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	response, err := dbOperations.UpdateVendorRating(request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response)
}
