import type {
  ServeOptions,
  TLSServeOptions,
  TLSWebSocketServeOptions,
  UnixServeOptions,
  UnixTLSServeOptions,
  UnixTLSWebSocketServeOptions,
  UnixWebSocketServeOptions, 
  WebSocketServeOptions
} from 'bun'

type OmitFetch<T> = Omit<T, 'fetch'>;

export type ServeWithoutFetch<WebSocketDataType = undefined> =
  | OmitFetch<ServeOptions>
  | TLSServeOptions
  | OmitFetch<UnixServeOptions>
  | UnixTLSServeOptions
  | OmitFetch<WebSocketServeOptions<WebSocketDataType>>
  | TLSWebSocketServeOptions<WebSocketDataType>
  | OmitFetch<UnixWebSocketServeOptions<WebSocketDataType>>
  | UnixTLSWebSocketServeOptions<WebSocketDataType>;

type ParamsFromUrl<T extends string> = T extends `${string}/:${infer Param}/${infer Rest}`
  ? Param | ParamsFromUrl<`/${Rest}`>
  : T extends `${string}/:${infer Param}`
  ? Param
  : never;

export interface SiopaoRequest<T extends string = ''> extends Request {
  params?: Record<ParamsFromUrl<T>, string>
}

export type Handler<T extends string> = (request: SiopaoRequest<T>) => Response | Promise<Response>

export type HTTPMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE'
