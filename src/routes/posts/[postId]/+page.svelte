<script lang="ts">
  import type { PageData } from './$types';
  import PostForm from '$lib/PostForm.svelte';

  export let data: PageData;

  let post = data.post.data
  let comments = data.post.included
</script>

<div>
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div class="mx-auto">
      <div class="text-center">
        <h1 class="mb-4">Edit Post</h1>
        <p class="-mb-8"><a href="https://hannahbauer.me/blog/{post.id}" target="_blank" class="font-bold">Visit post</a></p>
        <PostForm {post} />
      </div>
    </div>
  </div>
</div>
