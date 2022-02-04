package main

import "log"

// "database/sql"
// "encoding/json"
// "fmt"
// "log"
// "net/http"

// _ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library

var cities []city
var items []search

var id string
var name string
var pos string

var city_id int
var city_name string

var f_name string
var l_name string
var phn int

var vend_list []vendor

func main() {
	log.Println("Handy Connect server starting....")

	newDBConnection()

	items = []search{
		{ID: id, Name: name, Position: pos},
	}

	cities = []city{
		{City_id: city_id, City_name: city_name},
	}

	handleRequests()
}
