package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

var sqliteDatabase *sql.DB

func newDBConnection() {
	// os.Remove("sqlite-database.db") // I delete the file to avoid duplicated records.

	// log.Println("Creating sqlite-database.db...")
	// file, err := os.Create("sqlite-database.db") // Create SQLite file
	// if err != nil {
	// 	log.Fatal(err.Error())
	// }
	// file.Close()
	// log.Println("sqlite-database.db created")

	log.Println("Establishing connection to database...")
	db, err := sql.Open("sqlite3", "./sqlite-database.db?_foreign_keys=on") // Open the created SQLite File
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println("Successfully connected to database...")
	sqliteDatabase = db

	// defer sqliteDatabase.Close()                                    // Defer Closing the database

	// populateData(sqliteDatabase)
}

// func createCityTable(db *sql.DB) {
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
