<script lang="ts">
  import { enhance } from '$app/forms';
  import GradientAccent from '$lib/components/GradientAccent.svelte';

  export let form;

  let email = '';
  let password = '';
  let submitting = false;
</script>

<svelte:head>
  <title>sign in · hannah bauer admin</title>
</svelte:head>

<GradientAccent />

<div class="page-container">
  <div class="mx-auto max-w-md">
    <header class="text-center">
      <p class="section-label">admin</p>
      <h1 class="mt-2">sign in</h1>
      <p class="mt-3 text-gray-600">Manage blog posts and comments.</p>
    </header>

    <form
      method="POST"
      class="card mt-8 space-y-5 p-6 sm:p-8"
      use:enhance={() => {
        submitting = true;
        return async ({ update }) => {
          submitting = false;
          await update();
        };
      }}
    >
      {#if form?.message}
        <p class="rounded-lg bg-valencia-50 px-4 py-3 text-sm text-valencia-800" role="alert">
          {form.message}
        </p>
      {/if}

      <div>
        <label for="email" class="block text-sm font-semibold text-gray-900">Email</label>
        <input id="email" name="email" type="email" bind:value={email} autocomplete="email" required class="input-field mt-2" />
      </div>

      <div>
        <label for="password" class="block text-sm font-semibold text-gray-900">Password</label>
        <input id="password" name="password" type="password" bind:value={password} autocomplete="current-password" required class="input-field mt-2" />
      </div>

      <button type="submit" disabled={!email || !password || submitting} class="btn-primary w-full">
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  </div>
</div>
