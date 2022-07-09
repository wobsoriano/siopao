import { createRouter } from "radix3"
import type { RadixRouter } from "radix3"
import type { Serve } from "bun"

type Params = {
  params: Record<string, string>
}

export type ServeOptions = Omit<Serve, 'fetch'>

export class Siopao {
  router: RadixRouter

  constructor() {
    this.router = createRouter()
  }

  serve(request: Request) {
    const { pathname } = new URL(request.url)

    const matched = this.router.lookup(pathname)

    if (matched) {
      // @ts-ignore: Added params
      request.params = matched.params || {}
      return matched.handler(request) as Response
    }

    return new Response(`Cannot find any route matching ${request.url || '/'}`, {
      status: 404
    })
  }

  use(path: string, handler: (request: Request & Params) => Response) {
    this.router.insert(path, {
      handler
    })
  }

  listen(options: ServeOptions = {}) {
    return Bun.serve({
      ...options,
      fetch: (request) => this.serve(request)
    })
  }
}

export default Siopao
