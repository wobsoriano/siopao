import { App } from './src'

const app = new App()

app.use('/ping', () => new Response('pong'))

app.use('/api/hello', () => {
  return Response.json({
    hello: 'world'
  })
})

app.use('/api/user/:name', (request) => {
  console.log(request.params)
  return Response.json({
    user: 'Robert'
  })
})

Bun.serve({
  port: 3000,
  fetch: (request) => app.fetch(request)
})
