<script lang="ts">
  import { createUserWithEmailAndPassword } from 'firebase/auth';

  import { auth } from '$lib/auth/firebase';
  import api from '$lib/auth/http';
  import Button from '$lib/components/common/Button.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import type { SignUpForm } from '$lib/types/auth';
  import { signUpFormConfig } from '$lib/utils/formConfigs';
  import { signUpFormSchema } from '$lib/validations/auth';
  import { ValidateSingleFormField, formatValidationErrors } from '$lib/validations/common';
  import { Radio } from 'flowbite-svelte';

  import { goto } from '$app/navigation';
  import { loadingStore } from '$lib/stores/loadingStore';
  import userStore from '$lib/stores/userStore';
  import { ROUTES } from '$lib/utils/constants';

  let form: SignUpForm = {
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    postCode: '',
    street: '',
    houseNumber: '',
    password: '',
    confirmPassword: '',
  };

  let isSubmitting = false;
  let validationErrors: object | null = null;
  let selectedUserType: string = '1';

  let formConfig = structuredClone(signUpFormConfig);

  $: errorMessage = (field: string): string | null => {
    return ValidateSingleFormField(validationErrors, field);
  };

  const submit = async () => {
    isSubmitting = true;

    try {
      const result = signUpFormSchema.safeParse(form);
      validationErrors = result.success ? null : formatValidationErrors(result);
      console.log(validationErrors);
      if (validationErrors === null) {
        signUp(form.email, form.password);
      }
    } finally {
      isSubmitting = false;
    }
  };

  const signUp = async (email: string, password: string) => {
    loadingStore.set(true);
    await createUserWithEmailAndPassword(auth, email, password);

    if (selectedUserType === '1') {
      const response = await api.userService.auth.signupGuest({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        city: form.city,
        postCode: form.postCode,
        street: form.street,
        houseNumber: form.houseNumber,
      });

      $userStore = response.data;
      await auth.currentUser?.getIdToken(true);
      await goto(ROUTES.GUEST.DASHBOARD);
    } else {
      const response = await api.userService.auth.signupHost({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        city: form.city,
        postCode: form.postCode,
        street: form.street,
        houseNumber: form.houseNumber,
      });

      $userStore = response.data;
      await auth.currentUser?.getIdToken(true);
      await goto(ROUTES.HOST.DASHBOARD);
    }

    loadingStore.set(false);
  };

  const handleInputValidation = () => {
    const result = signUpFormSchema.safeParse(form);
    validationErrors = result.success ? null : formatValidationErrors(result);
  };
</script>

<svelte:head>
  <title>Signup</title>
</svelte:head>

<div class="flex justify-center h-full items-center justify-evenly">
  <div class="text-md mb-6 flex-col">
    <h2 class="mb-2 text-[32px] font-bold">Sign Up</h2>
    <span> Welcome to Buk It Easy</span>
  </div>

  <form on:submit|preventDefault class="w-[35%] p-8 bg-white rounded-xl flex flex-col gap-2">
    <div class="flex gap-6">
      <Radio name="example1" value="1" bind:group={selectedUserType} color="purple">
        <span class="text-light-black">Guest</span>
      </Radio>
      <Radio name="example1" value="2" bind:group={selectedUserType} color="purple">
        <span class="text-light-black">Host</span>
      </Radio>
    </div>
    <div class="grid gap-4 grid-cols-2">
      {#each formConfig as propertyConfig}
        <Input
          class="mt-2 min-h-[10vh]"
          id={propertyConfig.id}
          bind:value={form[propertyConfig.name]}
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
      text="Sign Up"
      type="submit"
      aria-disabled={validationErrors !== null || isSubmitting}
      disabled={validationErrors !== null || isSubmitting}
      class="mt-2 w-full bg-light-black"
      on:click={submit}
    />
    <div class="mt-2 flex justify-center">
      <span style="color: #191E2A;"
        >Already have an account?
        <a href="/login" style="font-weight: bold; text-decoration: none; color: #4A225E;">Log In</a>
      </span>
    </div>
  </form>
</div>
