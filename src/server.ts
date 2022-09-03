import { Application } from 'https://deno.land/x/oak@v10.6.0/mod.ts'
import proxy from './routes/proxy.ts'

const app = new Application()

app.use(proxy.routes())
app.use(proxy.allowedMethods())

app.use((context) => context.send({ root: `${Deno.cwd()}/public` }))

const port = 3000

app.addEventListener('error', (e) => {
  console.log('ERROR: ', e.error)
})

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`)
})

if (import.meta.main) await app.listen({ port })

export default app
