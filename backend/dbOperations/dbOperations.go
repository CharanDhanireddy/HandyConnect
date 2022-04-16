package dbOperations

import (
	"database/sql"
	"fmt"
	"handy/dbConnection"
	"handy/structTypes"
	"log"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func PopulateData() {
	sqliteDatabase := dbConnection.GetDbConnection()
	insertCity(sqliteDatabase, "Gainesville")

	insertVendor(sqliteDatabase, "Aaron", "Smith", 3524513872, "asmith@gmail.com", "plumbing", "carpentry", "electrical")
	insertVendor(sqliteDatabase, "John", "Doe", 3525555555, "jdoe@gmail.com", "plumbing", "", "")
}

// We are passing db reference connection from main to our method with other parameters
func insertStudent(db *sql.DB, code string, name string, program string) {
	log.Println("Inserting student record ...")
	insertStudentSQL := `INSERT INTO student(code, name, program) VALUES (?, ?, ?)`
	statement, err := db.Prepare(insertStudentSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(code, name, program)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

// We are passing db reference connection from main to our method with other parameters
func insertCity(db *sql.DB, city_name string) {
	log.Println("Inserting city record ...")
	insertCitySQL := `INSERT INTO city(city_name) VALUES (?)`
	statement, err := db.Prepare(insertCitySQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(city_name)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func insertVendor(db *sql.DB, first_name string, last_name string, phone int, email string, service_1 string, service_2 string, service_3 string) {
	log.Println("Inserting vendor record ...")
	insertVendorSQL := `INSERT INTO vendor(first_name, last_name, phone, email,service1_id, service2_id, service3_id) VALUES (?,?,?,?,?,?,?)`
	statement, err := db.Prepare(insertVendorSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(first_name, last_name, phone, email, service_1, service_2, service_3)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func DisplayCity() ([]structTypes.City, error) {
	db := dbConnection.GetDbConnection()
	var city_id int
	var city_name string

	sqlStmt := `SELECT id, city_name FROM City;`

	row, err := db.Query(sqlStmt)
	if err != nil {
		log.Printf("Get all cities DB error: %v", err)
		return nil, err
	}
	defer row.Close()
	var city_list []structTypes.City
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&city_id, &city_name)
		city_list = append(city_list, structTypes.City{city_id, city_name})
		fmt.Println(city_id, city_name)
	}
	row.Close()

	return city_list, nil
}

func DisplayCustData(customerId int) (structTypes.Cust, error) {
	db := dbConnection.GetDbConnection()
	var customer_id int
	var f_name string
	var l_name string
	var city_name string
	var city_id int
	var phn int
	var email string
	var rating float32
	var rating_count int

	var cust_data structTypes.Cust

	sqlStmt := `SELECT c.id, c.first_name, c.last_name, city.city_name, c.city_id, c.phone, c.email, c.rating, c.rating_count FROM customer AS C JOIN city AS city ON c.city_id = city.id WHERE c.id = $1;`

	row, err := db.Query(sqlStmt, customerId)
	if err != nil {
		log.Printf("Get customer data DB error: %v", err)
		return cust_data, err
	}
	defer row.Close()

	if !row.Next() {
		return cust_data, nil
	}
	row.Scan(&customer_id, &f_name, &l_name, &city_name, &city_id, &phn, &email, &rating, &rating_count)
	cust_data = structTypes.Cust{customer_id, f_name, l_name, city_name, city_id, phn, email, rating, rating_count}
	row.Close()

	return cust_data, nil
}

func DisplayVendorData(vendorId int) (structTypes.Vendor, error) {
	db := dbConnection.GetDbConnection()
	var vendor_id int
	var f_name string
	var l_name string
	var city string
	var phn int
	var email string
	var service1 string
	// var service2 string
	// var service3 string
	var rating float32
	var rating_count int

	var vend_data structTypes.Vendor

	sqlStmt := `SELECT v.id, v.first_name, v.last_name, city.city_name, v.phone, v.email, service.service_name, v.rating, v.rating_count  FROM vendor AS v JOIN city AS city ON v.city_id = city.id JOIN service ON service.id=v.service1_id WHERE v.id = $1;`

	row, err := db.Query(sqlStmt, vendorId)
	if err != nil {
		log.Printf("Get vendor data DB error: %v", err)
		return vend_data, err
	}
	defer row.Close()

	if !row.Next() {
		return vend_data, nil
	}

	row.Scan(&vendor_id, &f_name, &l_name, &city, &phn, &email, &service1, &rating, &rating_count)
	vend_data = structTypes.Vendor{vendor_id, f_name, l_name, city, phn, email, service1, rating, rating_count}

	row.Close()

	return vend_data, nil
}

func DisplayServiceData(cityId int) []structTypes.Service {
	db := dbConnection.GetDbConnection()
	var serv_id int
	var serv_name string

	// var service2 string
	// var service3 string

	sqlStmt := `SELECT DISTINCT service.id, service.service_name FROM vendor AS v JOIN city AS city ON v.city_id = city.id JOIN service ON service.id=v.service1_id WHERE city.id = $1;`

	row, err := db.Query(sqlStmt, cityId)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	var serv_list []structTypes.Service
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&serv_id, &serv_name)
		serv_list = append(serv_list, structTypes.Service{serv_id, serv_name})
		fmt.Println(serv_id, serv_name)
	}
	row.Close()

	return serv_list
}

func DisplayCustBookings(customerId int) []structTypes.Booking {
	db := dbConnection.GetDbConnection()
	var id int
	var vend_name string
	var cust_name string
	var serv_name string
	var city string
	var vend_id string
	var cust_id string
	var serv_id string
	var city_id string
	var day int
	var month int
	var year int
	var address string
	var book_stat string
	var cust_rating int
	var vend_rating int
	var otp string

	// var service2 string
	// var service3 string

	sqlStmt := `SELECT b.id, v.first_name||' ' || v.last_name AS vend_name, c.first_name|| ' ' || c.last_name AS cust_name, s.service_name, city.city_name,
	b.vendor_id, b.customer_id, b.service_id, b.city_id, b.day, b.month, b.year, b.address, b.booking_status, b.customer_rating, b.vendor_rating, b.otp
	FROM Booking as b 
	JOIN vendor as v 
	ON v.id = b.vendor_id 
	JOIN city AS city 
	ON b.city_id = city.id 
	JOIN service as s
	ON s.id = b.service_id
	JOIN customer AS c 
	ON b.customer_id = c.id  WHERE c.id = $1
	ORDER BY b.year, b.month, b.day ASC;`

	row, err := db.Query(sqlStmt, customerId)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	var cust_book []structTypes.Booking
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&id, &vend_name, &cust_name, &serv_name, &city, &vend_id, &cust_id, &serv_id, &city_id, &day, &month, &year, &address, &book_stat, &cust_rating, &vend_rating, &otp)
		cust_book = append(cust_book, structTypes.Booking{id, vend_name, cust_name, serv_name, city, vend_id, cust_id, serv_id, city_id, day, month, year, address, book_stat, cust_rating, vend_rating, otp})
		fmt.Println(id, vend_name, cust_name, serv_name, city, day, month, year, address, cust_rating, otp)
	}
	row.Close()

	return cust_book
}

func DisplayVendBookings(vendorId int) []structTypes.Booking {
	db := dbConnection.GetDbConnection()
	var id int
	var vend_name string
	var cust_name string
	var serv_name string
	var city string
	var vend_id string
	var cust_id string
	var serv_id string
	var city_id string
	var day int
	var month int
	var year int
	var address string
	var book_stat string
	var cust_rating int
	var vend_rating int
	var otp string

	// var service2 string
	// var service3 string

	sqlStmt := `SELECT b.id, v.first_name||' ' || v.last_name AS vend_name, c.first_name|| ' ' || c.last_name AS cust_name, s.service_name, city.city_name,
	b.vendor_id, b.customer_id, b.service_id, b.city_id, b.day, b.month, b.year, b.address, b.booking_status, b.customer_rating, b.vendor_rating, b.otp
	FROM Booking as b 
	JOIN vendor as v 
	ON v.id = b.vendor_id 
	JOIN city AS city 
	ON b.city_id = city.id 
	JOIN service as s
	ON s.id = b.service_id
	JOIN customer AS c 
	ON b.customer_id = c.id  WHERE v.id = $1
	ORDER BY b.year, b.month, b.day ASC;`

	row, err := db.Query(sqlStmt, vendorId)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	var vend_book []structTypes.Booking
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&id, &vend_name, &cust_name, &serv_name, &city, &vend_id, &cust_id, &serv_id, &city_id, &day, &month, &year, &address, &book_stat, &cust_rating, &vend_rating, &otp)
		vend_book = append(vend_book, structTypes.Booking{id, vend_name, cust_name, serv_name, city, vend_id, cust_id, serv_id, city_id, day, month, year, address, book_stat, cust_rating, vend_rating, otp})
		fmt.Println(id, vend_name, cust_name, serv_name, city, day, month, year, address, vend_rating, otp)
	}
	row.Close()

	return vend_book
}

