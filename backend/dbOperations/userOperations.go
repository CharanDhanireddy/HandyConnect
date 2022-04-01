package dbOperations

import (
	schema "handy/schema"
	"log"
	"handy/structTypes"

	dbConnection "handy/dbConnection"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

func InsertCustomer(customer schema.CustomerProfileSchema) (schema.CustomerProfileSchema, error) {
	log.Println("Inserting customer record ...")
	db := dbConnection.GetDbConnection()
	insertCustomerSQL := `INSERT INTO customer(first_name, last_name, city_id, phone, email, password) VALUES (?,?,?,?,?,?)`
	statement, err := db.Prepare(insertCustomerSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Println(err.Error())
	}

	result, err1 := statement.Exec(customer.FirstName, customer.LastName,
		customer.CityId, customer.Phone, customer.Email, customer.Password)
	if err1 != nil {
		log.Println(err1.Error())
		return customer, err1
	}
	customer_id, err2 := result.LastInsertId()
	if err2 != nil {
		log.Println(err2.Error())
		return customer, err2
	}
	customer.Id = int(customer_id)
	return customer, nil
}

func VerifyCustomerLogin(email string, password string) (structTypes.Cust, bool, error){
	log.Println("verifying customer record ...")
	db := dbConnection.GetDbConnection()
	var customer_id int
	var f_name string
	var l_name string
	var city_name string
	var city_id int
	var phn int

	var cust_data structTypes.Cust

	sqlStmt := `SELECT c.id, c.first_name, c.last_name, city.city_name, c.city_id, c.phone FROM customer AS C JOIN city AS city ON c.city_id = city.id WHERE c.email = $1 AND c.password = $2;`

	row, err := db.Query(sqlStmt, email, password)
	if err != nil {
		log.Printf("Verify customer data DB error: %v", err)
		return cust_data, false, err
	}
	defer row.Close()
	
	if !row.Next() {
		return cust_data, false, nil
	}
	row.Scan(&customer_id, &f_name, &l_name, &city_name, &city_id, &phn)
	cust_data = structTypes.Cust{customer_id, f_name, l_name, city_name, city_id, phn, email}
	row.Close()

	return cust_data, true, nil
}

func InsertVendor(vendor schema.VendorProfileSchema) (schema.VendorProfileSchema, error) {
	log.Println("Inserting vendor record ...")
	db := dbConnection.GetDbConnection()
	insertVendorSQL := `INSERT INTO vendor (first_name, last_name, city_id, phone, email, password, service1_id, service2_id, service3_id) VALUES (?,?,?,?,?,?,?,?,?)`
	statement, err := db.Prepare(insertVendorSQL)
	if err != nil {
		log.Println(err.Error())
	}
	result, err1 := statement.Exec(vendor.FirstName, vendor.LastName, vendor.CityId, vendor.Phone,
		vendor.Email, vendor.Password, vendor.Service1Id, vendor.Service2Id, vendor.Service3Id)
		if err1 != nil {
			log.Println(err1.Error())
			return vendor, err1
		}
		vendor_id, err2 := result.LastInsertId()
		if err2 != nil {
			log.Println(err2.Error())
			return vendor, err2
		}
		vendor.Id = int(vendor_id)
		return vendor, nil
}

func VerifyVendorLogin(email string, password string) (structTypes.Vendor, bool, error){
	log.Println("verifying customer record ...")
	db := dbConnection.GetDbConnection()
	var vendor_id int
	var f_name string
	var l_name string
	var city string
	var phn int
	var service1 string

	var vendor_data structTypes.Vendor

	sqlStmt := `SELECT v.id, v.first_name, v.last_name, city.city_name, v.phone, service.service_name  FROM vendor AS v JOIN city AS city ON v.city_id = city.id JOIN service ON service.id=v.service1_id WHERE v.email = $1 AND v.password = $2;`

	row, err := db.Query(sqlStmt, email, password)
	if err != nil {
		log.Printf("Verify vendor data DB error: %v", err)
		return vendor_data, false, err
	}
	defer row.Close()
	
	if !row.Next() {
		return vendor_data, false, nil
	}
	row.Scan(&vendor_id, &f_name, &l_name, &city, &phn, &service1)
	vendor_data = structTypes.Vendor{vendor_id, f_name, l_name, city, phn, email, service1}
	row.Close()

	return vendor_data, true, nil
}

func GetCustomerRating(customerId int) (int, int, int) {
	db := dbConnection.GetDbConnection()
	var id int
	var rating int
	var rating_count int

	sqlStmt := `SELECT id, rating, rating_count FROM customer WHERE id = $1;`

	row, err := db.Query(sqlStmt, customerId)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&id, &rating, &rating_count)
	}
	row.Close()

	return id, rating, rating_count
}

func GetVendorRating(vendorId int) (int, int, int) {
	db := dbConnection.GetDbConnection()
	var id int
	var rating int
	var rating_count int

	sqlStmt := `SELECT id, rating, rating_count FROM vendor WHERE id = $1;`

	row, err := db.Query(sqlStmt, vendorId)
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	for row.Next() { // Iterate and fetch the records from result cursor
		row.Scan(&id, &rating, &rating_count)
	}
	row.Close()

	return id, rating, rating_count
}