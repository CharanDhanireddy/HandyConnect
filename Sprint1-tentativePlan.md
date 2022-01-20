## Backend:

### APIs 

GET - Service list
GET - City list

POST - User SignUp
POST - User Login

POST - Vendor SignUp
POST - Vendor Login
GET - Service list
GET - City list

GET 
params: Select city
return: Service list

GET 
params: Service
return: Dates list

### User Booking Page

GET
params: UID
return: booking list

### Vendor Booking Page

GET
params: UID
return: booking list

### User Service booking

POST
params: city, service, date
return: confirmation with vendor details

---

## Frontend:

- Mocking Library for all the above APIs
- Bootstrap: UI elements Library (MaterialUI / Reactstrap)
- Bootstrap: Responsive design (without media queries) containers

---

## User stories:

As a user, I must be able to sign up and login for the website.

As a user, I can view and edit my profile.

As a user, I must be able to select the city where I want to reserve a service.

As a user, I must be able to view all the available services in the current city.

As a user, I must be able to view all the available days that I can book a service in my city and reserve by selecting one.

As a user, I must be able to view my reservations.

As a vendor, I must be able to sign up and login for the website.

As a vendor, I can view and edit my profile/skillset.

As a vendor, I must be able to view my reservations.
