import type { RequestHandler } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const POST: RequestHandler = async ({ params, request, locals }) => {
  const formData = await request.formData();
  const res = await fetch(`${PUBLIC_API_HOST}/posts/${params.postId}/attach_images`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${locals.user.token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
};
