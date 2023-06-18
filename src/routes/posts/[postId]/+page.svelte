<script lang="ts">
  import type { PageData } from './$types';
  import PostForm from '$lib/PostForm.svelte';
  import CommentsTable from '$lib/CommentsTable.svelte';
  import { page } from '$app/stores'
  import { toast } from '@zerodevx/svelte-toast'

  export let data: PageData;

  let post = data.post.data
  let comments = data.post.included

  if ($page.form?.status == 200 || $page.form?.status == 201) {
    toast.pop(0)
    toast.push('Post Saved Successfully!')
  }
</script>

<div>
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div class="mx-auto">
      <div class="text-center">
        <h1 class="mb-4">Edit Post</h1>
        <p class="-mb-8"><a href="https://hannahbauer.me/blog/{post?.id}" target="_blank" class="font-bold">Visit post</a></p>
        <PostForm {post} />

        <h1 class="mt-12 mb-4">Comments</h1>
        {#if comments?.length}
          <CommentsTable {comments} />
        {:else}
          <p>No comments</p>
        {/if}
      </div>
    </div>
  </div>
</div>
