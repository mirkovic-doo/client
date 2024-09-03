<script lang="ts">
  import { auth } from '$lib/auth/firebase';
  import api from '$lib/auth/http';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import ChangePasswordModal from '$lib/components/profile/ChangePasswordModal.svelte';
  import { mapUserResponseToUser, mapUserToUserForm } from '$lib/mappers/user';
  import authStore from '$lib/stores/authStore';
  import { loadingStore } from '$lib/stores/loadingStore';
  import userStore from '$lib/stores/userStore';
  import type { UpdateUserForm } from '$lib/types/user';
  import { updateUserFormConfig } from '$lib/utils/formConfigs';
  import { updateFormSchema } from '$lib/validations/auth';
  import { formatValidationErrors, ValidateSingleFormField } from '$lib/validations/common';
  import { EmailAuthProvider, reauthenticateWithCredential, signOut, updatePassword } from 'firebase/auth';
  import { Avatar } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let updateUserForm: UpdateUserForm = {
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    postCode: '',
    street: '',
    houseNumber: '',
  };

  let formConfig = structuredClone(updateUserFormConfig);
  let validationErrors: object | null = null;
  let isSubmitting = false;
  let isChangePasswordModalOpen = false;
  let deleteDialogConfirmationOpen = false;

  $: errorMessage = (field: string): string | null => {
    return ValidateSingleFormField(validationErrors, field);
  };

  onMount(async () => {
    if ($userStore) {
      updateUserForm = mapUserToUserForm($userStore);
    }
  });

  const handleInputValidation = () => {
    const result = updateFormSchema.safeParse(updateUserForm);
    validationErrors = result.success ? null : formatValidationErrors(result);
  };

  const updateProfile = async () => {
    loadingStore.set(true);

    const response = await api.userService.user.updateUser({
      email: updateUserForm.email,
      firstName: updateUserForm.firstName,
      lastName: updateUserForm.lastName,
      country: updateUserForm.country,
      city: updateUserForm.city,
      postCode: updateUserForm.postCode,
      street: updateUserForm.street,
      houseNumber: updateUserForm.houseNumber,
    });

    $userStore = mapUserResponseToUser(response.data);
    loadingStore.set(false);
  };

  const submit = async () => {
    isSubmitting = true;

    try {
      const result = updateFormSchema.safeParse(updateUserForm);
      validationErrors = result.success ? null : formatValidationErrors(result);
      if (validationErrors === null) {
        toast.promise(updateProfile(), {
          loading: 'Updating profile...',
          success: () => 'Profile successfully updated',
          error: (e) => e.message,
        });
      }
    } finally {
      isSubmitting = false;
    }
  };

  const handlePasswordChange = (event: CustomEvent) => {
    isSubmitting = true;
    toast.promise(changePassword(event.detail.currentPassword, event.detail.newPassword), {
      loading: 'Changing password...',
      success: () => 'Password changed successfully',
      error: (e) => e.message,
    });
    isSubmitting = false;
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if ($authStore.user?.email) {
      let credential = EmailAuthProvider.credential($authStore.user?.email, currentPassword);
      const userCredentials = await reauthenticateWithCredential($authStore.user, credential);
      await updatePassword(userCredentials.user, newPassword);
    }
  };

  const handleDeleteAccount = async () => {
    if ($userStore?.isGuest) {
      await deleteGuestUser();
    } else {
      await deleteHostUser();
    }
    await toast.promise(api.userService.user.deleteUser(), {
      success: 'Account successfully deleted',
      loading: 'Deleting account...',
      error: (e) => e.message,
    });
    try {
      $userStore = null;
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteGuestUser = async () => {
    if ($userStore && $userStore.id) {
      await toast.promise(api.accommodationService.reservation.deleteGuestReservations($userStore.id), {
        success: 'Guest reservations successfully deleted',
        loading: 'Deleting guest reservations...',
        error: (e) => 'You can not delete account while you have active reservations',
      });
    }
  };

  const deleteHostUser = async () => {
    await toast.promise(api.accommodationService.property.deleteHostProperties(), {
      success: 'Properties successfully deleted',
      loading: 'Deleting properties...',
      error: (e) => 'You can not delete account while you have active reservations',
    });
  };
</script>

<svelte:head>
  <title>Your Profile</title>
</svelte:head>

{#if deleteDialogConfirmationOpen}
  <div class="blur-xl opacity-25 bg-grayscale-800 top-0 absolute w-full h-full z-[98]" />

  <dialog open={true} class="top-[35%] bg-grayscale-800 border-gray-500 border rounded-xl text-white z-[99]">
    <div class="flex flex-col gap-y-4 items-center p-10">
      <div>Are you sure you want to delete your account?</div>

      <div class="flex items-center gap-x-4">
        <button class="px-8 py-2 rounded-xl bg-red-500" on:click={handleDeleteAccount}> Yes </button>
        <button
          class="border border-white px-8 py-2 rounded-xl bg-grayscale-800"
          on:click={() => (deleteDialogConfirmationOpen = false)}
        >
          No
        </button>
      </div>
    </div>
  </dialog>
{/if}
<div class="relative flex h-full items-center justify-evenly">
  <div class="text-md flex-col">
    <div class="flex items-center gap-4">
      <Avatar class="!bg-purple-400" size="lg">{$userStore?.firstName[0]}{$userStore?.lastName[0]}</Avatar>
      <div class="flex-col gap-2">
        <h2 class="text-2xl font-bold">{$userStore?.firstName} {$userStore?.lastName}</h2>
        <p class="text-md font-medium text-gray-300">{$userStore?.email}</p>
      </div>
    </div>
    <div class="flex mt-10">
      <Button
        color="bg-purple-400 w-[20vw]"
        text="Change Password"
        on:click={() => (isChangePasswordModalOpen = true)}
      />
    </div>
    <div class="flex mt-10">
      <Button
        color="bg-red-500 w-[20vw]"
        text="Delete Account"
        on:click={() => (deleteDialogConfirmationOpen = true)}
      />
    </div>
  </div>
  <form on:submit|preventDefault class="w-[35%] p-8 bg-white rounded-xl flex flex-col gap-2">
    <div class="grid gap-4 grid-cols-2">
      {#each formConfig as propertyConfig}
        <Input
          class="mt-2 min-h-[10vh]"
          inputExtenseClass="!bg-white"
          id={propertyConfig.id}
          bind:value={updateUserForm[propertyConfig.name]}
          on:input={handleInputValidation}
          on:enter={submit}
          placeholder={`${propertyConfig.placeholder ?? propertyConfig.label}`}
          labelClass={`${errorMessage(propertyConfig.name) !== null ? '!text-red-500' : '!text-light-black'} !mb-2`}
          error={errorMessage(propertyConfig.name)}
          label={propertyConfig.label}
          type={propertyConfig.type ?? 'text'}
          disabled={propertyConfig.disabled}
          iconType={propertyConfig.icon}
        />
      {/each}
    </div>
    <Button
      text="Update Profile"
      type="submit"
      aria-disabled={validationErrors !== null || isSubmitting}
      disabled={validationErrors !== null || isSubmitting}
      class="mt-2 w-full bg-light-gray"
      on:click={submit}
    />
  </form>
</div>

<ChangePasswordModal bind:open={isChangePasswordModalOpen} on:passwordChange={handlePasswordChange} />
