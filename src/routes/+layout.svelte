<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { setTheme } from '$lib/utils/theme';
  import '$src/app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { onMount } from 'svelte';

  onMount(async () => {
    // await authenticate();

    const currPage = $page.route.id;
    if (currPage !== '/') {
      goto('/');
    }

    setTheme();
  });
</script>

<div class="min-h-screen w-full flex-grow">
  <!-- {#if $authStore?.user} -->
  <slot />
  <!-- {/if} -->
</div>
<SvelteToast />
