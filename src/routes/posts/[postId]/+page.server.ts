import { PUBLIC_API_HOST } from '$env/static/public';

export const actions = {
    default: async ({ request, params }: any) => {
        const formData = await request.formData();

        const title = formData.get('title')
        const summary = formData.get('summary')
        const body = formData.get('body')

        const post = {
            title,
            summary,
            body
        }

        const res = await fetch(`${PUBLIC_API_HOST}/posts/${params.postId}`, {
            method: 'PATCH',
            body: JSON.stringify({ post }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();

        return { status: res.status, post: data.data };
    }
}
