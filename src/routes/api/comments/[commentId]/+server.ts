import type { RequestHandler } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const res = await fetch(`${PUBLIC_API_HOST}/comments/${params.commentId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${locals.user.token}`
    }
  })

  return new Response(JSON.stringify({status: res.status}))
};
