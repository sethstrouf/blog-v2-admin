<script lang="ts">
  import { page } from '$app/stores'
  import { goto } from '$app/navigation';
  import type { PageData } from './$types'

  export let data: PageData

  $: user = data.user
  $: path = $page.route.id

  const logout = async () => {
    const res = await fetch('/api/logout', { method: 'POST' })
    if (res.status == 200) {
      user = null
      goto ('/login');
    }
  }
</script>

<nav>
  <!-- Non-Mobile menu -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex sm:h-16 w-full justify-center">
      <div class="flex items-center sm:space-x-16 md:space-x-38 lg:space-x-60">
        <div>
          <h1 class="hidden sm:block text-2xl md:text-4xl"><a href="/">admin</a></h1>
        </div>
        {#if user}
          <div class="sm:-mb-0.5 hidden sm:flex sm:space-x-8 flex-wrap">
            <!-- Current: "border-valencia-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <a href="/posts/new">
                <button type="button" class="block rounded-md bg-valencia-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-valencia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valencia-600">+ Add Post</button>
              </a>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button type="button" on:click={logout} class="block rounded-md bg-turquoise-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-turquoise-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valencia-600">Logout</button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div class="sm:hidden text-center" id="mobile-menu">
    <div>
      <!-- Current: "bg-valencia-50 border-valencia-500 text-valencia-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
      <a href="/" aria-current={path === '/' && 'page'} class="block border-l-4 border-transparent py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">admin</a>
      {#if user}
        <div class="block border-l-4 border-transparent py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
          <a href="/posts/new">+ Add Post</a>
        </div>
        <div on:click={logout} on:keypress={logout} class="block border-l-4 border-transparent py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
          Logout
        </div>
      {/if}
    </div>
  </div>
</nav>

<style lang="postcss">
  [aria-current="page"] {
    @apply bg-valencia-50 border-valencia-500 text-valencia-700 sm:bg-transparent sm:text-gray-900;
  }
</style>
