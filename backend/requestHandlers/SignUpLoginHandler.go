package requestHandlers

import (
	"handy/dbOperations"
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

	ok, err := verifyCustomerLogin(request.Email, request.Password)
	if err != nil {
		log.Printf("Login user DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error()) // Return 500 Internal Server Error.
		return
	}

	if !ok {
		log.Printf("Unauthorized access for user: %v", request.Email)
		c.JSON(http.StatusUnauthorized, "Wrong password or email")
		return
	}
	c.JSON(http.StatusOK, "Successfully logged in")
}

func verifyCustomerLogin(email string, password string) (bool, error) {
	if email == "test_user@gmail.com" && password == "test_password" {
		return true, nil
	}
	return false, nil

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

	dbOperations.InsertCustomer(request)

	c.JSON(http.StatusOK, "New customer created")
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

	ok, err := verifyVendorLogin(request.Email, request.Password)
	if err != nil {
		log.Printf("Login user DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error()) // Return 500 Internal Server Error.
		return
	}

	if !ok {
		log.Printf("Unauthorized access for user: %v", request.Email)
		c.JSON(http.StatusUnauthorized, "Wrong password or email")
		return
	}
	c.JSON(http.StatusOK, "Successfully logged in")
}

func verifyVendorLogin(email string, password string) (bool, error) {
	if email == "test_user@gmail.com" && password == "test_password" {
		return true, nil
	}
	return false, nil

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

	dbOperations.InsertVendor(request)

	c.JSON(http.StatusOK, "New vendor created")
}
