# siopao

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
