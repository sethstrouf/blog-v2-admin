import type { PageLoad } from './$types'

export const load = (async ({ params, fetch }) => {

  const fetchPost = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`)
    const data = await res.json()
    return data
  }

  return {
    post: fetchPost(params.postId)
  }
}) satisfies PageLoad
