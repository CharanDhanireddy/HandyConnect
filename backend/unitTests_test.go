package main

import (
	"bytes"
	"encoding/json"
	"handy/requestHandlers"
	"handy/structTypes"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"handy/dbConnection"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestCityRet(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	context, _ := gin.CreateTestContext(rr)
	requestHandlers.GetCityList(context)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.City
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"city_id":1,"city_name":"Gainesville"},{"city_id":2,"city_name":"Tampa"},{"city_id":3,"city_name":"Jacksonville"},{"city_id":4,"city_name":"Orlando"},{"city_id":5,"city_name":"Miami"},{"city_id":6,"city_name":"Tallahasse"},{"city_id":7,"city_name":"Alachua"},{"city_id":8,"city_name":"Daytona"},{"city_id":9,"city_name":"New York"},{"city_id":10,"city_name":"San Francisco"}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestCityRet_Absent(t *testing.T) { //For testing cities that aren't in the test DB
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	context, _ := gin.CreateTestContext(rr)
	requestHandlers.GetCityList(context)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.City
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"city_id":5,"city_name":"Miami"}]`
	act, _ := json.Marshal(got)
	assert.NotEqual(t, expected, string(act))

}

func TestCust(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)

	var req http.Request
	c.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "customer_id=1"

	requestHandlers.CustData(c)
	assert.Equal(t, 200, rr.Code)

	var got structTypes.Cust
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `{"id":1,"first_name":"customer name","last_name":"last name","city_name":"Gainesville","city_id":1,"phone":2222222222,"email":"cusemail@email.com","rating":0,"rating_count":0}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestVend(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)

	var req http.Request
	c.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "vendor_id=5"

	requestHandlers.ReturnVendor(c)
	assert.Equal(t, 200, rr.Code)

	var got structTypes.Vendor
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `{"id":5,"first_name":"vendor name","last_name":"vendor lastname","city_name":"Gainesville","phone":3333333333,"email":"vendormail@email.com","service_name":"Electrician","rating":0,"rating_count":0}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestServices(t *testing.T) {
	dbConnection.TestDBConnection()
	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)

	var req http.Request
	c.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "city_id=1"

	requestHandlers.ReturnServiceList(c)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Service
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"service_id":1,"service_name":"Electrician"},{"service_id":2,"service_name":"Plumber"},{"service_id":7,"service_name":"Painter"},{"service_id":3,"service_name":"Carpenter"},{"service_id":4,"service_name":"Welder"},{"service_id":5,"service_name":"Housekeeper"}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestBookingCust(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	c.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "customer_id=4"

	requestHandlers.ReturnBookingCust(c)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Booking
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"id":5,"vendor_name":"Joshua Weissman","customer_name":"v d","service_name":"Carpenter","city_name":"Tampa","vendor_id":"8","vendor_phone":"4455664455","customer_id":"4","customer_phone":"1234567890","service_id":"3","city_id":"2","day":10,"month":3,"year":2022,"address":"34 st dj Tampa 19873289","booking_status":"Confirmed","customer_rating":0,"vendor_rating":0,"otp":""}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestBookingVend(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	c.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "vendor_id=5"
	requestHandlers.ReturnBookingVend(c)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Booking
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"id":13,"vendor_name":"vendor name vendor lastname","customer_name":"a b","service_name":"Electrician","city_name":"Gainesville","vendor_id":"5","vendor_phone":"3333333333","customer_id":"3","customer_phone":"65","service_id":"1","city_id":"1","day":8,"month":3,"year":2022,"address":"edc Gainesville undefined","booking_status":"Confirmed","customer_rating":0,"vendor_rating":0,"otp":""},{"id":15,"vendor_name":"vendor name vendor lastname","customer_name":"Marie Curie","service_name":"Electrician","city_name":"Gainesville","vendor_id":"5","vendor_phone":"3333333333","customer_id":"6","customer_phone":"7894561234","service_id":"1","city_id":"1","day":27,"month":4,"year":2022,"address":"sp4Test Gainesville 32681","booking_status":"Confirmed","customer_rating":0,"vendor_rating":0,"otp":"227887"}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestCustLoginSuccess(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	var body = []byte(`{"email":"cusemail@email.com", "password":"123456789"}`)
	req = *httptest.NewRequest("POST", "/customerLogin", bytes.NewBuffer(body))
	c.Request = &req

	requestHandlers.CustomerLogin(c)
	assert.Equal(t, 200, rr.Code)

	var got structTypes.Cust
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `{"id":1,"first_name":"customer name","last_name":"last name","city_name":"Gainesville","city_id":1,"phone":2222222222,"email":"cusemail@email.com","rating":0,"rating_count":0}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestCustLoginUnauthorized(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	var body = []byte(`{"email":"cusemail@email.com", "password":"wrong_pass"}`)
	req = *httptest.NewRequest("POST", "/customerLogin", bytes.NewBuffer(body))
	c.Request = &req

	requestHandlers.CustomerLogin(c)
	assert.Equal(t, 401, rr.Code)
}

