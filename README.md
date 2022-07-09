# siopao

[![npm (tag)](https://img.shields.io/npm/v/siopao?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/siopao) ![NPM](https://img.shields.io/npm/l/siopao?style=flat&colorA=000000&colorB=000000)

A minimal HTTP routing library for [Bun](https://github.com/Jarred-Sumner/bun) based on [Radix Tree](https://github.com/unjs/radix3).

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
  return Response.json({
    params: request.params
  })
})

// Pass Bun.serve options here
app.serve({ port: 3000 })
```

## License

MIT
