package structTypes

type City struct {
	City_id   int    `json:"city_id"`
	City_name string `json:"city_name"`
}

type Date struct {
	Day   int `json:"day"`
	Month int `json:"month"`
	Year  int `json:"year"`
}

type Vendor struct {
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	City       string `json:"city_name"`
	Phone      int    `json:"phn"`
	Email      string `json:"email"`
	Service1   string `json:"service1"`
	// Service2   string `json: "service2"`
	// Service3   string `json: "service3"`
}

type Cust struct {
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
	City       string `json:"city_name"`
	Phone      int    `json:"phn"`
	Email      string `json:"email"`
}

type Service struct {
	Service_id   int    `json:"serv_id"`
	Service_name string `json:"serv_name"`
}
