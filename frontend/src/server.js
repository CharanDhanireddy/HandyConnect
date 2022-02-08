import { createServer, Model } from 'miragejs'
import floridaCities from './Constants/FloridaCities'
import services from './Constants/Services'

createServer({
  models: {
    user: Model,
    vendor: Model,
    city: Model,
    service: Model,
    timeslot: Model,
    booking: Model
  },
  seeds(server) {
    server.create('user', { firstName: 'u', lastName: '1', city: 'Miami', phone: '123456789', email: 'u1@gmail.com', password: 'pwd12345' })
    server.create('user', { firstName: 'u', lastName: '2', city: 'Miami', phone: '123456789', email: 'u2@gmail.com', password: 'pwd12345' })
    server.create('user', { firstName: 'u', lastName: '3', city: 'Miami', phone: '123456789', email: 'u3@gmail.com', password: 'pwd12345' })
    server.create('user', { firstName: 'Aaron', lastName: 'Smith', city: 'Orlando', phone: '123456789', email: 'aaronsmith@gmail.com', password: 'pwd12345' })

    server.create('vendor', { firstName: 'Bruce', lastName: 'Wayne', service: 'Carpenter', city: 'Gainesville', email: 'bw@gmail.com', password: 'pwd1235' })
    server.create('vendor', { firstName: 'Barry', lastName: 'Allen', service: 'Electrician', city: 'Orlando', email: 'ba@gmail.com', password: 'pwd12345' })

    server.create('timeslot', { time: '2/5/2022' })
    server.create('timeslot', { time: '2/6/2022' })
    server.create('timeslot', { time: '2/7/2022' })
    server.create('timeslot', { time: '2/8/2022' })
    server.create('timeslot', { time: '2/9/2022' })
    server.create('timeslot', { time: '2/10/2022' })

    server.create('booking', { userId: 4, service: 'Electrician', city: 'Orlando', vendor: 'Barry Allen', timeslot: { time: '2/12/2022' } })
    server.create('booking', { userId: 4, service: 'Carpenter', city: 'Orlando', vendor: 'Bruce Wayne', timeslot: { time: '2/11/2022' } })
    server.create('booking', { userId: 2, service: 'Electrician', city: 'Orlando', vendor: 'Barry Allen', timeslot: { time: '2/12/2022' } })
    server.create('booking', { userId: 2, service: 'Carpenter', city: 'Orlando', vendor: 'Bruce Wayne', timeslot: { time: '2/11/2022' } })
    server.create('booking', { userId: 3, service: 'Electrician', city: 'Orlando', vendor: 'Barry Allen', timeslot: { time: '2/12/2022' } })
    server.create('booking', { userId: 1, service: 'Carpenter', city: 'Orlando', vendor: 'Bruce Wayne', timeslot: { time: '2/11/2022' } })

    floridaCities.forEach(city => server.create('city', { name: city }))
    services.forEach(service => server.create('service', { name: service }))
  },
  routes() {
    this.urlPrefix = 'http://localhost:5000'

    this.post('/user/signup', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      return schema.users.create(attrs)
    })

    this.post('/user/login', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      let user = schema.users.findBy({ email: attrs.email });
      return user
    })

    this.post('/vendor/signup', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      return schema.vendors.create(attrs)
    })

    this.post('/vendor/login', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      let vendor = schema.vendors.findBy({ email: attrs.email });
      return vendor
    })

    this.get('/profile', (schema, request) => {
      let { password, ...user } = schema.users.findBy({ id: request.queryParams.id }).attrs
      return user
    })

    this.get('/bookings', (schema, request) => {
      return schema.bookings.where({ userId: request.queryParams.userId })
    })

    this.get('/city', (schema, request) => {
      return schema.cities.all()
    })

    this.get('/service', (schema, request) => {
      return schema.services.all()
    })

    this.get('/availability', (schema, request) => {
      return schema.timeslots.all()
    })
  },
})