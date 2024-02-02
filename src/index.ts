import { createRouter } from 'radix3'
import type { RadixRouter } from 'radix3'
import type { Handler, HTTPMethod, ServeOptions, SiopaoRequest } from './types'
import type { Server } from 'bun'
import { serve } from 'bun'

export class Siopao {
  router: RadixRouter<{
    method: HTTPMethod | 'ALL'
    handler: (request: SiopaoRequest) => Response | Promise<Response>
  }>

  constructor() {
    this.router = createRouter()
  }

  fetch(request: SiopaoRequest) {
    const { pathname } = new URL(request.url)

    const matched = this.router.lookup(pathname)

    if (!matched) {
      return new Response('Not Found', {
        status: 404
      })
    }

    const methodMatched = (matched.method === request.method) || matched.method === 'ALL'
    if (!methodMatched) {
      return new Response('Method Not Allowed', {
        status: 405
      })
    }

    request.params = matched.params || {}
    return matched.handler(request)
  }

  use<T extends string>(path: T, handler: Handler<T>, method?: HTTPMethod) {
    this.router.insert(path, {
      handler,
      method: method || 'ALL'
    })
  }

  get<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'GET')
  }

  post<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'POST')
  }

  put<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'PUT')
  }

  patch<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'PATCH')
  }

  delete<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'DELETE')
  }

  /**
   * @param options Bun server options
   * @param cb Server callback after server starts listening
   */
  serve(options: ServeOptions = {}, cb?: (server: Server) => void) {
    const server = serve({
      ...options,
      fetch: (request) => this.fetch(request),
    })

    cb?.(server)

    return server
  }
}

export default Siopao
