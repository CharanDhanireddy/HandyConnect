package main

// import (
// 	"database/sql"
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"os"

// 	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
// )

// func homePage(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "welcome to the homepage!")
// 	fmt.Println("Endpoint hit!")
// }

// func handleRequests() {
// 	http.HandleFunc("/", homePage)

// 	http.HandleFunc("/consumeapi", returnSearch) //pushing the consumer/vendor info to consumeapi
// 	// log.Fatal(http.ListenAndServe(":10000", nil))

// 	http.HandleFunc("/cityapi", returnCity) //pushing the cities json to cityapi

// 	http.HandleFunc("/vendorapi", returnVendor)
// 	log.Fatal(http.ListenAndServe(":10000", nil))
// }

// type search struct {
// 	ID       string `json:"ID"`
// 	Name     string `json: "Name"`
// 	Position string `json: "Position"`
// }

// type city struct {
// 	City_name string `json: "city_name"`
// 	City_id   int    `json: "city_id"`
// }

// type vendor struct {
// 	First_name string `json: "first_name"`
// 	Last_name  string `json: "last_name"`
// 	Phone      int    `json: "phn"`
// }

// var cities []city
// var items []search

// // var vend []vendor

// var id string
// var name string
// var pos string

// var city_id int
// var city_name string

// var f_name string
// var l_name string
// var phn int

// var vend_list = make([]*vendor, 0, 10)

// //json for customer/vendor information

// func returnSearch(w http.ResponseWriter, r *http.Request) { //can be revamped to push customer/vendor info

// 	fmt.Println("Returning the user search criteria:")
// 	json.NewEncoder(w).Encode(items)

// }

// //json for city information

// func returnCity(w http.ResponseWriter, r *http.Request) {

// 	fmt.Println("Returning the city search criteria:")
// 	json.NewEncoder(w).Encode(cities)

// }

// func returnVendor(w http.ResponseWriter, r *http.Request) {

// 	fmt.Println("Returning the vendor search criteria:")
// 	json.NewEncoder(w).Encode(vend_list)

// }

// func main() {
// 	os.Remove("sqlite-database.db") // I delete the file to avoid duplicated records.

// 	log.Println("Creating sqlite-database.db...")
// 	file, err := os.Create("sqlite-database.db") // Create SQLite file
// 	if err != nil {
// 		log.Fatal(err.Error())
// 	}
// 	file.Close()
// 	log.Println("sqlite-database.db created")

// 	sqliteDatabase, _ := sql.Open("sqlite3", "./sqlite-database.db") // Open the created SQLite File
// 	defer sqliteDatabase.Close()                                     // Defer Closing the database
// 	createTable(sqliteDatabase)                                      // Create Database Tables

// 	createCity(sqliteDatabase)
// 	insertCity(sqliteDatabase, "Gainesville")
// 	createVendor(sqliteDatabase)
// 	insertVendor(sqliteDatabase, "Aaron", "Smith", 3524513872, "asmith@gmail.com", "plumbing", "carpentry", "electrical")
// 	insertVendor(sqliteDatabase, "John", "Doe", 3525555555, "jdoe@gmail.com", "plumbing", "", "")

// 	// INSERT RECORDS
// 	insertStudent(sqliteDatabase, "0001", "Liana Kim", "Bachelor")
// 	insertStudent(sqliteDatabase, "0002", "Glen Rangel", "Bachelor")
// 	insertStudent(sqliteDatabase, "0003", "Martin Martins", "Master")
// 	insertStudent(sqliteDatabase, "0004", "Alayna Armitage", "PHD")
// 	insertStudent(sqliteDatabase, "0005", "Marni Benson", "Bachelor")
// 	insertStudent(sqliteDatabase, "0006", "Derrick Griffiths", "Master")
// 	insertStudent(sqliteDatabase, "0007", "Leigh Daly", "Bachelor")
// 	insertStudent(sqliteDatabase, "0008", "Marni Benson", "PHD")
// 	insertStudent(sqliteDatabase, "0009", "Klay Correa", "Bachelor")

// 	// DISPLAY INSERTED RECORDS
// 	displayStudents(sqliteDatabase)

// 	//printing city
// 	displayCity(sqliteDatabase)

// 	//printing vendor details
// 	displayVendor(sqliteDatabase)

// 	items = []search{
// 		{ID: id, Name: name, Position: pos},
// 	}

// 	cities = []city{
// 		{City_id: city_id, City_name: city_name},
// 	}

// 	handleRequests()
// }

// func createTable(db *sql.DB) {
// 	createStudentTableSQL := `CREATE TABLE student (
// 		"idStudent" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
// 		"code" TEXT,
// 		"name" TEXT,
// 		"program" TEXT
// 	  );` // SQL Statement for Create Table

// 	log.Println("Create student table...")
// 	statement, err := db.Prepare(createStudentTableSQL) // Prepare SQL Statement
// 	if err != nil {
// 		log.Fatal(err.Error())
// 	}
// 	statement.Exec() // Execute SQL Statements
// 	log.Println("student table created")
// }

