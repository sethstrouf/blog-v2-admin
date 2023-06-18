import type { RequestHandler } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const DELETE: RequestHandler = async ({ params }) => {
  await fetch(`${PUBLIC_API_HOST}/comments/${params.commentId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
  })

  return new Response()
};
