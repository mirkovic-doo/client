<script lang="ts">
  import { NotificationType, type NotificationResponse } from '$lib/api/apiNotification';
  import api from '$lib/auth/http';
  import type { BIENotification } from '$lib/types/notification';
  import { SendNotificationMethodName } from '$lib/utils/constants';
  import { createFileUploadHubConnection } from '$lib/utils/hub';
  import { mapNotificationResponseToNotification } from '$lib/utils/notification';
  import { Indicator, Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { BellRegular } from 'svelte-awesome-icons';

  let notificationsDialogOpen = false;
  let showAll = false;
  let loading = true;
  let singleNotificationDialogOpen = false;
  let newNotification: BIENotification | null = null;
  let notifications: BIENotification[] = [];

  $: unreadNotifications = notifications.filter((notification) => !notification.isRead);

  onMount(() => {
    getNotifications();

    const connection = createFileUploadHubConnection();

    connection.on(SendNotificationMethodName, async (data) => {
      await handleNewNotification(data);
    });
  });

  const getNotifications = async () => {
    loading = true;
    const response = await api.notificationService.notification.getMyNotifications();
    notifications = await Promise.all(response.data.map(mapNotificationResponseToNotification));
    loading = false;
  };

  const toggleNotifications = () => {
    singleNotificationDialogOpen = false;
    notificationsDialogOpen = !notificationsDialogOpen;
  };

  const handleNewNotification = async (data: NotificationResponse) => {
    newNotification = await mapNotificationResponseToNotification(data);
    notifications = [newNotification, ...notifications];
    if (!notificationsDialogOpen) {
      singleNotificationDialogOpen = true;

      setTimeout(() => {
        closeNewNotificationDialog();
      }, 3000);
    }
  };

  const getNotificationText = (notification: BIENotification): string => {
    switch (notification.type) {
      case NotificationType.ReviewRecieved:
        return `You have recieved a review from ${notification.sender.firstName} ${notification.sender.lastName}.`;
      default:
        return `New notification from ${notification.sender.firstName} ${notification.sender.lastName}.`;
    }
  };

  const closeNewNotificationDialog = () => {
    singleNotificationDialogOpen = false;
    newNotification = null;
  };

  const markNotificationAsRead = (notification: BIENotification) => async () => {
    await api.notificationService.notification.markNotificationAsRead(notification.id);
    notifications = notifications.map((n) => {
      if (n.id === notification.id) {
        n.isRead = true;
      }
      return n;
    });
  };

  const getNotificationBorderColor = (notification: BIENotification): string => {
    return notification.isRead ? 'border-gray-300' : 'border-orange-600';
  };

  const markAllAsRead = async () => {
    const response = await api.notificationService.notification.markAllAsRead();
    if (response.ok) {
      notifications = notifications.map((n) => {
        n.isRead = true;
        return n;
      });
    }
  };
</script>

<div class="relative">
  <button
    class="h-[35px] w-[40px] bg-orange-600 font-medium underline px-2 py-1 rounded-md text-white {unreadNotifications.length >
    0
      ? 'animate-pulse'
      : ''}"
    on:click={toggleNotifications}
  >
    <BellRegular size="20" class="mx-auto" />
    {#if unreadNotifications.length > 0}
      <Indicator color="orange" border size="xl" placement="top-right" class="text-xs font-bold"
        >{unreadNotifications.length}</Indicator
      >
    {/if}
  </button>

  {#if notificationsDialogOpen}
    <dialog open={true} class="top-10 left-[-14vw] w-[20vw] rounded-md">
      <div class="flex flex-col gap-y-2 p-2 min-h-[25vh]">
        <h1 class="text-lg font-bold">Notifications</h1>
        {#if loading}
          <Spinner class="mx-auto my-auto" size="14" color="white" />
        {:else}
          <div class="flex items-center justify-between">
            <button class="underline" on:click={() => (showAll = !showAll)}>
              {showAll ? 'Hide read' : 'Show all'}
            </button>
            <button class="underline" on:click={markAllAsRead}> Mark all as read </button>
          </div>
          {#if (unreadNotifications.length === 0 && !showAll) || notifications.length === 0}
            <p class="text-sm my-auto mx-auto">No new notifications</p>
          {:else}
            {#each notifications as notification}
              {#if showAll || !notification.isRead}
                {#if notification.isRead}
                  <div
                    class="text-center flex flex-col gap-y-2 p-2 rounded-md border-2 {getNotificationBorderColor(
                      notification
                    )}"
                  >
                    <p class="text-sm">{getNotificationText(notification)}</p>
                  </div>
                {:else}
                  <button
                    class="text-center flex flex-col gap-y-2 p-2 rounded-md border-2 {getNotificationBorderColor(
                      notification
                    )}"
                    on:click={markNotificationAsRead(notification)}
                  >
                    <p class="text-sm">{getNotificationText(notification)}</p>
                  </button>
                {/if}
              {/if}
            {/each}
          {/if}
        {/if}
      </div>
    </dialog>
  {/if}

  {#if singleNotificationDialogOpen && newNotification}
    <dialog open={true} class="top-10 left-[-14vw] w-[20vw] rounded-md">
      <button class="flex flex-col gap-y-2 p-2" on:click={closeNewNotificationDialog}>
        <h1 class="text-lg font-bold">New Notification</h1>
        <p class="text-sm">{getNotificationText(newNotification)}</p>
      </button>
    </dialog>
  {/if}
</div>
