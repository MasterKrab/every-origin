import { Context, helpers } from 'https://deno.land/x/oak@v10.6.0/mod.ts'

const getTargetUrl = (context: Context) => {
  const headerTargetUrl = context.request.headers.get('target-url')

  if (headerTargetUrl) return headerTargetUrl

  const queryTargetUrl = helpers.getQuery(context).url

  if (queryTargetUrl) return decodeURIComponent(queryTargetUrl)

  return null
}

export default getTargetUrl
