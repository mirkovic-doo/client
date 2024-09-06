<script lang="ts">
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import type { ChangePasswordForm } from '$lib/types/auth';
  import { changePasswordFormConfig } from '$lib/utils/formConfigs';
  import { changePasswordFormSchema } from '$lib/validations/auth';
  import { formatValidationErrors, ValidateSingleFormField } from '$lib/validations/common';

  import { Modal } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';

  export let open: boolean;

  let changePasswordForm: ChangePasswordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  let formConfig = structuredClone(changePasswordFormConfig);
  let validationErrors: object | null = null;

  $: errorMessage = (field: string): string | null => {
    return ValidateSingleFormField(validationErrors, field);
  };

  const dispatch = createEventDispatcher();

  const handleInputValidation = () => {
    const result = changePasswordFormSchema.safeParse(changePasswordForm);
    validationErrors = result.success ? null : formatValidationErrors(result);
  };

  const handlePasswordChange = () => {
    open = false;
    const currentPassword = changePasswordForm.currentPassword;
    const newPassword = changePasswordForm.newPassword;
    dispatch('passwordChange', { currentPassword, newPassword });
    resetChangePasswordForm();
  };

  const resetChangePasswordForm = () => {
    changePasswordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  };
</script>

<Modal
  bind:open
  autoclose={false}
  outsideclose={false}
  backdropClass="fixed inset-0 z-40 backdrop-blur-sm w-full z-50"
  defaultClass="relative rounded-xl flex flex-col mx-auto !w-fit h-auto !bg-white"
>
  <h3 class="text-xl font-semibold text-light-black">Change Password</h3>

  <form on:submit|preventDefault class="w-full rounded-xl flex flex-col gap-2">
    <div class="grid gap-4 grid-cols-2">
      {#each formConfig as propertyConfig}
        <Input
          class="mt-2 min-h-[10vh]"
          id={propertyConfig.id}
          bind:value={changePasswordForm[propertyConfig.name]}
          on:input={handleInputValidation}
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
      text="Change Password"
      type="submit"
      aria-disabled={validationErrors !== null}
      disabled={validationErrors !== null}
      class="mt-2 w-full bg-light-gray"
      on:click={handlePasswordChange}
    />
  </form></Modal
>
