<script lang="ts">
  import type { NotificationSettingRequest, NotificationSettingResponse } from '$lib/api/apiNotification';
  import api from '$lib/auth/http';
  import userStore from '$lib/stores/userStore';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let notificationSettings: NotificationSettingResponse = {};
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    await fetchNotificationSettings();
  });

  const fetchNotificationSettings = async () => {
    try {
      const response = await api.notificationService.notificationsetting.getUserNotificationSetting(
        $userStore?.id ?? ''
      );
      notificationSettings = response.data;
    } catch (e) {
      error = 'Failed to load notification settings';
    } finally {
      isLoading = false;
    }
  };

  const updateNotificationSettings = async () => {
    try {
      const notificationSettingRequest: NotificationSettingRequest = {
        id: notificationSettings.id ?? '',
        isReservationRequestNotificationEnabled: notificationSettings.isReservationRequestNotificationEnabled,
        isReservationConfirmedNotificationEnabled: notificationSettings.isReservationConfirmedNotificationEnabled,
        isReservationRejectedNotificationEnabled: notificationSettings.isReservationRejectedNotificationEnabled,
        isReservationDeletedNotificationEnabled: notificationSettings.isReservationDeletedNotificationEnabled,
        isReservationCancelledNotificationEnabled: notificationSettings.isReservationCancelledNotificationEnabled,
        isReviewRecievedNotificationEnabled: notificationSettings.isReviewRecievedNotificationEnabled,
      };
      await api.notificationService.notificationsetting.updateNotificationSetting(notificationSettingRequest);
      toast.success('Notification settings updated successfully');
    } catch (e) {
      toast.error('Failed to update notification settings');
    }
  };
</script>

<svelte:head>
  <title>Notification Settings</title>
</svelte:head>

<div class="flex flex-col items-center min-h-screen py-8 text-white">
  <header class="mb-8 text-center">
    <h1 class="text-4xl font-bold">Notification Settings</h1>
  </header>

  <div class="bg-grayscale-800 p-6 rounded-lg shadow-lg w-1/3">
    <form>
      {#if $userStore && !$userStore.isGuest}
        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-purple-600 cursor-pointer"
            bind:checked={notificationSettings.isReservationRequestNotificationEnabled}
          />
          <span class="ml-2">Notify me about new reservation requests</span>
        </div>
      {/if}

      {#if $userStore && $userStore.isGuest}
        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-purple-600 cursor-pointer"
            bind:checked={notificationSettings.isReservationConfirmedNotificationEnabled}
          />
          <span class="ml-2">Notify me when a reservation is confirmed</span>
        </div>

        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-purple-600 cursor-pointer"
            bind:checked={notificationSettings.isReservationRejectedNotificationEnabled}
          />
          <span class="ml-2">Notify me when a reservation is rejected</span>
        </div>
      {/if}

      {#if $userStore && !$userStore.isGuest}
        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-purple-600 cursor-pointer"
            bind:checked={notificationSettings.isReservationDeletedNotificationEnabled}
          />
          <span class="ml-2">Notify me when a reservation is deleted</span>
        </div>

        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-purple-600 cursor-pointer"
            bind:checked={notificationSettings.isReservationCancelledNotificationEnabled}
          />
          <span class="ml-2">Notify me if a reservation is cancelled</span>
        </div>

        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            class="form-checkbox h-5 w-5 text-purple-600 cursor-pointer"
            bind:checked={notificationSettings.isReviewRecievedNotificationEnabled}
          />
          <span class="ml-2">Notify me when I receive a new review</span>
        </div>
      {/if}

      <div class="flex justify-center">
        <button
          on:click={updateNotificationSettings}
          class="mt-6 px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900"
        >
          Save Settings
        </button>
      </div>
    </form>
  </div>
</div>
