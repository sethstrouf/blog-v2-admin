<script>
  import "../app.css"
  import NavigationBar from "./Navigation.svelte";
  import Footer from "./Footer.svelte";
  import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<NavigationBar />

<slot />

<SvelteToast />

<Footer />
