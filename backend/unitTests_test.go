package main

import (
	"encoding/json"
	"handy/requestHandlers"
	"handy/structTypes"
	"net/http/httptest"
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
	expected := `[{\"city_id\":1,\"city_name\":\"Gainesville\"},{\"city_id\":2,\"city_name\":\"Tampa\"},{\"city_id\":3,\"city_name\":\"Jacksonville\"}]`
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
	cust_data, _ := gin.CreateTestContext(rr)
	requestHandlers.CustData(cust_data)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Cust
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"first_name":"customer name","last_name":"last name","city_name":"Gainesville","phn":2222222222,"email":"cusemail@email.com"}]`
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
	vend_data, _ := gin.CreateTestContext(rr)
	requestHandlers.ReturnVendor(vend_data)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Vendor
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"first_name":"vendor name","last_name":"vendor lastname","city_name":"Gainesville","phn":3333333333,"email":"vendormail@email.com","service1":"electrician"}]`
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
	serv_data, _ := gin.CreateTestContext(rr)
	requestHandlers.ReturnServiceList(serv_data)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Service
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"serv_id":3,"serv_name":"Carpenter"}]`
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
	book_cust_data, _ := gin.CreateTestContext(rr)
	requestHandlers.ReturnBookingCust(book_cust_data)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Booking
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"id":1,"vend_name":"vendor name vendor lastname","cust_name":"customer name last name","service_name":"electrician","city":"Gainesville","day":7,"month":2,"year":2022,"address":"2022"},{"id":2,"vend_name":"vendor name vendor lastname","cust_name":"customer name last name","service_name":"electrician","city":"Gainesville","day":9,"month":2,"year":2022,"address":"2022"},{"id":3,"vend_name":"John Smith","cust_name":"customer name last name","service_name":"electrician","city":"Gainesville","day":8,"month":5,"year":2022,"address":"4000SW"}]`
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
	book_vend_data, _ := gin.CreateTestContext(rr)
	requestHandlers.ReturnBookingVend(book_vend_data)
	assert.Equal(t, 200, rr.Code)

	var got []structTypes.Booking
	err := json.Unmarshal(rr.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}

	// Check the response body is what we expect.
	expected := `[{"id":3,"vend_name":"John Smith","cust_name":"customer name last name","service_name":"electrician","city":"Gainesville","day":8,"month":5,"year":2022,"address":"4000SW"}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
	act, _ := json.Marshal(got)
	assert.Equal(t, expected, string(act))

}
