import type { RequestHandler } from './$types'
import { PUBLIC_API_HOST } from '$env/static/public';

export const GET: RequestHandler = async () => {
  const res = await fetch(`${PUBLIC_API_HOST}/posts`)
  const data = await res.json()

  return new Response(JSON.stringify(data))
};
