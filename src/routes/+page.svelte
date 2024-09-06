<script lang="ts">
  import { goto } from '$app/navigation';
  import authStore from '$lib/stores/authStore';
  import userStore from '$lib/stores/userStore';
  import { ROUTES } from '$lib/utils/constants';
  import { onMount } from 'svelte';

  onMount(async () => {
    if ($authStore.isLoggedIn) {
      if ($userStore?.isGuest) {
        await goto(ROUTES.GUEST.HOME);
      } else {
        await goto(ROUTES.HOST.HOME);
      }
    } else {
      goto(ROUTES.LOGIN);
    }
  });
</script>
