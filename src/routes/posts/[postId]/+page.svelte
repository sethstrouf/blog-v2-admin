<script lang="ts">
  import type { PageData } from './$types';
  import { PUBLIC_API_HOST } from '$env/static/public';
  import Comments from './Comments.svelte'
  import FormattedDate from '$lib/FormattedDate.svelte';

  export let data: PageData;

  let post = data.post.data
  let comments = data.post.included

  // Script for image carousel
  let index = 0

  const next = () => {
    index = (index + 1) % post.images.length
  }

  const previous = () => {
    if (index > 0) {
      index = (index - 1) % post.images.length
    } else {
      index = post.images.length - 1
    }
  }
</script>

<div>
  <div class="mx-auto max-w-5xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pr-4 mx-auto">
        {#if post.attributes.images.length}
          <figure class="relative block lg:hidden">
            {#each [post.attributes.images[index]] as image (index)}
              <img src={`${PUBLIC_API_HOST}${image?.url}`} alt={image?.filename} class="h-80 w-80 object-cover rounded-3xl border-2 border-valencia-800" />
            {/each}
            <button on:click={previous} disabled={post.attributes.images[index - 1]  == undefined} class="disabled:hidden absolute top-32 left-2 text-6xl text-white hover:text-valencia-200 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">&lt;</button><br>
            <button on:click={next} disabled={post.attributes.images[index + 1]  == undefined} class="disabled:hidden absolute top-32 right-2 text-6xl text-white hover:text-valencia-200 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">&gt;</button>
          </figure>
        {/if}
        {#each post.attributes.images as image}
          <figure class="relative hidden lg:block mt-2">
            <img src={`${PUBLIC_API_HOST}${image?.url}`} alt={image?.filename} class="mb-12 h-80 w-80 object-cover rounded-3xl border-2 border-valencia-800"/>
          </figure>
        {/each}
      </div>
      <div>
        <div class="text-base leading-7 text-gray-700 lg:max-w-lg -mt-12 sm:-mt-20 lg:mt-0">
          <p class="text-base font-semibold leading-7 text-valencia-600"><FormattedDate date={post.attributes.created_at} /></p>
          <h1 class="mt-2 font-bold tracking-tight">{post.attributes.title}</h1>
          <div class="max-w-xl">
            <p class="mt-6 whitespace-pre-line">
              {post.attributes.body}
            </p>
          </div>
        </div>
        <div class="mt-10 border-t-2 border-valencia-500">
          <Comments {comments} postId={post.id} />
        </div>
      </div>
    </div>
  </div>
</div>
