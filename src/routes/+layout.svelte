<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import NetIcon from '$lib/assets/icons/net-icon.svg';
  import { auth } from '$lib/auth/firebase';
  import api from '$lib/auth/http';
  import Navbar from '$lib/components/common/Navbar.svelte';
  import { mapUserResponseToUser } from '$lib/mappers/user';
  import authStore from '$lib/stores/authStore';
  import { loadingStore } from '$lib/stores/loadingStore';
  import userStore from '$lib/stores/userStore';
  import { setTheme } from '$lib/utils/theme';
  import '$src/app.css';
  import type { User } from 'firebase/auth';
  import { onAuthStateChanged } from 'firebase/auth';
  import { Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { Toaster } from 'svelte-french-toast';

  let authInitialized = false;

  onMount(async () => {
    if ($page?.error !== null) {
      await goto('/');
    }

    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        $authStore = {
          user: user,
          isLoggedIn: true,
        };

        if ($userStore === null || $userStore === undefined) {
          const response = await api.userService.user.getMe();
          $userStore = mapUserResponseToUser(response.data);
        }

        let redirectUrl = $page.url.searchParams.get('redirectUrl');
        if (redirectUrl !== null) {
          await goto(redirectUrl);
        }
      } else {
        $authStore = {
          user: null,
          isLoggedIn: false,
        };

        const redirectUrl = $page.url.pathname;

        if (!redirectUrl.startsWith('/login') && !redirectUrl.startsWith('/signup')) {
          await goto(`/login?redirectUrl=${encodeURIComponent(redirectUrl)}`);
        }
      }

      authInitialized = true;
    });

    setTheme();
  });
</script>

<Toaster
  position="top-center"
  toastOptions={{
    className: '!rounded-xxl !bg-grayscale-100',
  }}
/>

{#if authInitialized}
  <div class="relative justify-center min-h-screen h-screen w-full flex-grow bg-light-gray text-white">
    {#if !$authStore.isLoggedIn}
      <img src={NetIcon} alt="Net-Icon" width="70%" class="absolute opacity-90 dark:opacity-10 h-full w-full" />
    {/if}
    {#if $loadingStore}
      <div
        class="absolute top-0 z-10 flex min-h-screen w-full flex-col items-center justify-center bg-white bg-opacity-40"
      >
        <Spinner color="white" size="12" />
      </div>
    {:else}
      <div class="relative h-screen">
        {#if $userStore}
          <Navbar />
        {/if}
        <slot />
      </div>
    {/if}
  </div>
{:else}
  <div class="bg-auth flex min-h-screen flex-col items-center justify-center bg-cover">
    <Spinner color="white" size="12" />
  </div>
{/if}
