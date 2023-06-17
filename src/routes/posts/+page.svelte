<script lang="ts">
  import { PUBLIC_API_HOST } from '$env/static/public';
  import type { PageData } from './$types'
  import FormattedDate from '$lib/FormattedDate.svelte';

  export let data: PageData

  const posts = data.posts.data
</script>

<div class="my-4 mx-auto max-w-6xl px-6 lg:px-8">
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1>Posts</h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-md bg-valencia-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-valencia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valencia-600">+ Add Post</button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Title</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Image Count</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0 "><span class="sr-only">Delete</span></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each posts as post (post.id)}
                <tr>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <a href="posts/{post.id}">
                      {post.attributes.title}
                    </a>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><FormattedDate date={post.attributes.created_at}/></td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{post.attributes.images.length}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button type="button" class="block rounded-md bg-red-700 px-2 py-1 text-center text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      <a href="#" class="text-white hover:text-white">Delete<span class="sr-only">, {post.attributes.title}</span></a>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
