<script lang="ts">
    import { page } from '$app/stores';
</script>

<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-3xl font-semibold text-turquoise-600">{$page.status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{$page.error?.message}</h1>
  </div>
</main>
