<script lang="ts">
  import { PUBLIC_API_HOST } from '$env/static/public';
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
	import { browser } from '$app/environment'
  import { toast } from '@zerodevx/svelte-toast'
  import { fade } from 'svelte/transition';

  type Image = { url: string, filename: string }
  export let post: { attributes: { title: string, summary: string, body: string, images: Image[] }} = { attributes: { title: '', summary: '', body: '', images: [] }}

  let title = post.attributes.title
  let summary = post.attributes.summary
  let body = post.attributes.body

  let files: any

	$: if (files) {
    uploadImages()
	}

  const uploadImages = async () => {
    toast.pop(0)
    const formData = new FormData();

    Array.prototype.forEach.call(files, (file) => {
      formData.append("images[]", file)
    });

    const res = await fetch(`${PUBLIC_API_HOST}/posts/${$page.params.postId}/attach_images`, {
      method: 'POST',
      body: formData
    })

    const data = await res.json();

    if (data) {
      post = data.data
      toast.push('Images uploaded successfully!')
    }
  }

  const deleteImage = async (url: string) => {
    toast.pop(0)

    const res = await fetch(`${PUBLIC_API_HOST}/posts/${$page.params.postId}/delete_image`, {
      method: 'POST',
      body: JSON.stringify({ image_url: url }),
      headers: {
            'Content-Type': 'application/json'
      }
    })

    const temp = post.attributes.images.filter((image: Image) => image.url != url);
    post.attributes.images = [...temp]
    toast.push('Image deleted!')
  }

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
</form>

<div class="mt-12">
  <h1>Images</h1>
  <label for="images" class="sr-only">Upload Images</label>
  <div class="relative mt-2.5">
    <input type="file" multiple bind:files name="images" id="images" accept="image/png, image/jpeg, image/gif" class="ml-20 mt-4">
  </div>
  <div class="flex gap-2 justify-center mt-4">
    {#each post.attributes.images as image (image?.url)}
      <div transition:fade>
        <img src={`${PUBLIC_API_HOST}${image?.url}`} alt={image?.filename} class="w-20" />
        <button on:click={() => deleteImage(image?.url)} class="bg-red-600 hover:bg-red-700 w-full text-white rounded mt-0.5">Delete</button>
      </div>
    {/each}
  </div>
</div>
