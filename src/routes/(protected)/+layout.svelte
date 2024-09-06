<script lang="ts">
  import { goto } from '$app/navigation';
  import authStore from '$lib/stores/authStore';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (!$authStore.isLoggedIn) {
      await goto('/');
    }
  });
</script>

<div class="flex flex-col relative w-full h-[90%]">
  <slot />
</div>
