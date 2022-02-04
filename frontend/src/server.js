import { createServer, Model } from 'miragejs'
import floridaCities from './Constants/FloridaCities'
import services from './Constants/Services'

createServer({
  models: {
    user: Model,
    vendor: Model,
    city: Model,
    service: Model
  },
  seeds(server) {
    server.create('user', { firstName: 'u', lastName: '1', email: 'u1@gmail.com', password: 'pwd1' })
    server.create('user', { firstName: 'u', lastName: '2', email: 'u2@gmail.com', password: 'pwd2' })
    server.create('vendor', { firstName: 'v', lastName: '1', service: 'Carpenter', city: 'Gainesville', email: 'v1@gmail.com', password: 'pwd1' })
    server.create('vendor', { firstName: 'v', lastName: '2', service: 'Electrician', city: 'Miami Beach', email: 'v2@gmail.com', password: 'pwd2' })
    floridaCities.forEach(city => server.create('city', {name: city}))
    services.forEach(service => server.create('service', {name: service}))
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

    this.get('/city', (schema, request) => {
      return schema.cities.all()
    })

    this.get('/service', (schema, request) => {
      return schema.services.all()
    })  
  },
})