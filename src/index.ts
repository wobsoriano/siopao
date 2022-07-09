import { createRouter } from "radix3"
import type { RadixRouter } from "radix3"

export class App {
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

    return new Response(`Cannot find any route matching ${request.url || '/'}`, {
      status: 400
    })
  }
}

export default App
