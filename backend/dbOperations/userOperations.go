package dbOperations

import (
	"database/sql"
	"log"

	schema "handy/schema"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func InsertCustomer(db *sql.DB, customer schema.CustomerProfileSchema) {
	log.Println("Inserting customer record ...")
	insertCustomerSQL := `INSERT INTO customer(first_name, last_name, city_id, phone, email, password) VALUES (?,?,?,?,?,?)`
	statement, err := db.Prepare(insertCustomerSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
	}
	_, err = statement.Exec(customer.FirstName, customer.LastName,
		customer.CityId, customer.Phone, customer.Email, customer.Password)
	if err != nil {
		log.Println(err.Error())
	}
}

func InsertVendor(db *sql.DB, vendor schema.VendorProfileSchema) {
	log.Println("Inserting vendor record ...")
	// fk_enable := `PRAGMA foreign_keys = ON`
	insertVendorSQL := `INSERT INTO vendor (first_name, last_name, city_id, phone, email, password, service1_id, service2_id, service3_id) VALUES (?,?,?,?,?,?,?,?,?)`
	// fk, err := db.Prepare(fk_enable)
	statement, err := db.Prepare(insertVendorSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
	}
	// _, err = fk.Exec()
	// if err != nil {
	// 	log.Println(err.Error())
	// }
	_, err = statement.Exec(vendor.FirstName, vendor.LastName, vendor.CityId, vendor.Phone,
		vendor.Email, vendor.Password, vendor.Service1Id, vendor.Service2Id, vendor.Service3Id)
	if err != nil {
		log.Println(err.Error())
	}
}
