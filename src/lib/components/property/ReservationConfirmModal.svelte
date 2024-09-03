<script lang="ts">
  import Button from '$lib/components/common/Button.svelte';

  import { Modal } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';

  export let open: boolean;

  const dispatch = createEventDispatcher();

  const handlePasswordChange = () => {
    open = false;
    dispatch('reserve');
  };
</script>

<Modal
  bind:open
  autoclose={false}
  outsideclose={false}
  backdropClass="fixed inset-0 z-40 backdrop-blur-sm w-full z-50"
  defaultClass="relative rounded-xl flex flex-col !w-fit h-auto !bg-white"
>
  <h3 class="text-xl font-semibold text-light-black">Confirm Reservation</h3>
  <div>Are you sure you want to reserve this property?</div>
  <Button text="Confirm" class="mt-2 w-full bg-light-gray" on:click={handlePasswordChange} />
</Modal>
