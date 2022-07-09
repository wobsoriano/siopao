import { App } from './src'

const app = new App()

app.use('/ping', () => new Response('pong'))

// Named route
app.use('/path/:name', (request) => {
  return Response.json({
    name: request.params.name
  })
})

// Wildcard route
app.use('/path/foo/**', (request) => {
  return Response.json({
    name: request.params
  })
})

Bun.serve({
  port: 3000,
  fetch: (request) => app.fetch(request)
})
