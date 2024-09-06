<script lang="ts">
  export let id: string;
  export let color: 'red' | 'green' | 'base' | undefined = 'base';
  export let error: string | null;
  export let label: string;
  export let placeholder: string;
  export let type: InputType;
  export let value: any;
  export let disabled = false;
  export let labelClass = 'mb-2';
  export let required = false;

  import { Helper, Input, Label } from 'flowbite-svelte';
  import type { InputType } from 'flowbite-svelte/dist/types';

  import { createEventDispatcher } from 'svelte';

  export let inputExtenseClass = '';
  export let baseClass = '!text-black !placeholder-light-black focus:ring-purple-300 focus:border-purple-300 !bg-white';

  const dispatch = createEventDispatcher();

  const handleKeydown = (keydownEvent: KeyboardEvent) => {
    if (keydownEvent.key === 'Enter') {
      dispatch('enter');
    }
  };
</script>

<div class={$$restProps.class}>
  <Label class={labelClass} for={id}>
    {label}
    {#if required}
      <span class="ml-[0.2px]">*</span>
    {/if}
  </Label>
  <Input
    bind:value
    on:input
    on:keydown={handleKeydown}
    data-testid={id}
    class={`${baseClass} ${inputExtenseClass} ${error ? '!border-red-500 focus:ring-red-500' : ''}`}
    {disabled}
    {id}
    {type}
    {color}
    {placeholder}
  />
  {#if error !== null}
    <Helper helperClass="mt-1 text-xs float-left !text-red-500">
      {error}
    </Helper>
  {/if}
</div>
