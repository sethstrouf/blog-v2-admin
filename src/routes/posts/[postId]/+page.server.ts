import { PUBLIC_API_HOST } from '$env/static/public';

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();

        const commenter_name = formData.get('name')
        const body = formData.get('commentBody')
        const post_id = formData.get('postId')

        const comment = {
            post_id,
            commenter_name,
            body
        }

        const res = await fetch(`${PUBLIC_API_HOST}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();

        return { status: res.status, comment: data.data };
    }
}
