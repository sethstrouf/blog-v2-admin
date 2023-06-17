<script lang="ts">
  import { page } from '$app/stores'
  import { enhance } from "$app/forms"
	import FormattedDate from '$lib/FormattedDate.svelte';
  import { fade } from 'svelte/transition';

  export let comments: { id: number, type: string, attributes: { body: string, commenter_name: string, post_id: string, created_at: Date } }[]
  export let postId: number

  $: {
    if ($page.form?.status == 201) {
      comments = [$page.form.comment, ...comments]
    }
  }

  let commentBody: string
</script>

<!-- Comment Form -->
<div class="flex items-start space-x-4 mt-2">
  <div class="min-w-0 flex-1">
    <form method="POST" action="?/create" use:enhance>
      <div class="border-b border-gray-200 focus-within:border-valencia-500 px-1">
        <input type="hidden" name="postId" value={postId} />
        <label for="name" class="sr-only">Name</label>
        <input type="text" name="name" id="Name" class="bg-gray-100 block w-full border-0 text-base font-medium placeholder:text-gray-400 focus:ring-0 px-0" placeholder="Name">
        <div class="w-full border-t" />
        <label for="comment" class="sr-only">Add your comment</label>
        <textarea bind:value={commentBody} rows="3" name="commentBody" id="comment" class="bg-gray-100 block w-full resize-none border-0 border-b border-transparent p-0 py-2 text-gray-900 placeholder:text-gray-400 focus:border-valencia-600 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Add your comment..."></textarea>
      </div>
      <div class="flex justify-between pt-2">
        <div class="flex items-center space-x-5">
          <div class="flow-root">
            <div>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0">
          <button type="submit" disabled={!commentBody} class="disabled:bg-gray-500 inline-flex items-center rounded-md bg-turquoise-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-turquoise-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-600">Post</button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- Comment Section -->
{#each comments as comment (comment.id.toString())}
  <div transition:fade class="mt-6 bg-gray-200 rounded-lg p-2">
    <div class="relative">
      <div class="flex justify-between">
        <h3 class="text-base font-light leading-6 text-gray-900">
          {comment.attributes.commenter_name || 'Anonymous'}
        </h3>
        <p class="align-right text-xs text-valencia-700"><FormattedDate date={comment.attributes.created_at} /></p>
      </div>
      <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{comment.attributes.body}</p>
    </div>
  </div>
{/each}
