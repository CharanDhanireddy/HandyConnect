import { createServer, Model } from 'miragejs'
import floridaCities from './Constants/FloridaCities'
import services from './Constants/Services'

createServer({
  models: {
    user: Model,
    city: Model,
    service: Model
  },
  seeds(server) {
    server.create('user', { firstName: 'u', lastName: '1', email: 'u1@gmail.com', password: 'pwd1' })
    server.create('user', { firstName: 'u', lastName: '2', email: 'u2@gmail.com', password: 'pwd2' })
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
      debugger
      return user
    })

    this.get('/city', (schema, request) => {
      // let attrs = JSON.parse(request.requestBody)
      return schema.cities.all()
    })

    this.get('/service', (schema, request) => {
      // let attrs = JSON.parse(request.requestBody)
      return schema.services.all()
    })  
  },
})