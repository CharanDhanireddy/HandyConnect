package router

import (
	"handy/middleware"
	"handy/requestHandlers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORS())

	r.GET("/", requestHandlers.HomePage)

	//Get city list
	r.GET("/cities", requestHandlers.GetCityList)

	//Post user login
	r.POST("/customerLogin", requestHandlers.CustomerLogin)

	//Post user sign up
	r.POST("/customerSignUp", requestHandlers.CustomerSignUp)

	//Post vendor login
	r.POST("/vendorLogin", requestHandlers.VendorLogin)

	//Post vendor sign up
	r.POST("/vendorSignUp", requestHandlers.VendorSignUp)

	//Get customer profile
	r.GET("/customer", requestHandlers.CustData)

	//Get Vendor profile
	r.GET("/vendor", requestHandlers.ReturnVendor)

	//Get Services for city
	r.GET("/services", requestHandlers.ReturnServiceList)

	//Get dates for service in a city
	r.GET("/availability", requestHandlers.GetServiceAvailability)

	//Post create booking
	r.POST("/booking", requestHandlers.CreateBooking)

	//Post customer booking
	r.GET("/customerbooking", requestHandlers.ReturnBookingCust)

	//Post vendor booking
	r.GET("/vendorbooking", requestHandlers.ReturnBookingVend)

	//Booking cancellation
	r.DELETE("/cancelBooking", requestHandlers.CancelBooking)

	//Booking reschedule
	r.POST("/rescheduleBooking", requestHandlers.RescheduleBooking)

	//For customer to rate a vendor
	r.POST("/customerRating", requestHandlers.CustomerRating)

	//For vendor to rate a customer
	r.POST("/vendorRating", requestHandlers.VendorRating)

	//For vendor to start a service
	r.POST("/startService", requestHandlers.StartService)

	//For vendor to end a service
	r.POST("/endService", requestHandlers.FinishService)

	return r
}
