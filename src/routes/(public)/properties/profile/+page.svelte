<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { PricingOption } from '$lib/api/apiAccommodation';
  import { ReviewType } from '$lib/api/apiReview';
  import api from '$lib/auth/http';
  import StoragePhotoDisplayer from '$lib/components/common/StoragePhotoDisplayer.svelte';
  import ReviewCard from '$lib/components/property/ReviewCard.svelte';
  import { mapPropertyResponseToProperty } from '$lib/mappers/property';
  import { mapReviewResponseToReview } from '$lib/mappers/review';
  import authStore from '$lib/stores/authStore';
  import type { Property } from '$lib/types/property';
  import type { Review } from '$lib/types/review';
  import { Button, Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { LockSolid } from 'svelte-awesome-icons';
  import toast from 'svelte-french-toast';

  let id: string | null = $page.url?.searchParams.get('id') ?? null;
  let property: Property | null = null;
  let loading = true;
  let hostReviews: Review[] = [];
  let propertyReviews: Review[] = [];

  onMount(() => {
    if (!id) {
      goto('/properties');
    }

    getData();
  });

  const getData = async () => {
    loading = true;
    await getProperty();
    await getReviews();
    loading = false;
  };

  const getProperty = async () => {
    if (id) {
      const response = await api.accommodationService.property.getProperty(id);
      property = await mapPropertyResponseToProperty(response.data);
    }
  };

  const getReviews = async () => {
    if (property && property.createdById && $authStore.isLoggedIn) {
      const propertyReviewsResponse = await api.reviewService.review.getRevieweeReviews(property.id);
      propertyReviewsResponse.data.forEach(async (element) => {
        const mappedReview = await mapReviewResponseToReview(element);
        propertyReviews = [...propertyReviews, mappedReview];
      });

      const hostReviewsResponse = await api.reviewService.review.getRevieweeReviews(property.createdById);
      hostReviewsResponse.data.forEach(async (element) => {
        const mappedReview = await mapReviewResponseToReview(element);
        hostReviews = [...hostReviews, mappedReview];
      });
    }
  };

  const handleDeleteReview = async (event: CustomEvent) => {
    const review = event.detail as Review;
    toast
      .promise(deleteReview(review.id ?? ''), {
        loading: 'Deleting review...',
        success: 'Successfully deleted review',
        error: (e) => e.message,
      })
      .then(() => {
        if (review.type === ReviewType.Host) {
          hostReviews = hostReviews.filter((r) => r.id !== review.id);
        } else {
          propertyReviews = propertyReviews.filter((r) => r.id !== review.id);
        }
      });
  };

  const deleteReview = async (reviewId: string) => {
    await api.reviewService.review.deleteReview(reviewId);
  };

  const handleUpdateReview = async (event: CustomEvent) => {
    const review = event.detail.review as Review;
    const updatedComment = event.detail.comment;
    const updatedRating = event.detail.rating;
    toast
      .promise(updateReview(review.id ?? '', updatedComment, updatedRating), {
        loading: 'Updating review...',
        success: 'Successfully updated review',
        error: (e) => e.message,
      })
      .then(() => {
        if (review.type === ReviewType.Host) {
          hostReviews = hostReviews.map((r) =>
            r.id === review.id ? { ...r, comment: updatedComment, rating: updatedRating } : r
          );
        } else {
          propertyReviews = propertyReviews.map((r) =>
            r.id === review.id ? { ...r, comment: updatedComment, rating: updatedRating } : r
          );
        }
      });
  };

  const updateReview = async (reviewId: string, comment: string, rating: number) => {
    await api.reviewService.review.updateReview({ id: reviewId, comment, rating });
  };
</script>

{#if loading}
  <div class="w-full h-[90%] flex">
    <Spinner size="20" color="white" class="m-auto" />
  </div>
{:else if property}
  <div class="flex items-start h-[90%] p-10 relative">
    <div class="flex flex-col gap-y-10 basis-4/5 h-full">
      <div>
        Property: <span class="font-bold text-2xl"> {property.name}</span>
      </div>
      <div class="flex items-center flex-wrap gap-4">
        {#each property.photos as photo, index}
          <StoragePhotoDisplayer
            alt="property {index}"
            {photo}
            loaded={true}
            class="h-[250px] w-[400px] rounded-xl shadow-xl box-border hover:animate-spin"
          />
        {/each}
      </div>
      <div>
        Location: <span class="font-bold text-xl"> {property.location}</span>
      </div>
      <div>
        Amenities: <span class="font-bold text-xl"> {property.amenities.join(', ')}</span>
      </div>
      <div>
        Guests: <span class="font-bold text-xl"> {property.minGuests} - {property.maxGuests}</span>
      </div>
      <div>
        Price: <span class="font-bold text-xl">
          {property.pricingOption === PricingOption.PerGuest ? 'Per guest' : 'Whole house'}</span
        >
      </div>
      <div>
        Requiring confirmation from the owner: <span class="font-bold text-xl">
          {property.autoConfirmReservation ? 'No' : 'Yes'}</span
        >
      </div>
    </div>
    <div class="basis-1/5 h-full w-full">
      {#if !$authStore.isLoggedIn}
        <div class="flex flex-col items-center gap-y-4">
          <div class="font-bold text-3xl">Reviews:</div>
          <div class="flex items-center gap-x-4">
            <span class="text-[18px]">You have to be logged in to see reviews</span>
            <LockSolid size="22" color="white" class="focus:outline-none" />
          </div>
        </div>
      {:else}
        <div class="flex flex-col">
          <div class="flex flex-col gap-y-1 h-[350px] overflow-auto">
            <div class="text-2xl font-semibold">Property reviews:</div>
            <div class="overflow-auto">
              {#each propertyReviews as review}
                <ReviewCard {review} on:deleteReview={handleDeleteReview} on:updateReview={handleUpdateReview} />
              {/each}
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-1 h-[350px] mt-10">
          <div class="text-2xl font-semibold sticky">Host reviews:</div>
          <div class="overflow-auto">
            {#each hostReviews as review}
              <ReviewCard {review} on:deleteReview={handleDeleteReview} on:updateReview={handleUpdateReview} />
            {/each}
          </div>
        </div>
      {/if}
    </div>

    {#if !$authStore.isLoggedIn}
      <Button
        class="absolute bottom-10 right-10 rounded-xl py-2 px-6 text-white bg-grayscale-800 w-fit ml-auto"
        on:click={() => goto('/login')}
      >
        Create an account
      </Button>
    {/if}
  </div>
{/if}
