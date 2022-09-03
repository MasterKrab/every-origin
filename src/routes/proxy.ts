import { Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts'
import getTargetUrl from '../utils/get-target-url.ts'
import validateUrl from '../utils/validate-url.ts'
import normalizeHeader from '../utils/normalize-header.ts'
import {
  viewEngine,
  oakAdapter,
  handlebarsEngine,
} from 'https://deno.land/x/view_engine@v10.6.0/mod.ts'

const router = new Router()

router.use(viewEngine(oakAdapter, handlebarsEngine))

router.all('/', async (context) => {
  const { request, response } = context
  const { method, headers } = request

  const targetUrl = getTargetUrl(context)

  if (!targetUrl)
    return context.render('templates/index.html', {
      appUrl: context.request.url.origin,
    })

  if (!validateUrl(targetUrl)) {
    response.status = 400
    response.body = 'Invalid url'
    return
  }

  try {
    const result = await fetch(targetUrl, {
      method,
      headers: normalizeHeader(headers, request.hasBody),
      body: request.hasBody ? request.body({ type: 'stream' }).value : null,
    })

    response.status = result.status
    response.headers = result.headers
    response.body = result.body
  } catch (_error) {
    response.status = 500
    response.body = 'There was an error processing your request'
  }
})

export default router
