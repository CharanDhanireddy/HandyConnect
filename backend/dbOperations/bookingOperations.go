package dbOperations

import (
	"errors"
	"fmt"
	schema "handy/schema"
	structTypes "handy/structTypes"
	"log"
	"strings"
	"time"

	dbConnection "handy/dbConnection"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func InsertBooking(booking schema.BookingSchema) (string, error) {
	db := dbConnection.GetDbConnection()
	if !CheckAvailability(booking.CityId, booking.ServiceId, booking.Day, booking.Month, booking.Year) {
		fmt.Println("Service not available on date: %d-%d-%d", booking.Month, booking.Day, booking.Year)
		return "", errors.New("Service not available on date")
	}

	err := assignVendor(&booking)
	if err != nil {
		return "", err
	}

	log.Println("Inserting booking record ...")
	insertBookingSQL := `INSERT INTO booking (vendor_id, customer_id, service_id, city_id, day, month, year, address, booking_status, customer_rating, vendor_rating) VALUES (?,?,?,?,?,?,?,?,"Confirmed", 0, 0)`
	statement, err := db.Prepare(insertBookingSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
		return "", err
	}

	_, err = statement.Exec(booking.VendorId, booking.CustomerId, booking.ServiceId, booking.CityId, //have to update the cityID when changed on the front-end by a customer
		booking.Day, booking.Month, booking.Year, booking.Address, booking.BookingStatus, booking.CustomerRating, booking.VendorRating)
	if err != nil {
		log.Println(err.Error())
		return "", err
	}

	return "succesfully created booking", err
}

func CancelBooking(booking schema.BookingSchema) (string, error) {
	db := dbConnection.GetDbConnection()

	log.Println("Updating booking record ...")
	updateBookingSQL := `UPDATE booking SET booking_status = "Cancelled" WHERE id = ?`
	statement, err := db.Prepare(updateBookingSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
		return "", err
	}

	_, err = statement.Exec(booking.Id)
	if err != nil {
		log.Println(err.Error())
		return "", err
	}

	return "succesfully cancelled booking", err
}

func CheckAvailability(cityId int, serviceId int, day int, month int, year int) bool {
	db := dbConnection.GetDbConnection()
	var vendorId string
	var vendorIdList []string

	sqlStmt := `SELECT id FROM vendor WHERE city_id = $1 and (service1_id = $2 or service2_id = $2 or service3_id = $2);`

	row, err := db.Query(sqlStmt, cityId, serviceId)
	if err != nil {
		log.Println(err)
		return false
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&vendorId)
		vendorIdList = append(vendorIdList, vendorId)
	}
	row.Close()

	sqlStmt = `SELECT count(id) FROM booking WHERE vendor_id in ($1) and day = $2 and month = $3 and year = $4;`

	row, err = db.Query(sqlStmt, strings.Join(vendorIdList, ","), day, month, year)
	if err != nil {
		log.Println(err)
		return false
	}
	defer row.Close()

	var totalBookings int
	row.Scan(&totalBookings)
	row.Close()

	return (len(vendorIdList) * 5) > totalBookings
}

func assignVendor(booking *schema.BookingSchema) error {
	db := dbConnection.GetDbConnection()
	var vendorId int

	sqlStmt := `SELECT vendor.id as booking_count
				FROM vendor
				LEFT JOIN 
				(SELECT id as booking_id, vendor_id FROM booking
				WHERE booking.day = $1 AND booking.month = $2 AND booking.year = $3 AND booking.service_id = $4 and booking.city_id = $5)
				
				ON vendor_id = vendor.id
				WHERE vendor.service1_id = $4 AND vendor.city_id = $5
				GROUP BY vendor.id
				ORDER BY booking_count;`

	row, err := db.Query(sqlStmt, booking.Day, booking.Month, booking.Year, booking.ServiceId, booking.CityId)
	if err != nil {
		log.Println(err)
		return err
	}
	defer row.Close()
	if row.Next() {
		row.Scan(&vendorId)
		booking.VendorId = vendorId
	} else {
		return errors.New("No vendor available")
	}
	row.Close()

	return nil
}

func ServiceAvailability(cityId int, serviceId int) []structTypes.Date {
	now := time.Now()

	availableDates := make([]structTypes.Date, 0)

	for i := 1; i <= 7; i++ {
		date := now.AddDate(0, 0, i)
		year, month, day := date.Date()
		if CheckAvailability(cityId, serviceId, day, int(month), year) {
			availableDates = append(availableDates, structTypes.Date{Day: day, Month: int(month), Year: year})
		}
	}

	return availableDates
}

func UpdateCustomerRating(request structTypes.RatingRequest) (string, error) {
	db := dbConnection.GetDbConnection()

	log.Println("Updating Customer rating ...")
	updateBookingSQL := `UPDATE booking SET customer_rating = ? WHERE id = ?`
	statement, err := db.Prepare(updateBookingSQL) // Prepare statement.
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	_, err = statement.Exec(request.Rating, request.BookingId)
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	_, _, vendorId := GetBooking(request.BookingId)
	_, rating, ratingCount := GetVendorRating(vendorId)
	new_rating := (rating*ratingCount + request.Rating) / (ratingCount + 1)

	updateVendorSQL := `UPDATE vendor SET rating = ?, rating_count = ? WHERE id = ?`
	statement, err = db.Prepare(updateVendorSQL) // Prepare statement.
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	_, err = statement.Exec(new_rating, ratingCount+1, vendorId)
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	return "succesfully rated booking", err
}

func UpdateVendorRating(request structTypes.RatingRequest) (string, error) {
	db := dbConnection.GetDbConnection()

	log.Println("Updating Customer rating ...")
	updateBookingSQL := `UPDATE booking SET vendor_rating = ? WHERE id = ?`
	statement, err := db.Prepare(updateBookingSQL) // Prepare statement.
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	_, err = statement.Exec(request.Rating, request.BookingId)
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	_, customerId, _ := GetBooking(request.BookingId)
	_, rating, ratingCount := GetCustomerRating(customerId)
	new_rating := (rating*ratingCount + request.Rating) / (ratingCount + 1)

	updateCustomerSQL := `UPDATE customer SET rating = ?, rating_count = ? WHERE id = ?`
	statement, err = db.Prepare(updateCustomerSQL) // Prepare statement.
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	_, err = statement.Exec(new_rating, ratingCount+1, customerId)
	if err != nil {
		log.Println(err.Error())
		return "Error Occurred", err
	}

	return "succesfully rated booking", err
}

func GetBooking(bookingId int) (int, int, int) {
	db := dbConnection.GetDbConnection()
	var id int
	var customer_id int
	var vendor_id int

	sqlStmt := `SELECT id, customer_id, vendor_id FROM booking WHERE id = $1;`

	row, err := db.Query(sqlStmt, bookingId)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&id, &customer_id, &vendor_id)
	}
	row.Close()

	return id, customer_id, vendor_id
}
