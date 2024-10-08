<script lang="ts">
  import { signInWithEmailAndPassword } from 'firebase/auth';

  import { auth } from '$lib/auth/firebase';
  import Input from '$lib/components/common/Input.svelte';
  import { formatValidationErrors, ValidateSingleFormField } from '$lib/validations/common';

  import { goto } from '$app/navigation';
  import Button from '$lib/components/common/Button.svelte';
  import authStore from '$lib/stores/authStore';
  import type { LoginForm } from '$lib/types/auth';
  import { loginFormConfig } from '$lib/utils/formConfigs';
  import { logInFormSchema } from '$lib/validations/auth';
  import { Spinner } from 'flowbite-svelte';
  import toast from 'svelte-french-toast';

  let form: LoginForm = {
    email: '',
    password: '',
  };
  let isSubmitting = false;
  let validationErrors: object | null = null;
  let error: string | null = null;
  let formConfig = structuredClone(loginFormConfig);

  $: errorMessage = (field: string): string | null => {
    return ValidateSingleFormField(validationErrors, field);
  };

  async function submit() {
    isSubmitting = true;
    error = null;

    try {
      const result = logInFormSchema.safeParse(form);
      validationErrors = result.success ? null : formatValidationErrors(result);
      if (validationErrors === null) {
        await toast.promise(login(form.email, form.password), {
          loading: 'Logging in...',
          success: 'Successfully logged in',
          error: (e) => e.message,
        });
      }
    } finally {
      isSubmitting = false;
    }
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const handleInputValidation = () => {
    const result = logInFormSchema.safeParse(form);
    validationErrors = result.success ? null : formatValidationErrors(result);
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

{#if $authStore.isLoggedIn}
  <div class="w-full h-[90%] flex">
    <Spinner size="20" color="white" class="m-auto" />
  </div>
{:else}
  <div class="flex h-full items-center justify-evenly">
    <div class="text-md mb-6 flex-col">
      <h2 class="mb-2 text-[32px] font-bold">Log In</h2>
      <span> Welcome to Buk It Easy</span>
    </div>
    <form on:submit|preventDefault class="w-[22vw] p-8 bg-white rounded-xl flex flex-col gap-2">
      {#each formConfig as propertyConfig}
        <Input
          class="min-h-[10vh]"
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

      <Button
        text="Log In"
        type="submit"
        aria-disabled={validationErrors !== null || isSubmitting}
        disabled={validationErrors !== null || isSubmitting}
        class="w-full bg-light-gray mt-2"
        on:click={submit}
      />

      <div class="mt-2 flex justify-center">
        <span style="color: #191E2A;"
          >Don't have an account?
          <a href="/signup" style="font-weight: bold; text-decoration: none; color: #4A225E;">Sign Up</a>
        </span>
      </div>

      <div class="flex items-center justify-center">
        <hr class="flex-grow border-gray-300" />
        <span class="px-4 pb-1 text-sm text-black">or</span>
        <hr class="flex-grow border-gray-300" />
      </div>
      <Button
        text="Continue without account"
        class="w-full bg-light-gray py-4"
        on:click={() => {
          goto('/properties');
        }}
      />
    </form>
  </div>
{/if}
