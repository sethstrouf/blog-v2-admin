<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
	import { browser } from '$app/environment'
  import { toast } from '@zerodevx/svelte-toast'

  export let post: { attributes: { title: string, summary: string, body: string }} = { attributes: { title: '', summary: '', body: '' }}

  let title = post.attributes.title
  let summary = post.attributes.summary
  let body = post.attributes.body

  if ($page.form?.status == 201 && browser) {
    toast.pop(0)
    goto(`/posts/${$page.form.post.id}`, { replaceState: true })
    toast.push('Post Saved Successfully!')
  }
</script>

<form action="#" method="POST" class="mx-auto mt-8 max-w-xl sm:mt-12">
  <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
    <div class="sm:col-span-2">
      <label for="title" class="block text-sm font-semibold leading-6 text-gray-900">Title</label>
      <div class="mt-2.5">
        <input type="text" name="title" id="title" bind:value={title} required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-valencia-600 sm:text-sm sm:leading-6">
      </div>
    </div>
    <div class="sm:col-span-2">
      <label for="summary" class="block text-sm font-semibold leading-6 text-gray-900">Summary</label>
      <div class="relative mt-2.5">
        <input type="text" name="summary" id="summary" bind:value={summary} required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-valencia-600 sm:text-sm sm:leading-6">
      </div>
    </div>
    <div class="sm:col-span-2">
      <label for="body" class="block text-sm font-semibold leading-6 text-gray-900">Post</label>
      <div class="mt-2.5">
        <textarea name="body" id="body" bind:value={body} required rows="10" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-valencia-600 sm:text-sm sm:leading-6"></textarea>
      </div>
    </div>
  </div>
  <div class="mt-10">
    <button type="submit" disabled={!title || !summary || !body} class="disabled:bg-gray-500 block w-full rounded-md bg-turquoise-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-turquoise-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valencia-600">Save</button>
  </div>

  <!-- <div class="mt-12 w-full">
    {#if $page.form?.status == 200 || $page.form?.status == 201 && browser}
    <p class="bg-green-500 px-4 py-2 rounded font-bold">Post saved successfully!</p>
    {/if}
  </div> -->
</form>
