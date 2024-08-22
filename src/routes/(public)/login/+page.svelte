<script lang="ts">
  import { signInWithEmailAndPassword } from 'firebase/auth';

  import { goto } from '$app/navigation';
  import { auth } from '$lib/auth/firebase';
  import Input from '$lib/components/common/Input.svelte';
  import { formatValidationErrors, ValidateSingleFormField } from '$lib/validations/common';

  import Button from '$lib/components/common/Button.svelte';
  import type { LoginForm } from '$lib/types/auth';
  import { loginFormConfig } from '$lib/utils/formConfigs';
  import { logInFormSchema } from '$lib/validations/auth';

  let form: LoginForm = {
    email: '',
    password: '',
  };
  let isSubmitting = false;
  let token: string | null = null;
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
        login(form.email, form.password);
      }
    } finally {
      isSubmitting = false;
    }
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
    await goto('/');
  }

  const handleInputValidation = () => {
    const result = logInFormSchema.safeParse(form);
    validationErrors = result.success ? null : formatValidationErrors(result);
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="flex justify-center h-full items-center justify-evenly">
  <div class="text-md mb-6 flex-col">
    <h2 class="mb-2 text-[32px] font-bold">Log In</h2>
    <span> Welcome to Buk It Easy</span>
  </div>
  <form on:submit|preventDefault class="w-[20vw] p-8 bg-white rounded-xl flex flex-col gap-2">
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
      class="w-full bg-light-black mt-2"
      on:click={submit}
    />

    <div class="mt-2 flex justify-center">
      <span style="color: #191E2A;"
        >Don't have an account?
        <a href="/signup" style="font-weight: bold; text-decoration: none; color: #4A225E;">Sign Up</a>
      </span>
    </div>
  </form>
</div>
