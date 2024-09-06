<script lang="ts">
  export let iconOnLeft = false;
  export let disabled = false;
  export let text = '';
  export let disabledClasses = 'bg-grayscale-100';
  export let color = 'bg-light-gray';
  export let baseClass = 'py-[10px] px-[35px] rounded-[50px] text-sm/[17px] text-white';
  export let extendClass = '';
</script>

<button
  on:click
  {disabled}
  class={`${baseClass} ${color} ${disabled ? disabledClasses : ''} ${$$restProps.class ?? ''} ${extendClass}`}
  data-testid={text}
>
  {#if iconOnLeft}
    <slot name="prefix-icon" />
  {/if}
  {text}
  {#if !iconOnLeft}
    <slot name="suffix-icon" />
  {/if}
</button>
