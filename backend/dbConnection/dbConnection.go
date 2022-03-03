package dbConnection

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

var sqliteDatabase *sql.DB

func NewDBConnection() *sql.DB {
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

	return db
}

func GetDbConnection() *sql.DB {
	return sqliteDatabase
}
