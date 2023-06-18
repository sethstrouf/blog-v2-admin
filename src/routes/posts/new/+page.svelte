<script lang="ts">
  import PostForm from '$lib/PostForm.svelte';

  let post = { attributes: { title: '', summary: '', body: '' }}
</script>

<div>
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div class="mx-auto">
      <div class="text-center">
        <h1>New Post</h1>
        <PostForm {post} />
      </div>
    </div>
  </div>
</div>
