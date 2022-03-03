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

func DisplayCity() []structTypes.City {
	db := dbConnection.GetDbConnection()
	var city_id int
	var city_name string

	sqlStmt := `SELECT id, city_name FROM City WHERE id = $1;`

	row, err := db.Query(sqlStmt, "1")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	var city_list []structTypes.City
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&city_id, &city_name)
		city_list = append(city_list, structTypes.City{city_id, city_name})
		fmt.Println(city_id, city_name)
	}
	row.Close()

	return city_list
}

func DisplayCustData() []structTypes.Cust {
	db := dbConnection.GetDbConnection()
	var f_name string
	var l_name string
	var city string
	var phn int
	var email string

	sqlStmt := `SELECT c.first_name, c.last_name, city.city_name, c.phone, c.email FROM customer AS C JOIN city AS city ON c.city_id = city.id WHERE c.id = $1;`

	row, err := db.Query(sqlStmt, "4")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	var cust_data []structTypes.Cust
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&f_name, &l_name, &city, &phn, &email)
		cust_data = append(cust_data, structTypes.Cust{f_name, l_name, city, phn, email})

	}
	row.Close()

	return cust_data
}

func DisplayVendorData() []structTypes.Vendor {
	db := dbConnection.GetDbConnection()
	var f_name string
	var l_name string
	var city string
	var phn int
	var email string
	var service1 string
	// var service2 string
	// var service3 string

	sqlStmt := `SELECT v.first_name, v.last_name, city.city_name, v.phone, v.email, service.service_name  FROM vendor AS v JOIN city AS city ON v.city_id = city.id JOIN service ON service.id=v.service1_id WHERE v.id = $1;`

	row, err := db.Query(sqlStmt, "5")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	var vend_list []structTypes.Vendor
	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&f_name, &l_name, &city, &phn, &email, &service1)
		vend_list = append(vend_list, structTypes.Vendor{f_name, l_name, city, phn, email, service1})
		fmt.Println(f_name, l_name, phn)
	}
	row.Close()

	return vend_list
}

func DisplayServiceData() []structTypes.Service {
	db := dbConnection.GetDbConnection()
	var serv_id int
	var serv_name string

	// var service2 string
	// var service3 string

	sqlStmt := `SELECT DISTINCT service.id, service.service_name FROM vendor AS v JOIN city AS city ON v.city_id = city.id JOIN service ON service.id=v.service1_id WHERE city.id = $1;`

	row, err := db.Query(sqlStmt, "2")
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

// var f_name string
// var l_name string
// var email string
// var service1 string
// var service2 string
// var service3 string
// var phn int

// func displayVendor(db *sql.DB) []vendor {
// 	var f_name string
// 	var l_name string
// 	var phn int

// 	sqlStmt := `SELECT first_name, last_name, phone FROM vendor WHERE service1_id = $1 ;`

// 	row, err := db.Query(sqlStmt, "plumbing")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer row.Close()

// 	var vend_list []vendor
// 	for row.Next() { // Iterate and fetch the records from result cursor
// 		row.Scan(&f_name, &l_name, &phn)
// 		vend_list = append(vend_list, vendor{f_name, l_name, phn})
// 		fmt.Println(f_name, l_name, phn)
// 	}
// 	row.Close()

// 	return vend_list
// }
