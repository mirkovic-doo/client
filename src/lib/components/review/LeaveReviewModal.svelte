<script lang="ts">
  import Button from '$lib/components/common/Button.svelte';

  import { Modal, Textarea } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  import StarRating from './StarRating.svelte';

  export let open: boolean;
  export let rating: number = 0;
  export let title: string;
  export let comment: string = '';

  const dispatch = createEventDispatcher();

  const submitReview = () => {
    open = false;
    dispatch('submitReview');
  };

  const updateComment = (event: Event) => {
    comment = (event.target as HTMLTextAreaElement).value;
  };
</script>

<Modal
  bind:open
  autoclose={false}
  outsideclose={false}
  backdropClass="fixed inset-0 z-40 backdrop-blur-sm w-full z-50"
  defaultClass="relative rounded-xl flex flex-col !w-[80%] h-auto !bg-white"
>
  <div class="flex flex-col gap-4">
    <h3 class="text-xl font-semibold text-light-black">{title}</h3>
    <StarRating bind:rating />
    <Textarea
      label="Your message"
      rows="4"
      placeholder="Leave a comment..."
      unWrappedClass="!bg-white !border-gray-400 !text-gray-900"
      bind:value={comment}
      on:input={updateComment}
    />
  </div>
  <Button text="Confirm" class="mt-2 w-full bg-light-gray" on:click={submitReview} />
</Modal>
