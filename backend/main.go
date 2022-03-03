package main

import (
	dbConnection "handy/dbConnection"
	_ "handy/docs"
	"handy/router"
	"log"

	// swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

// @title HandyConnect API documentation
// @version 1.0.0
// @host localhost:10000
// @BasePath /

func main() {
	log.Println("Handy Connect server starting....")

	dbConnection.NewDBConnection()

	r := router.SetupRouter()

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":10000")
}
