<script lang="ts">
  import { goto } from '$app/navigation';
  import authStore from '$lib/stores/authStore';
  import userStore from '$lib/stores/userStore';
  import { onMount } from 'svelte';

  onMount(async () => {
    if ($authStore.isLoggedIn && !$userStore) {
      await goto('/');
    }
  });
</script>

<slot />
