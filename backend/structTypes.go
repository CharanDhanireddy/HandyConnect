package main

type search struct {
	ID       string `json:"ID"`
	Name     string `json: "Name"`
	Position string `json: "Position"`
}

type City struct {
	City_id   int    `json: "city_id"`
	City_name string `json: "city_name"`
}

type vendor struct {
	First_name string `json: "first_name"`
	Last_name  string `json: "last_name"`
	City       string `json:"city_name"`
	Phone      int    `json: "phn"`
	Email      string `json: "email"`
	Service1   string `json: "service1"`
	// Service2   string `json: "service2"`
	// Service3   string `json: "service3"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Cust struct {
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	City       string `json:"city_name"`
	Phone      int    `json:"phn"`
	Email      string `json:"email"`
}
