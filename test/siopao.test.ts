import type { Server } from 'bun'
import { describe, expect, it } from 'bun:test'
import { Siopao } from '../src'

const app = new Siopao()
app.get('/ping', () => new Response('pong'))

app.get('/slow-ping', async () => {
	await Bun.sleep(100)
	return new Response('poong')
});

describe('Siopao', () => {
  it('returns 200 status and data', async () => {
    let server: Server
    try {
      server = app.serve()
      const response = await fetch('http://0.0.0.0:3000/ping')
      expect(response.status).toBe(200)
      expect(await response.text()).toBe('pong')
    } catch (e) {
      throw e
    } finally {
      server.stop()
    }
  })

  it('returns 404 status with message', async () => {
    let server: Server
    try {
      server = app.serve()
      const response = await fetch('http://0.0.0.0:3000/404')
      expect(response.status).toBe(404)
      expect(await response.text()).toBe('Not Found')
    } catch (e) {
      throw e
    } finally {
      server.stop()
    }
  })

  it('returns 405 status with message', async () => {
    let server: Server
    try {
      server = app.serve()
      const response = await fetch('http://0.0.0.0:3000/ping', { method: 'POST' })
      expect(response.status).toBe(405)
      expect(await response.text()).toBe('Method Not Allowed')
    } catch (e) {
      throw e
    } finally {
      server.stop()
    }
  })
})

