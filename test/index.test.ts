import type { Server } from "bun"
import { describe, expect, it } from "bun:test"
import Siopao from '../src'

const app = new Siopao()
app.get('/ping', () => new Response('pong'))

describe('Siopao', () => {
  it('returns 200 status and data', async () => {
    let server: Server
    try {
      server = app.serve()
      const response = await fetch('http://localhost:3000/ping')
      expect(response.status).toBe(200)
      expect(await response.text()).toBe('pong')
    } catch (e) {
      throw e
    } finally {
      server.stop()
    }
  })

  it('returns 404 status', async () => {
    let server: Server
    try {
      server = app.serve()
      const response = await fetch('http://localhost:3000/404')
      expect(response.status).toBe(404)
    } catch (e) {
      throw e
    } finally {
      server.stop()
    }
  })

  it('returns 405 status', async () => {
    let server: Server
    try {
      server = app.serve()
      const response = await fetch('http://localhost:3000/ping', { method: 'POST' })
      expect(response.status).toBe(405)
    } catch (e) {
      throw e
    } finally {
      server.stop()
    }
  })
})

