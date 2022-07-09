import Siopao from './src'

const app = new Siopao()

app.get('/ping', () => new Response('pong'))

// Named route
app.get('/path/:name', (request) => {
  return Response.json({
    name: request.params.name
  })
})

// Wildcard route
app.use('/path/foo/**', (request) => {
  return Response.json({
    params: request.params
  })
})

app.listen()
