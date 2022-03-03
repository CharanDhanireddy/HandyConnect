# HandyConnect
Class project for CEN5035 - Software Engineering

## Project Idea:
Platform for connecting customers with skilled and experienced professionals providing services (handymen, salon, applaince repair, etc).

## Team Members:
| Name | Gatorlink Email |
| :--: | :--: |
| Sai Charan Reddy Dhanireddy | s.dhanireddy@ufl.edu |
| Venkata Shiva Reddy Manchala | manchala.v@ufl.edu |
| Venkat Dhavaleswarapu | vdhavaleswarapu@ufl.edu |
| Srikanth Rao Parcha | parcha.srikanthr@ufl.edu |

## Stack:
- Backend: Go Lang
- Frontend: ReactJS
- Database: SQLite

---

## Sprint 1:

### Frontend with mocked-up backend
[Frontend Demo video](https://youtu.be/5rjAeEBbr_4)

Tasks completed:

- Vendor can signup with vendor personal details along with selecting service and city
- Vendor/Customer can signup with name, email and password
- Vendor/Customer can login with email and password
- Customer can select a city before viewing avaliable services
- Customer can select a service to see available timeslots over a week
- Customer can select a timeslot and add their address to confirm the booking

---

### Backend with mocked-up frontend
[Backend Demo video](https://youtu.be/YhrciuviPqM)

Tasks completed: (APIs for the below functionality are implemented and tested using Postman (shown in video))

- Customer can sign up with name, email, phone, city, address
- Vendor can sign up with their name, email, phone, city, services provided
- Customer/Vendor can log into their account with their email and password (error handling for incorrect password implemented)
- Customer/Vendor can login and view their profiles to see the data they've used for signing up
- Customer can get a list of available timeslots for a specific service in a city of their choice
- Customer can schedule a slot based on the availability of the service in a 1 week period
