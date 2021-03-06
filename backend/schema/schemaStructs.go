package schema

type CustomerProfileSchema struct {
	Id        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	CityId    int    `json:"city_id"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Rating string `json:"rating"`
	RatingCount string `json:"rating_count"`
}

type VendorProfileSchema struct {
	Id         int    `json:"id"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	CityId     int    `json:"city_id"`
	Phone      string `json:"phone"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Service1Id int    `json:"service1_id"`
	Service2Id int    `json:"service2_id"`
	Service3Id int    `json:"service3_id"`
	Rating string `json:"rating"`
	RatingCount string `json:"rating_count"`
}

type BookingSchema struct {
	Id             int    `json:"id"`
	VendorId       int    `json:"vendor_id"`
	CustomerId     int    `json:"customer_id"`
	ServiceId      int    `json:"service_id"`
	CityId         int    `json:"city_id"`
	Day            int    `json:"day"`
	Month          int    `json:"month"`
	Year           int    `json:"year"`
	Address        string `json:"address"`
	BookingStatus  string `json:"booking_status"`
	CustomerRating int    `json:"customer_rating"`
	VendorRating   int    `json:"vendor_rating"`
}

type ServiceSchema struct {
	Service_name string `json:"service_name"`
	Description  string `json:"description"`
	Time_taken   int    `json:"time"`
}
