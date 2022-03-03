package main

import (
	dbConnection "handy/dbConnection"
	"log"
)

// "database/sql"
// "encoding/json"
// "fmt"
// "log"
// "net/http"

// _ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library

func main() {
	log.Println("Handy Connect server starting....")

	dbConnection.NewDBConnection()

	handleRequests()
}
