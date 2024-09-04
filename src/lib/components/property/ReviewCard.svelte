<script lang="ts">
  import { ReviewType } from '$lib/api/apiReview';
  import userStore from '$lib/stores/userStore';
  import type { Review } from '$lib/types/review';
  import { createEventDispatcher } from 'svelte';
  import { PenToSquareSolid, StarSolid, TrashCanSolid } from 'svelte-awesome-icons';
  import LeaveReviewModal from '../review/LeaveReviewModal.svelte';
  import ConfirmationModal from './ConfirmationModal.svelte';

  export let review: Review;

  let isDeleteReviewModalOpen: boolean = false;
  let isUpdateReviewModalOpen: boolean = false;

  let rating: number = review.rating;
  let comment: string = review.comment;

  const dispatch = createEventDispatcher();

  const onDeleteReview = () => {
    dispatch('deleteReview', review);
  };

  const onUpdateReview = () => {
    dispatch('updateReview', { review: review, comment, rating });
  };
</script>

<div class="flex flex-col gap-y-2 border border-grayscale-800 rounded-xl p-4">
  <div class="flex justify-between">
    <div class="text-[18px] font-semibold flex items-center">
      <span>
        Rating: {review.rating}
      </span>
      <StarSolid color="yellow" size="15" class="focus:outline-none ml-2" />
    </div>
    {#if review.createdBy.id === $userStore?.id}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flex gap-3">
        <div on:click={() => (isUpdateReviewModalOpen = true)}>
          <PenToSquareSolid color="lightgray" size="15" class="focus:outline-none cursor-pointer" />
        </div>
        <div on:click={() => (isDeleteReviewModalOpen = true)}>
          <TrashCanSolid color="red" size="15" class="focus:outline-none cursor-pointer" />
        </div>
      </div>
    {/if}
  </div>
  <div>From: {review.createdBy.firstName} {review.createdBy.lastName}</div>
  <div class="break-words max-w-[300px]">
    {review.comment}
  </div>

  <ConfirmationModal
    bind:open={isDeleteReviewModalOpen}
    title="Delete Review"
    content="Are you sure you want to delete this review?"
    confirmText="Confirm"
    onConfirm={onDeleteReview}
  />

  <LeaveReviewModal
    bind:open={isUpdateReviewModalOpen}
    on:submitReview={onUpdateReview}
    bind:rating
    bind:comment
    title={review.type === ReviewType.Host ? 'Update the Review for Host' : 'Update the Review for Property'}
  />
</div>
