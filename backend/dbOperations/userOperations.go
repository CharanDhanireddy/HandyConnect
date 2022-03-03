package dbOperations

import (
	schema "handy/schema"
	"log"

	dbConnection "handy/dbConnection"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func InsertCustomer(customer schema.CustomerProfileSchema) {
	log.Println("Inserting customer record ...")
	db := dbConnection.GetDbConnection()
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

func InsertVendor(vendor schema.VendorProfileSchema) {
	log.Println("Inserting vendor record ...")
	db := dbConnection.GetDbConnection()
	insertVendorSQL := `INSERT INTO vendor (first_name, last_name, city_id, phone, email, password, service1_id, service2_id, service3_id) VALUES (?,?,?,?,?,?,?,?,?)`
	statement, err := db.Prepare(insertVendorSQL)
	if err != nil {
		log.Println(err.Error())
	}
	_, err = statement.Exec(vendor.FirstName, vendor.LastName, vendor.CityId, vendor.Phone,
		vendor.Email, vendor.Password, vendor.Service1Id, vendor.Service2Id, vendor.Service3Id)
	if err != nil {
		log.Println(err.Error())
	}
}
