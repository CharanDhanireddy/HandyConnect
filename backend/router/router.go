package router

import (
	"github.com/gin-gonic/gin"

	"handy/requestHandlers"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", requestHandlers.HomePage)

	//Get city list
	r.GET("/cities", requestHandlers.ReturnCity) //pushing the citiesjson to cityapi

	//Post user login
	r.POST("/userLogin", requestHandlers.UserLogin)

	//Post user sign up
	r.POST("/customerSignUp", requestHandlers.CustomerSignUp)

	//Post vendor login
	r.POST("/vendorLogin", requestHandlers.UserLogin)

	//Post vendor sign up
	r.POST("/vendorSignUp", requestHandlers.VendorSignUp)

	//Get customer profile
	r.GET("/customer", requestHandlers.CustData)

	//Get Vendor profile
	r.GET("/vendor", requestHandlers.ReturnVendor)

	//Get Services for city
	r.GET("/services", requestHandlers.ReturnCity)

	//Get dates for service in a city
	r.GET("/availability", requestHandlers.GetServiceAvailability)

	//Post create booking
	r.POST("/booking", requestHandlers.CreateBooking)

	// //Get bookings of user
	// http.HandleFunc("/booking", ReturnCiy)

	// //Get bookings of vendor
	// http.HandleFunc("/booking", ReturnCiy)

	r.GET("/vendorapi", requestHandlers.ReturnVendor)

	return r
}
