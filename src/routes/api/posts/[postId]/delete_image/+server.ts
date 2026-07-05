import type { RequestHandler } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const POST: RequestHandler = async ({ params, request, locals }) => {
  const body = await request.json();
  const res = await fetch(`${PUBLIC_API_HOST}/posts/${params.postId}/delete_image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${locals.user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
};
