import type { Serve } from "bun"

export type Params = {
  params: Record<string, string>
}

export type ServeOptions = Omit<Serve, 'fetch'>

export type Handler = (request: Request & Params) => Response

export type HTTPMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE'
