<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/auth/firebase';
  import Notifications from '$lib/components/notifications/Notifications.svelte';
  import authStore from '$lib/stores/authStore';
  import userStore from '$lib/stores/userStore';
  import { signOut } from '@firebase/auth';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (!$authStore.isLoggedIn) {
      await goto('/');
    }
  });

  const handleLogOut = async () => {
    try {
      $userStore = null;
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<div class="flex flex-col relative w-full h-full">
  <div class="absolute z-[999] top-0 right-0 w-fit p-2 flex gap-x-2 items-center">
    <Notifications />
    <button
      class={`w-fit h-[35px] bg-orange-600 font-medium px-2 py-1 rounded-md text-white ${
        $authStore.isLoggedIn ? '' : 'hidden'
      }`}
      on:click={handleLogOut}
    >
      Log out</button
    >
  </div>
  <slot />
</div>
