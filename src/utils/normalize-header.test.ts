import { assertEquals } from 'https://deno.land/std@0.154.0/testing/asserts.ts'
import normalizeHeader from './normalize-header.ts'

Deno.test('should return normalized header', () => {
  const headers = new Headers({
    'response-type': 'json',
    'content-type': 'application/json',
    'target-url': 'https://jsonplaceholder.typicode.com/posts/1',
  })

  assertEquals(normalizeHeader(headers), {
    'response-type': 'json',
  })
})

Deno.test('should return normalized header with body', () => {
  const headers = new Headers({
    'content-type': 'application/json',
    'target-url': 'https://jsonplaceholder.typicode.com/posts/1',
    'content-length': '100',
  })

  assertEquals(normalizeHeader(headers, true), {
    'content-type': 'application/json',
    'content-length': '100',
  })
})