func TestVendLoginSuccess(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	var body = []byte(`{"email":"vendormail@email.com", "password":"123456789"}`)
	req = *httptest.NewRequest("POST", "/vendorLogin", bytes.NewBuffer(body))
	c.Request = &req

	requestHandlers.VendorLogin(c)
	assert.Equal(t, 200, rr.Code)

	var got structTypes.Vendor
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `{"id":5,"first_name":"vendor name","last_name":"vendor lastname","city_name":"Gainesville","phone":3333333333,"email":"vendormail@email.com","service_name":"Electrician","rating":0,"rating_count":0}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestVendLoginUnauthorized(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	var body = []byte(`{"email":"vendormail@email.com", "password":"wrong_pass"}`)
	req = *httptest.NewRequest("POST", "/vendorLogin", bytes.NewBuffer(body))
	c.Request = &req

	requestHandlers.VendorLogin(c)
	assert.Equal(t, 401, rr.Code)
}

func TestCustomerRating(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	var body = []byte(`{"booking_id":3, "rating":4}`)
	req = *httptest.NewRequest("POST", "/customerRating", bytes.NewBuffer(body))
	c.Request = &req

	requestHandlers.CustomerRating(c)
	assert.Equal(t, 200, rr.Code)

	var got string
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `"succesfully rated booking"`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))
}

func TestVendorRating(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rr)
	var req http.Request
	var body = []byte(`{"booking_id":3, "rating":5}`)
	req = *httptest.NewRequest("POST", "/vendorRating", bytes.NewBuffer(body))
	c.Request = &req

	requestHandlers.VendorRating(c)
	assert.Equal(t, 200, rr.Code)

	var got string
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `"succesfully rated booking"`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))
}

func TestCancelBooking(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	cust_id, _ := gin.CreateTestContext(rr)

	var params []gin.Param
	cust_id.Params = append(params, gin.Param{"customer_id", "4"})
	var req http.Request
	cust_id.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "customer_id=4"

	requestHandlers.ReturnBookingCust(cust_id)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Booking
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"id":5,"vendor_name":"Joshua Weissman","customer_name":"v d","service_name":"Carpenter","city_name":"Tampa","vendor_id":"8","vendor_phone":"4455664455","customer_id":"4","customer_phone":"1234567890","service_id":"3","city_id":"2","day":10,"month":3,"year":2022,"address":"34 st dj Tampa 19873289","booking_status":"Confirmed","customer_rating":0,"vendor_rating":0,"otp":""}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}

func TestRescheduleBooking(t *testing.T) {
	dbConnection.TestDBConnection()

	rr := httptest.NewRecorder()
	cust_id, _ := gin.CreateTestContext(rr)

	var params []gin.Param
	cust_id.Params = append(params, gin.Param{"customer_id", "3"})
	var req http.Request
	cust_id.Request = &req
	var url url.URL
	req.URL = &url
	req.URL.RawQuery = "customer_id=3"

	requestHandlers.ReturnBookingCust(cust_id)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Booking
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"id":3,"vendor_name":"John Smith","customer_name":"a b","service_name":"Electrician","city_name":"Gainesville","vendor_id":"6","vendor_phone":"123456789","customer_id":"3","customer_phone":"65","service_id":"1","city_id":"1","day":7,"month":3,"year":2022,"address":"edc Gainesville undefined","booking_status":"Cancelled","customer_rating":4,"vendor_rating":5,"otp":""},{"id":13,"vendor_name":"vendor name vendor lastname","customer_name":"a b","service_name":"Electrician","city_name":"Gainesville","vendor_id":"5","vendor_phone":"3333333333","customer_id":"3","customer_phone":"65","service_id":"1","city_id":"1","day":8,"month":3,"year":2022,"address":"edc Gainesville undefined","booking_status":"Confirmed","customer_rating":0,"vendor_rating":0,"otp":""}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}
