# siopao

[![npm (tag)](https://img.shields.io/npm/v/siopao?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/siopao) ![NPM](https://img.shields.io/npm/l/siopao?style=flat&colorA=000000&colorB=000000)

A minimal HTTP routing library for Bun (or anything that provides a `Request` object) based on [Radix Tree](https://github.com/unjs/radix3).

## Installation

```bash
bun add siopao
```

## Usage

```ts
import { App } from 'siopao'

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
    params: request.params
  })
})

Bun.serve({
  port: 3000,
  fetch: (request) => app.fetch(request)
})
```

## License

MIT
