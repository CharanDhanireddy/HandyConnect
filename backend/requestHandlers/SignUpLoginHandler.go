package requestHandlers

import (
	"handy/dbOperations"
	"handy/middleware"
	schema "handy/schema"
	"handy/structTypes"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CustomerLogin
// @Summary verify email and password of customer
// @Produce json
// @Param data body structTypes.LoginRequest true "Login data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Failure 401 {object} object
// @Router /customerLogin [post]
func CustomerLogin(c *gin.Context) {

	var request structTypes.LoginRequest

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	customer_data, isValid, err := verifyCustomerLogin(request.Email, request.Password)
	if err != nil {
		log.Printf("Login user DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error()) // Return 500 Internal Server Error.
		return
	}
	if !isValid {
		log.Printf("Unauthorized access for user: %v", request.Email)
		c.JSON(http.StatusUnauthorized, "Wrong password or email")
		return
	}

	token, err := middleware.CreateToken(uint(customer_data.Id))
	if err != nil {
		log.Printf("unable to generate token. Error: ", err.Error())
		c.JSON(http.StatusUnauthorized, "unable to generate token")
		return
	}
	customer_data.AuthToken = token

	c.JSON(http.StatusOK, customer_data)
}

func verifyCustomerLogin(email string, password string) (structTypes.Cust, bool, error) {

	return dbOperations.VerifyCustomerLogin(email, password)
}

// CustomerSignUp
// @Summary create new customer
// @Produce json
// @Param data body schema.CustomerProfileSchema true "customer data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Router /customerSignUp [post]
func CustomerSignUp(c *gin.Context) {

	var request schema.CustomerProfileSchema

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	response, err := dbOperations.InsertCustomer(request)
	if err != nil {
		log.Printf("Customer signup DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, response)
}

// VendorLogin
// @Summary verify email and password of vendor
// @Produce json
// @Param data body structTypes.LoginRequest true "Login data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Failure 401 {object} object
// @Router /vendorLogin [post]
func VendorLogin(c *gin.Context) {

	var request structTypes.LoginRequest

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	vendor_data, isValid, err := verifyVendorLogin(request.Email, request.Password)
	if err != nil {
		log.Printf("Login vendor DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error()) // Return 500 Internal Server Error.
		return
	}
	if !isValid {
		log.Printf("Unauthorized access for vendor: %v", request.Email)
		c.JSON(http.StatusUnauthorized, "Wrong password or email")
		return
	}
	
	token, err := middleware.CreateToken(uint(vendor_data.Id))
	if err != nil {
		log.Printf("unable to generate token. Error: ", err.Error())
		c.JSON(http.StatusUnauthorized, "unable to generate token")
		return
	}
	vendor_data.AuthToken = token

	c.JSON(http.StatusOK, vendor_data)
}

func verifyVendorLogin(email string, password string) (structTypes.Vendor, bool, error) {
	return dbOperations.VerifyVendorLogin(email, password)
}

// VendorSignUp
// @Summary create new vendor
// @Produce json
// @Param data body schema.VendorProfileSchema true "vendor data"
// @Success 200 {object} object
// @Failure 400 {object} object
// @Router /vendorSignUp [post]
func VendorSignUp(c *gin.Context) {

	var request schema.VendorProfileSchema

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	response, err := dbOperations.InsertVendor(request)
	if err != nil {
		log.Printf("Vendor signup DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error()) // Return 500 Internal Server Error.
		return
	}
	c.JSON(http.StatusOK, response)
}
