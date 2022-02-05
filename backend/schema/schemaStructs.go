package schema

type CustomerProfileSchema struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	CityId    int    `json:"city_id"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type VendorProfileSchema struct {
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	CityId     int    `json:"city_id"`
	Phone      string `json:"phone"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Service1Id int    `json:"service1_id"`
	Service2Id int    `json:"service2_id"`
	Service3Id int    `json:"service3_id"`
}

type serviceSchema struct {
	Service_name string `json:"service_name"`
	Description  string `json:"Desc"`
	Time_taken   int    `json:"time"`
}
