import { redirect, type Handle } from "@sveltejs/kit";
import { authenticateUser } from '$lib/authenticateUser'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await authenticateUser(event.cookies.get('auth'));

  if (!event.url.pathname.startsWith('/login')) {
    if (!event.locals.user) {
      throw redirect(303, '/login')
    }
  }

  const response = await resolve(event);

  return response;
}
