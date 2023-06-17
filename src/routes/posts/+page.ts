import type { PageLoad } from './$types'

export const load = (async ({ fetch, url }) => {
  const fetchPosts = async () => {
    const res = await fetch(`/api/posts`)
    const data = await res.json()

    return data
  }

  return {
    posts: fetchPosts()
  }
}) satisfies PageLoad
