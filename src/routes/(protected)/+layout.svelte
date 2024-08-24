<script lang="ts">
  import { goto } from '$app/navigation';
  import authStore from '$lib/stores/authStore';
  import { SendNotificationMethodName } from '$lib/utils/constants';
  import { createFileUploadHubConnection } from '$lib/utils/hub';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (!$authStore.isLoggedIn) {
      await goto('/');
    }

    const connection = createFileUploadHubConnection();

    connection.on(SendNotificationMethodName, async (data) => {
      alert(`NEW NOTIFICATION INC: ${JSON.stringify(data)}`);
    });
  });
</script>

<slot />
