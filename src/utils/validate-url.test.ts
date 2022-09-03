import { assertEquals } from 'https://deno.land/std@0.154.0/testing/asserts.ts'
import validateUrl from './validate-url.ts'

Deno.test('should return true if url is valid', () => {
  assertEquals(
    validateUrl('https://jsonplaceholder.typicode.com/posts/1'),
    true
  )
})

Deno.test('should return false if url is invalid', () => {
  assertEquals(validateUrl('invalid'), false)
})

Deno.test('should return false if url is empty', () => {
  assertEquals(validateUrl(''), false)
})
