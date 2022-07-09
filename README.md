# siopao

[![npm (tag)](https://img.shields.io/npm/v/siopao?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/siopao) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/siopao?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/siopao?style=flat&colorA=000000&colorB=000000)

A minimal HTTP routing library for Bun based on [Radix Tree](https://github.com/unjs/radix3).

## Installation

```bash
bun add siopao
```

## Usage

```ts
import { App } from 'siopao'

const app = new App()

app.use('/ping', () => new Response('pong'))

app.use('/api/hello', () => {
  return Response.json({
    hello: 'world'
  })
})

Bun.serve({
  port: 3000,
  fetch: (request) => app.fetch(request)
})
```

## License

MIT
