import { dev } from '$app/environment';
import { PUBLIC_API_HOST } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
  if (locals.user) {
    throw redirect(303, '/posts');
  }
};

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    const res = await fetch(`${PUBLIC_API_HOST}/api_keys`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    });

    if (res.status === 201) {
      const data = await res.json();

      cookies.set(
        'auth',
        JSON.stringify({ id: data.id, token: data.token }),
        {
          httpOnly: true,
          sameSite: 'strict',
          secure: !dev,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }
      );

      throw redirect(303, '/posts');
    }

    return fail(401, { message: 'Invalid email or password.' });
  },
} satisfies Actions;
