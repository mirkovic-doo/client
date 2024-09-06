<script lang="ts">
  import { goto } from '$app/navigation';
  import userStore from '$lib/stores/userStore';
  import { onMount } from 'svelte';

  onMount(async () => {
    if ($userStore && !$userStore.isGuest) {
      await goto('/');
    }
  });
</script>

<slot />
