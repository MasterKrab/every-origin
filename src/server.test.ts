import { superoak } from 'https://deno.land/x/superoak@4.7.0/mod.ts'
import app from './server.ts'

Deno.test('should return homepage', async () => {
  const request = await superoak(app)
  await request
    .get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
})

Deno.test('should return favicon', async () => {
  const request = await superoak(app)
  await request
    .get('/favicon.svg')
    .expect(200)
    .expect('Content-Type', 'image/svg+xml')
})

Deno.test('should allow requests with url query param', async () => {
  const request = await superoak(app)
  await request
    .get('/?url=https://jsonplaceholder.typicode.com/posts/1')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})

Deno.test(
  "should allow requests with url query param and url with url's query params",
  async () => {
    const request = await superoak(app)
    await request
      .get('/?url=https://jsonplaceholder.typicode.com/posts/1?userId=1')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect({
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      })
  }
)

Deno.test('should allow requests with target-url header', async () => {
  const request = await superoak(app)
  await request
    .get('/')
    .set('target-url', 'https://jsonplaceholder.typicode.com/posts/1')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})

Deno.test('should return 400 if url is invalid', async () => {
  const request = await superoak(app)
  await request
    .get('/?url=invalid')
    .expect(400)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect('Invalid url')
})

Deno.test('should allow GET method', async () => {
  const request = await superoak(app)
  await request
    .get('/?url=https://jsonplaceholder.typicode.com/posts/1')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect({
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    })
})

Deno.test('should allow POST method', async () => {
  const request = await superoak(app)
  await request
    .post('/?url=https://jsonplaceholder.typicode.com/todos')
    .send({ title: 'foo', body: 'bar' })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect({ title: 'foo', body: 'bar', id: 201 })
})

Deno.test('should allow PUT method', async () => {
  const request = await superoak(app)
  await request
    .put('/?url=https://jsonplaceholder.typicode.com/todos/1')
    .send({ title: 'foo', completed: false })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect({ title: 'foo', completed: false, id: 1 })
})

Deno.test('should allow DELETE method', async () => {
  const request = await superoak(app)
  await request
    .delete('/?url=https://jsonplaceholder.typicode.com/todos/1')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})