func BeginService(pass int) string {
	db := dbConnection.GetDbConnection()
	var id int
	var otp string
	// var booking_status string

	sqlStmt := `SELECT id, otp, booking_status FROM booking WHERE id = $1 and otp = $2 and booking_status = "Confirmed"`
	row1, err := db.Query(sqlStmt, id, otp)
	if err != nil {
		log.Fatal(err)
	}

	if row1.Next() {
		sqlStmt := `UPDATE booking SET booking_status = "In-Progress" WHERE id = ?`
		row2, err := db.Query(sqlStmt, id)
		if err != nil {
			log.Fatal(err)
		}
		row2.Close()

	}
	row1.Close()
	return "Service Started"
}

func EndService(pass int) string {
	db := dbConnection.GetDbConnection()
	var id int
	// var otp string
	// var booking_status string

	sqlStmt := `SELECT id, booking_status FROM booking WHERE id = $1 and booking_status = "In-progress"`
	row1, err := db.Query(sqlStmt, id)
	if err != nil {
		log.Fatal(err)
	}

	if row1.Next() {
		sqlStmt := `UPDATE booking SET booking_status = "Completed" WHERE id = ?`
		row2, err := db.Query(sqlStmt, id)
		if err != nil {
			log.Fatal(err)
		}
		row2.Close()

	}
	row1.Close()
	return "Service Complete"
}
