package structTypes

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RatingRequest struct {
	BookingId int `json:"booking_id"`
	Rating    int `json:"rating"`
}

type BookingRescheduleRequest struct {
	BookingId int `json:"booking_id"`
	Day       int `json:"day"`
	Month     int `json:"month"`
	Year      int `json:"year"`
}

type UpdateStatus struct {
	Id  int `json:"id"`
	Otp int `json:"otp"`
}
