import type { RequestHandler } from './$types';
import { PUBLIC_API_HOST } from '$env/static/public';

export const POST: RequestHandler = async ({ cookies, locals }) => {
    const res = await fetch(`${PUBLIC_API_HOST}/api_keys/${locals.user.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${locals.user.token}`
        }
    })

    if (res.status == 204) {
        cookies.delete('auth', { path: '/' })
        locals.user = null

        return new Response(JSON.stringify({message: "Logout successful!"}))
    }

    return new Response(JSON.stringify({message: "Logout failed!"}))
};
