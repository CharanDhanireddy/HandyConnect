import {
  createServer, Model
} from 'miragejs'
import { DEV_MOCK_SERVER_BASE_URL } from './env_setup'
import floridaCities from './Constants/FloridaCities'
import services from './Constants/Services'

const defaultData = {
  email: 'u1@gmail.com'
}

export function makeServer({ environment = 'test' }) {
  return createServer({
    models: {
      user: Model,
      vendor: Model,
      city: Model,
      service: Model,
      timeslot: Model,
      booking: Model
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

      server.create('booking', { userId: 4, service: 'Electrician', city: 'Orlando', vendor: 'Barry Allen', timeslot: { time: '2/12/2022' } })
      server.create('booking', { userId: 4, service: 'Carpenter', city: 'Orlando', vendor: 'Bruce Wayne', timeslot: { time: '2/11/2022' } })
      server.create('booking', { userId: 2, service: 'Electrician', city: 'Orlando', vendor: 'Barry Allen', timeslot: { time: '2/12/2022' } })
      server.create('booking', { userId: 2, service: 'Carpenter', city: 'Orlando', vendor: 'Bruce Wayne', timeslot: { time: '2/11/2022' } })
      server.create('booking', { userId: 3, service: 'Electrician', city: 'Orlando', vendor: 'Barry Allen', timeslot: { time: '2/12/2022' } })
      server.create('booking', { userId: 1, service: 'Carpenter', city: 'Orlando', vendor: 'Bruce Wayne', timeslot: { time: '2/11/2022' } })

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

      this.get('profile', (schema, request) => {
        let { password, ...user } = schema.users.findBy({ id: request.queryParams.id }).attrs
        return user
      })

      this.get('bookings', (schema, request) => {
        return schema.bookings.where({ userId: request.queryParams.userId })
      })

      this.get('cities', (schema, request) => {
        return schema.db.cities
      })

      this.get('services', (schema, request) => {
        return schema.db.services
      })

      this.get('availability', (schema, request) => {
        return schema.timeslots.all()
      })
    },
  })
}