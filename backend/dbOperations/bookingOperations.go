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

	log.Println("Inserting booking record ...")
	insertBookingSQL := `INSERT INTO booking (vendor_id, customer_id, service_id, city_id, day, month, year, address) VALUES (?,?,?,?,?,?,?,?)`
	statement, err := db.Prepare(insertBookingSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
		return "", err
	}
	_, err = statement.Exec(booking.VendorId, booking.CustomerId, booking.ServiceId, booking.CityId,
		booking.Day, booking.Month, booking.Year, booking.Address)

	return "succesfully created booking", err
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
