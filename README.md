# siopao

[![npm (tag)](https://img.shields.io/npm/v/siopao?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/siopao) ![NPM](https://img.shields.io/npm/l/siopao?style=flat&colorA=000000&colorB=000000)

A minimal routing library designed to sit on top of [Bun](https://github.com/Jarred-Sumner/bun)'s [fast HTTP server](https://github.com/Jarred-Sumner/bun#bunserve---fast-http-server). Based on [Radix Tree](https://github.com/unjs/radix3).

Sio=Hot Pao=Bun

## Installation

```bash
bun add siopao
```

## Usage

```ts
import Siopao from 'siopao'

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
  return new Response('Wildcard route')
})

// Named Wildcard route
app.use('/path/foo/**:name', (request) => {
  return new Response('Named Wildcard route')
})

// Same as Bun.serve options but without the fetch option
app.serve({ port: 3000 })

// Callback style
app.serve({ port: 3000 }, () => {
  console.log('Listening on port 3000...')
})
```

If you have custom logic to add inside Bun's fetch option, you can use the `fetch` method instead:

```ts
const app = new Siopao()

app.get('/ping', () => new Response('pong'))

Bun.serve({
  port: 3000,
  fetch: (request) => {
    // Custom logic here

    return app.fetch(request)
  }
})
```

For a more complete web framework for the Bun runtime, see [Bao.js](https://github.com/mattreid1/baojs).

## License

MIT
