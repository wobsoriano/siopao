import { createRouter } from "radix3"
import type { RadixRouter } from "radix3"

class App {
  router: RadixRouter

  constructor() {
    this.router = createRouter()
  }

  use(path: string, handler: () => Response) {
    this.router.insert(path, {
      handler
    })
  }

  fetch(request: Request) {
    const { pathname } = new URL(request.url)

    const result = this.router.lookup(pathname)

    if (result) {
      return result.handler() as Response
    }

    return new Response('Not found', {
      status: 400
    })
  }
}

// import Siopao from 'siopao'

const app = new App()

app.use('/ping', () => new Response('pong'))

app.use('/api/hello', () => {
  return Response.json({
    hello: 'world'
  })
})

app.use('/api/user/:name', () => {
  return Response.json({
    user: 'Robert'
  })
})

Bun.serve({
  port: 3000,
  fetch: (request) => app.fetch(request)
})
