package structTypes

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RatingRequest struct {
	BookingId int `json:"booking_id"`
	Rating    int `json:"rating"`
}
