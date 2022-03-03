package requestHandlers

import (
	"handy/dbOperations"
	schema "handy/schema"
	"handy/structTypes"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserLogin(c *gin.Context) {

	var request structTypes.LoginRequest

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	if err := c.BindJSON(&request); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, "an error occurred while parsing request")
		return
	}

	ok, err := verifyUserLogin(request.Username, request.Password)
	if err != nil {
		log.Printf("Login user DB error, %v", err)
		c.JSON(http.StatusInternalServerError, err.Error()) // Return 500 Internal Server Error.
		return
	}

	if !ok {
		log.Printf("Unauthorized access for user: %v", request.Username)
		c.JSON(http.StatusUnauthorized, "Wrong password or username")
		return
	}
	c.JSON(http.StatusOK, "Successfully logged in")
}

func verifyUserLogin(username string, password string) (bool, error) {
	if username == "test_user@gmail.com" && password == "test_password" {
		return true, nil
	}
	return false, nil

}

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
