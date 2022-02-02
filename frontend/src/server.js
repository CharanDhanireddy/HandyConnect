import { createServer, Model } from 'miragejs'

createServer({
  models: {
    user: Model,
  },
  seeds(server) {
    server.create('user', { firstName: 'u', lastName: '1', email: 'u1@gmail.com', password: 'pwd1' })
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

  },
})