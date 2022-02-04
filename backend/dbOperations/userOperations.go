package dbOperations

import (
	"database/sql"
	"log"

	schema "handy/schema"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func InsertUser(db *sql.DB, user schema.UserProfileSchema) {
	log.Println("Inserting user record ...")
	insertVendorSQL := `INSERT INTO user(first_name, last_name, phone, email, password) VALUES (?,?,?,?,?)`
	statement, err := db.Prepare(insertVendorSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
	}
	log.Println(user)
	_, err = statement.Exec(user.FirstName, user.LastName, user.Phone, user.Email, user.Password)
	if err != nil {
		log.Println(err.Error())
	}
}
