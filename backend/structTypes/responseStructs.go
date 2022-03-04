package structTypes

type City struct {
	CityId   int    `json:"city_id"`
	CityName string `json:"city_name"`
}

type Date struct {
	Day   int `json:"day"`
	Month int `json:"month"`
	Year  int `json:"year"`
}

type Vendor struct {
	Id          int    `json:"id"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	City        string `json:"city_name"`
	Phone       int    `json:"phone"`
	Email       string `json:"email"`
	ServiceName string `json:"service_name"`
	// Service2   string `json: "service2"`
	// Service3   string `json: "service3"`
}

type Cust struct {
	Id        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	CityId    string `json:"city_id"`
	CityName  int    `json:"city_name"`
	Phone     int    `json:"phone"`
	Email     string `json:"email"`
}

type Service struct {
	ServiceId   int    `json:"service_id"`
	ServiceName string `json:"service_name"`
}

type Booking struct {
	Id           int    `json:"id"`
	VendorName   string `json:"vendor_name"`
	CustomerName string `json:"customer_name"`
	ServiceName  string `json:"service_name"`
	CityName     string `json:"city_name"`
	Day          int    `json:"day"`
	Month        int    `json:"month"`
	Year         int    `json:"year"`
	Address      string `json:"address"`
}
