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

	sqlStmt := `SELECT id, city_name FROM City WHERE id = $1;`

	row, err := db.Query(sqlStmt, "1")
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

func DisplayCustData() ([]structTypes.Cust, error) {
	db := dbConnection.GetDbConnection()
	var customer_id int
	var f_name string
	var l_name string
	var city_name string
	var city_id int
	var phn int
	var email string

	sqlStmt := `SELECT c.id, c.first_name, c.last_name, city.city_name, c.city_id, c.phone, c.email FROM customer AS C JOIN city AS city ON c.city_id = city.id WHERE c.id = $1;`

	row, err := db.Query(sqlStmt, "4")
	if err != nil {
		log.Printf("Get customer data DB error: %v", err)
		return nil, err
	}
	defer row.Close()
	var cust_data []structTypes.Cust
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&customer_id, &f_name, &l_name, &city_name, &city_id, &phn, &email)
		cust_data = append(cust_data, structTypes.Cust{customer_id, f_name, l_name, city_name, city_id, phn, email})
	}
	row.Close()

	return cust_data, nil
}

func DisplayVendorData() ([]structTypes.Vendor, error) {
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

	sqlStmt := `SELECT v.id, v.first_name, v.last_name, city.city_name, v.phone, v.email, service.service_name  FROM vendor AS v JOIN city AS city ON v.city_id = city.id JOIN service ON service.id=v.service1_id WHERE v.id = $1;`

	row, err := db.Query(sqlStmt, "5")
	if err != nil {
		log.Printf("Get vendor data DB error: %v", err)
		return nil, err
	}
	defer row.Close()

	var vend_list []structTypes.Vendor
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&vendor_id, &f_name, &l_name, &city, &phn, &email, &service1)
		vend_list = append(vend_list, structTypes.Vendor{vendor_id, f_name, l_name, city, phn, email, service1})
		fmt.Println(f_name, l_name, phn)
	}
	row.Close()

	return vend_list, nil
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
	var day int
	var month int
	var year int
	var address string

	// var service2 string
	// var service3 string

	sqlStmt := `SELECT b.id, v.first_name||' ' || v.last_name AS vend_name, c.first_name|| ' ' || c.last_name AS cust_name, s.service_name, city.city_name, b.day, b.month, b.year, b.address 
	FROM Booking as b 
	JOIN vendor as v 
	ON v.id = b.vendor_id 
	JOIN city AS city 
	ON c.city_id = city.id 
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
		row.Scan(&id, &vend_name, &cust_name, &serv_name, &city, &day, &month, &year, &address)
		cust_book = append(cust_book, structTypes.Booking{id, vend_name, cust_name, serv_name, city, day, month, year, address})
		fmt.Println(id, vend_name, cust_name, serv_name, city, day, month, year, address)
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
	var day int
	var month int
	var year int
	var address string

	// var service2 string
	// var service3 string

	sqlStmt := `SELECT b.id, v.first_name||' ' || v.last_name AS vend_name, c.first_name|| ' ' || c.last_name AS cust_name, s.service_name, city.city_name, b.day, b.month, b.year, b.address 
	FROM Booking as b 
	JOIN vendor as v 
	ON v.id = b.vendor_id 
	JOIN city AS city 
	ON c.city_id = city.id 
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
		row.Scan(&id, &vend_name, &cust_name, &serv_name, &city, &day, &month, &year, &address)
		vend_book = append(vend_book, structTypes.Booking{id, vend_name, cust_name, serv_name, city, day, month, year, address})
		fmt.Println(id, vend_name, cust_name, serv_name, city, day, month, year, address)
	}
	row.Close()

	return vend_book
}
