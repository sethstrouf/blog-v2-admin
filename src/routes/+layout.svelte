<script>
  import '../app.css';
  import NavigationBar from './Navigation.svelte';
  import Footer from './Footer.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  export let data;
</script>

<div class="flex min-h-screen flex-col bg-stone-50">
  <NavigationBar {data} />

  <main class="relative flex-1 py-10 lg:py-16">
    <slot />
  </main>

  <Footer />
  <SvelteToast />
</div>