// // We are passing db reference connection from main to our method with other parameters
// func insertStudent(db *sql.DB, code string, name string, program string) {
// 	log.Println("Inserting student record ...")
// 	insertStudentSQL := `INSERT INTO student(code, name, program) VALUES (?, ?, ?)`
// 	statement, err := db.Prepare(insertStudentSQL) // Prepare statement.
// 	// This is good to avoid SQL injections
// 	if err != nil {
// 		log.Fatalln(err.Error())
// 	}
// 	_, err = statement.Exec(code, name, program)
// 	if err != nil {
// 		log.Fatalln(err.Error())
// 	}
// }

// func createCity(db *sql.DB) {
// 	createCityTableSQL := `CREATE TABLE city (
// 		"city_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
// 		"city_name" TEXT
// 	  );` // SQL Statement for Create Table

// 	log.Println("Create city table...")
// 	statement, err := db.Prepare(createCityTableSQL) // Prepare SQL Statement
// 	if err != nil {
// 		log.Fatal(err.Error())
// 	}
// 	statement.Exec() // Execute SQL Statements
// 	log.Println("city table created")
// }

// func createVendor(db *sql.DB) {
// 	createVendorTableSQL := `CREATE TABLE vendor (
// 		"first_name" TEXT NOT NULL,
// 		"last_name" TEXT,
// 		"phone" integer,
// 		"email" TEXT,
// 		"service_1" TEXT,
// 		"service_2" TEXT,
// 		"service_3" TEXT
// 	  );` // SQL Statement for Create Table

// 	log.Println("Create vendor table...")
// 	statement, err := db.Prepare(createVendorTableSQL) // Prepare SQL Statement
// 	if err != nil {
// 		log.Fatal(err.Error())
// 	}
// 	statement.Exec() // Execute SQL Statements
// 	log.Println("Vendor table created")
// }

// // We are passing db reference connection from main to our method with other parameters
// func insertCity(db *sql.DB, city_name string) {
// 	log.Println("Inserting city record ...")
// 	insertCitySQL := `INSERT INTO city(city_name) VALUES (?)`
// 	statement, err := db.Prepare(insertCitySQL) // Prepare statement.
// 	// This is good to avoid SQL injections
// 	if err != nil {
// 		log.Fatalln(err.Error())
// 	}
// 	_, err = statement.Exec(city_name)
// 	if err != nil {
// 		log.Fatalln(err.Error())
// 	}
// }

// func insertVendor(db *sql.DB, first_name string, last_name string, phone int, email string, service_1 string, service_2 string, service_3 string) {
// 	log.Println("Inserting vendor record ...")
// 	insertVendorSQL := `INSERT INTO vendor(first_name, last_name, phone, email,service_1, service_2, service_3) VALUES (?,?,?,?,?,?,?)`
// 	statement, err := db.Prepare(insertVendorSQL) // Prepare statement.
// 	// This is good to avoid SQL injections
// 	if err != nil {
// 		log.Fatalln(err.Error())
// 	}
// 	_, err = statement.Exec(first_name, last_name, phone, email, service_1, service_2, service_3)
// 	if err != nil {
// 		log.Fatalln(err.Error())
// 	}
// }

// func displayStudents(db *sql.DB) {

// 	sqlStmt := `SELECT code, name, program FROM student WHERE code = $1;`

// 	row := db.QueryRow(sqlStmt, "0002")
// 	switch err := row.Scan(&id, &name, &pos); err {
// 	case sql.ErrNoRows:
// 		fmt.Println("No rows")
// 	case nil:
// 		fmt.Println(id, name, pos)
// 	default:
// 		panic(err)
// 	}
// }

// func displayVendor(db *sql.DB) {

// 	sqlStmt := `SELECT first_name, last_name, phone FROM vendor WHERE service_1 = $1 ;`

// 	row, err := db.Query(sqlStmt, "plumbing")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer row.Close()
// 	for row.Next() { // Iterate and fetch the records from result cursor
// 		row.Scan(&f_name, &l_name, &phn)
// 		vend_list = append(vend_list, &vendor{f_name, l_name, phn})
// 		// vend = []vendor{
// 		// 	{First_name: f_name, Last_name: l_name, Phone: phn},
// 		// }
// 		fmt.Println(f_name, l_name, phn)
// 	}
// 	row.Close()
// }

// func displayCity(db *sql.DB) {

// 	sqlStmt := `SELECT city_ID, city_name FROM City WHERE city_ID = $1;`

// 	row := db.QueryRow(sqlStmt, "1")
// 	switch err := row.Scan(&city_id, &city_name); err {
// 	case sql.ErrNoRows:
// 		fmt.Println("No rows")
// 	case nil:
// 		fmt.Println(city_id, city_name)
// 	default:
// 		panic(err)
// 	}

// }
