<script lang="ts">
  import { fade } from 'svelte/transition';
  import FormattedDate from './FormattedDate.svelte';

  export let comments: any

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: 'DELETE'
    })

    const data = await res.json()

    if (data.status == 204) {
      const temp = comments.filter((comment: any) => comment.id != id);
      comments = [...temp]
    }
  }
</script>

<table class="min-w-full divide-y divide-gray-300">
  <thead>
    <tr>
      <th scope="col" class="text-center py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
      <th scope="col" class="text-center px-3 py-3.5 text-sm font-semibold text-gray-900">Date</th>
      <th scope="col" class="text-center px-3 py-3.5 text-sm font-semibold text-gray-900">Comment</th>
      <th scope="col" class="text-center relative py-3.5 pl-3 pr-4 sm:pr-0 "><span class="sr-only">Delete</span></th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
    {#each comments as comment (comment.id)}
      <tr transition:fade>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          <a href="posts/{comment.id}">
            {comment.attributes.commenter_name}
          </a>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><FormattedDate date={comment.attributes.created_at}/></td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{comment.attributes.body}</td>
        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <button on:click={() => handleDelete(comment.id)} type="button" class="block rounded-md bg-red-700 px-2 py-1 text-center text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Delete<span class="sr-only">, {comment.attributes.title}</span>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
