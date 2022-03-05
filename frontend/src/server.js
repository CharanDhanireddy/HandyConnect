import {
  createServer, Model
} from 'miragejs'
import { DEV_MOCK_SERVER_BASE_URL } from './env_setup'
import floridaCities from './Constants/FloridaCities'
import services from './Constants/Services'

const defaultData = {
  email: 'u1@gmail.com'
}

export function makeServer() {
  return createServer({
    models: {
      user: Model,
      vendor: Model,
      city: Model,
      service: Model,
      timeslot: Model,
      booking: Model,
      availability: Model
    },
    seeds(server) {
      server.create('user', { first_name: 'u', last_name: '1', city_name: 'Miami', phone: '123456789', email: 'u1@gmail.com', password: 'pwd12345', city_id: 1 })
      server.create('user', { first_name: 'u', last_name: '2', city_name: 'Miami', phone: '123456789', email: 'u2@gmail.com', password: 'pwd12345', city_id: 1 })
      server.create('user', { first_name: 'u', last_name: '3', city_name: 'Miami', phone: '123456789', email: 'u3@gmail.com', password: 'pwd12345', city_id: 1 })
      server.create('user', { first_name: 'Aaron', last_name: 'Smith', city_name: 'Orlando', phone: '123456789', email: 'aaronsmith@gmail.com', password: 'pwd12345', city_id: 3 })

      server.create('vendor', { first_name: 'Bruce', last_name: 'Wayne', service: 'Carpenter', city_name: 'Miami', email: 'bw@gmail.com', password: 'pwd1235', city_id: 1 })
      server.create('vendor', { first_name: 'Barry', last_name: 'Allen', service: 'Electrician', city_name: 'Orlando', email: 'ba@gmail.com', password: 'pwd12345', city_id: 3 })

      server.create('timeslot', { time: '2/5/2022' })
      server.create('timeslot', { time: '2/6/2022' })
      server.create('timeslot', { time: '2/7/2022' })
      server.create('timeslot', { time: '2/8/2022' })
      server.create('timeslot', { time: '2/9/2022' })
      server.create('timeslot', { time: '2/10/2022' })

      server.create('booking', { customer_id: 4, service_name: 'Electrician', city_name: 'Orlando', vendor_name: 'Barry Allen', day: 2, month: 3, year: 2022, address: '221B Baker Street Orlando 45324' })
      server.create('booking', { customer_id: 4, service_name: 'Carpenter', city_name: 'Orlando', vendor_name: 'Bruce Wayne', day: 2, month: 3, year: 2022, address: '4000 SW 27 Blvd Orlando 45332' })
      server.create('booking', { customer_id: 2, service_name: 'Electrician', city_name: 'Orlando', vendor_name: 'Barry Allen', day: 2, month: 3, year: 2022, address: '221B Baker Street Orlando 45324' })
      server.create('booking', { customer_id: 2, service_name: 'Carpenter', city_name: 'Orlando', vendor_name: 'Bruce Wayne', day: 2, month: 3, year: 2022, address: '4000 SW 27 Blvd Orlando 45332' })
      server.create('booking', { customer_id: 3, service_name: 'Electrician', city_name: 'Orlando', vendor_name: 'Barry Allen', day: 2, month: 3, year: 2022, address: '221B Baker Street Orlando 45324' })
      server.create('booking', { customer_id: 1, service_name: 'Carpenter', city_name: 'Orlando', vendor_name: 'Bruce Wayne', day: 2, month: 3, year: 2022, address: '221B Baker Street Orlando 45324' })

      server.create('availability', { day: 5, month: 3, year: 2022 })
      server.create('availability', { day: 6, month: 3, year: 2022 })
      server.create('availability', { day: 7, month: 3, year: 2022 })
      server.create('availability', { day: 8, month: 3, year: 2022 })
      server.create('availability', { day: 9, month: 3, year: 2022 })
      server.create('availability', { day: 10, month: 3, year: 2022 })

      floridaCities.forEach((city, key) => server.create('city', { city_name: city, city_id: key }))
      services.forEach((service, key) => server.create('service', { service_name: service, service_id: key }))
    },
    routes() {
      this.urlPrefix = DEV_MOCK_SERVER_BASE_URL

      this.post('customerSignUp', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.db.users.findBy({ email: defaultData.email })

      })

      this.post('customerLogin', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        // let user = schema.users.findBy({ email: attrs.email });
        // return user
        return schema.db.users.findBy({ email: defaultData.email })
      })

      this.post('vendor/signup', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.vendors.create(attrs)
      })

      this.post('vendor/login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let vendor = schema.vendors.findBy({ email: attrs.email });
        return vendor
      })

      this.get('customer', (schema, request) => {
        // let { password, ...user } = schema.users.findBy({ id: request.queryParams.customer_id }).attrs
        // return user
        return schema.db.users.findBy({ email: defaultData.email })
      })

      this.get('customerbooking', (schema, request) => {
        return schema.db.bookings.where({ customer_id: request.queryParams.customer_id })
      })

      this.get('cities', (schema, request) => {
        return schema.db.cities
      })

      this.get('services', (schema, request) => {
        return schema.db.services
      })

      this.get('availability', (schema, request) => {
        return schema.db.availabilities
      })

      this.post('booking', (schema, request) => {
        return {}
      })
    },
  })
}