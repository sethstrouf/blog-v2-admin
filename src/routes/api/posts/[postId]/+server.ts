import type { RequestHandler } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const GET: RequestHandler = async ({ params }) => {
  const res = await fetch(`${PUBLIC_API_HOST}/posts/${params.postId}`)
  const data = await res.json()

  return new Response(JSON.stringify(data))
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const res = await fetch(`${PUBLIC_API_HOST}/posts/${params.postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${locals.user.token}`
    }
  })

  return new Response(JSON.stringify({status: res.status}))
};
