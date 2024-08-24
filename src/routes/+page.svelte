<script lang="ts">
  import { goto } from '$app/navigation';
  import NetIcon from '$lib/assets/icons/net-icon.svg';
  import api from '$lib/auth/http';
  import authStore from '$lib/stores/authStore';
  import userStore from '$lib/stores/userStore';
  import { ROUTES } from '$lib/utils/constants';
  import { onMount } from 'svelte';

  onMount(async () => {
    if ($authStore.isLoggedIn) {
      if ($userStore === null || $userStore === undefined) {
        const response = await api.userService.user.getMe();
        $userStore = response.data;
      }

      if ($userStore.isGuest) {
        await goto(ROUTES.GUEST.DASHBOARD);
      } else {
        await goto(ROUTES.HOST.DASHBOARD);
      }
    } else {
      goto(ROUTES.LOGIN);
    }
  });
</script>

<div class="relative flex justify-center">
  <img src={NetIcon} alt="Net-Icon" width="70%" class="absolute opacity-90 dark:opacity-10 h-full" />

  <div class="flex flex-col items-center py-10 w-full overflow-auto md:overflow-hidden">
    <div class="flex items-center">
      <span class="mr-4 font-semibold text-4xl text-black dark:text-white">Welcome to Buk It Easy</span>
    </div>
  </div>
</div>
