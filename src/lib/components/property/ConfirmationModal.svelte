<script lang="ts">
  import { Modal } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  import Button from '../common/Button.svelte';

  export let open: boolean;
  export let title: string;
  export let content: string;
  export let confirmText: string;
  export let onConfirm: () => void;

  const dispatch = createEventDispatcher();

  const handleConfirm = () => {
    onConfirm();
    dispatch('close');
  };
</script>

<Modal
  bind:open
  autoclose={false}
  outsideclose={false}
  backdropClass="fixed inset-0 z-40 backdrop-blur-sm w-full z-50"
  defaultClass="relative rounded-xl flex flex-col !w-fit h-auto !bg-white"
>
  <h3 class="text-xl font-semibold text-light-black">{title}</h3>
  <div>{content}</div>
  <div class="flex gap-2 mt-2">
    <Button text={confirmText} class="w-full bg-light-gray" on:click={handleConfirm} />
    <Button text="Cancel" class="w-full bg-gray-300" on:click={() => (open = false)} />
  </div>
</Modal>
