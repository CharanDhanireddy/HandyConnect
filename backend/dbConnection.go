package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func newDBConnection() {
	// os.Remove("sqlite-database.db") // I delete the file to avoid duplicated records.

	// log.Println("Creating sqlite-database.db...")
	// file, err := os.Create("sqlite-database.db") // Create SQLite file
	// if err != nil {
	// 	log.Fatal(err.Error())
	// }
	// file.Close()
	// log.Println("sqlite-database.db created")

	sqliteDatabase, _ := sql.Open("sqlite3", "./sqlite-database.db") // Open the created SQLite File
	defer sqliteDatabase.Close()                                     // Defer Closing the database
	// createTable(sqliteDatabase)                                      // Create Database Tables

	// createCityTable(sqliteDatabase)

	// createVendorTable(sqliteDatabase)

	// populateData(sqliteDatabase)
}

func createTable(db *sql.DB) {
	createStudentTableSQL := `CREATE TABLE student (
		"idStudent" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"code" TEXT,
		"name" TEXT,
		"program" TEXT		
	  );` // SQL Statement for Create Table

	log.Println("Create student table...")
	statement, err := db.Prepare(createStudentTableSQL) // Prepare SQL Statement
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec() // Execute SQL Statements
	log.Println("student table created")
}

func createCityTable(db *sql.DB) {
	createCityTableSQL := `CREATE TABLE city (
		"city_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"city_name" TEXT	
	  );` // SQL Statement for Create Table

	log.Println("Create city table...")
	statement, err := db.Prepare(createCityTableSQL) // Prepare SQL Statement
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec() // Execute SQL Statements
	log.Println("city table created")
}

func createVendorTable(db *sql.DB) {
	createVendorTableSQL := `CREATE TABLE vendor (
		"first_name" TEXT NOT NULL,
		"last_name" TEXT,
		"phone" integer,
		"email" TEXT,
		"service_1" TEXT,
		"service_2" TEXT,
		"service_3" TEXT
	  );` // SQL Statement for Create Table

	log.Println("Create vendor table...")
	statement, err := db.Prepare(createVendorTableSQL) // Prepare SQL Statement
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec() // Execute SQL Statements
	log.Println("Vendor table created")
}
