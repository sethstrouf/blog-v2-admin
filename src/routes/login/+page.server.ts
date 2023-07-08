import { dev } from '$app/environment';
import { PUBLIC_API_HOST } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }: any) => {
        const formData = await request.formData();

        const email = formData.get('email')
        const password = formData.get('password')

        const res = await fetch(`${PUBLIC_API_HOST}/api_keys`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(email + ":" + password)}`
            }
        })

        if (res.status == 201) {
            const data = await res.json();

            const auth_token = {
                id: data.id,
                token: data.token
            }

            cookies.set('auth', JSON.stringify(auth_token), {
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });

            throw redirect(303, '/posts')
        }

        return JSON.stringify({ status: res.status })
    }
}
