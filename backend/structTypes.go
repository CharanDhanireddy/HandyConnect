package main

type search struct {
	ID       string `json:"ID"`
	Name     string `json: "Name"`
	Position string `json: "Position"`
}

type city struct {
	City_id   int    `json: "city_id"`
	City_name string `json: "city_name"`
}

type vendor struct {
	First_name string `json: "first_name"`
	Last_name  string `json: "last_name"`
	Phone      int    `json: "phn"`
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserProfileSchema struct {
	FirstName string `json:first_name`
	LastName  string `json:last_name`
	Phone     string `json:phone`
	Username  string `json:"username"`
	Password  string `json:"password"`
}
