import type { Serve } from 'bun'

export type ServeOptions = Omit<Serve, 'fetch'>

type ParamsFromUrl<T extends string> = T extends `${string}/:${infer Param}/${infer Rest}`
  ? Param | ParamsFromUrl<`/${Rest}`>
  : T extends `${string}/:${infer Param}`
  ? Param
  : never;

export interface SiopaoRequest<T extends string = ''> extends Request {
  params?: Record<ParamsFromUrl<T>, string>
}

export type Handler<T extends string> = (request: SiopaoRequest<T>) => Response

export type HTTPMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE'
