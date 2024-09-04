<script lang="ts">
  import { goto } from '$app/navigation';
  import { ReservationStatus, type ReservationResponse } from '$lib/api/apiAccommodation';
  import { ReviewType } from '$lib/api/apiReview';
  import api from '$lib/auth/http';
  import LeaveReviewModal from '$lib/components/review/LeaveReviewModal.svelte';
  import { mapReservationResponseToReservation } from '$lib/mappers/reservation';
  import userStore from '$lib/stores/userStore';
  import type { Reservation } from '$lib/types/reservation';
  import { reservationStatusMessages } from '$lib/utils/constants';
  import { formatToDateDisplay } from '$lib/utils/date';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let reservations: Reservation[] = [];
  let isReviewModalOpen: boolean = false;
  let selectedReservation: Reservation | null = null;
  let rating: number = 0;
  let comment: string = '';
  let reviewType: ReviewType = ReviewType.Host;

  onMount(async () => {
    if ($userStore?.isGuest) {
      await fetchGuestReservations();
    } else {
      await fetchHostReservations();
    }
  });

  const fetchGuestReservations = async () => {
    const response = await api.accommodationService.reservation.getGuestReservations($userStore?.id ?? '');
    const reservationsData = response.data.map((reservation) => mapReservationResponseToReservation(reservation));

    const reviewsResponse = await api.reviewService.review.getMyReviews();
    const reviews = reviewsResponse.data;

    reservations = reservationsData
      .map((reservation) => {
        const hasHostReview = reviews.some(
          (review) => review.reservationId === reservation.id && review.type === ReviewType.Host
        );
        const hasPropertyReview = reviews.some(
          (review) => review.reservationId === reservation.id && review.type === ReviewType.Property
        );

        return {
          ...reservation,
          hasHostReview,
          hasPropertyReview,
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const fetchHostReservations = async () => {
    const response = await api.accommodationService.reservation.getHostReservations($userStore?.id ?? '');
    reservations = response.data
      .map((reservation) => mapReservationResponseToReservation(reservation))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const updatedReservations = await Promise.all(
      reservations.map(async (reservation) => {
        const cancellationsCount = await fecthCountOfPreviousCancellations(reservation.createdById ?? '');
        return {
          ...reservation,
          cancellationsCount,
        };
      })
    );

    reservations = updatedReservations;
  };

  const removeReservation = async (reservation: ReservationResponse) => {
    if (reservation.status === ReservationStatus.Pending) {
      toast
        .promise(deleteReservation(reservation.id ?? ''), {
          loading: 'Deleting reservation...',
          success: 'Successfully deleted reservation',
          error: (e) => e.message,
        })
        .then(() => {
          reservations = reservations.filter((r) => r.id !== reservation.id);
        });
    } else {
      toast
        .promise(cancelReservation(reservation.id ?? ''), {
          loading: 'Cancelling reservation...',
          success: 'Successfully cancelled reservation',
          error: (e) => e.message,
        })
        .then(() => {
          reservations = reservations.map((r) =>
            r.id === reservation.id ? { ...r, status: ReservationStatus.GuestCancelled } : r
          );
        });
    }
  };

  const handleRejectReservation = async (reservation: ReservationResponse) => {
    toast
      .promise(rejectReservation(reservation.id ?? ''), {
        loading: 'Cancelling reservation...',
        success: 'Successfully cancelled reservation',
        error: (e) => e.message,
      })
      .then(() => {
        reservations = reservations.map((r) =>
          r.id === reservation.id ? { ...r, status: ReservationStatus.HostCancelled } : r
        );
      });
  };

  const handleConfirmReservation = async (reservation: ReservationResponse) => {
    toast
      .promise(confirmReservation(reservation.id ?? ''), {
        loading: 'Confirming reservation...',
        success: 'Successfully confirmed reservation',
        error: (e) => e.message,
      })
      .then(async () => {
        await fetchHostReservations();
      });
  };

  const handleSubmitReview = async () => {
    toast
      .promise(leaveReview(), {
        loading: 'Submitting your review...',
        success: 'Review submitted successfully!',
        error: (e) => `Failed to submit review: ${e.message}`,
      })
      .then(() => {
        reservations = reservations.map((r) =>
          r.id === selectedReservation?.id
            ? {
                ...r,
                hasHostReview: reviewType === ReviewType.Host ? true : r.hasHostReview,
                hasPropertyReview: reviewType === ReviewType.Property ? true : r.hasPropertyReview,
              }
            : r
        );
      });
  };

  const cancelReservation = async (reservationId: string) => {
    await api.accommodationService.reservation.cancelReservationGuest(reservationId);
  };

  const deleteReservation = async (reservationId: string) => {
    await api.accommodationService.reservation.deleteReservation(reservationId);
  };

  const rejectReservation = async (reservationId: string) => {
    await api.accommodationService.reservation.cancelReservationHost(reservationId);
  };

  const confirmReservation = async (reservationId: string) => {
    await api.accommodationService.reservation.confirmReservation(reservationId);
  };

  const leaveReview = async () => {
    let revieweeId = selectedReservation?.propertyId;
    if (reviewType === ReviewType.Host) {
      const propertyResponse = await api.accommodationService.property.getProperty(
        selectedReservation?.propertyId ?? ''
      );
      revieweeId = propertyResponse.data.createdById;
    }
    await api.reviewService.review.createReview({
      reservationId: selectedReservation?.id,
      revieweeId: revieweeId,
      type: reviewType,
      comment: comment,
      rating: rating,
    });
  };

  const fecthCountOfPreviousCancellations = async (guestId: string) => {
    const response = await api.accommodationService.reservation.getNumberOfCancelledReservations(guestId);
    return response.data.canceledNum;
  };

  const handleOpenProperty = (propertyId: string) => {
    goto(`/properties/profile?id=${propertyId}`);
  };
</script>

<svelte:head>
  <title>Reservations</title>
</svelte:head>

<div class="p-10">
  <Table striped={true} hoverable={true} customeColor="#3a3642" color="custom">
    <TableHead>
      <TableHeadCell>Property</TableHeadCell>
      <TableHeadCell>Start Date</TableHeadCell>
      <TableHeadCell>End Date</TableHeadCell>
      <TableHeadCell>Guests</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
      {#if $userStore?.isGuest}
        <TableHeadCell>
          <span class="sr-only">Cancel</span>
        </TableHeadCell>
        <TableHeadCell>
          <span class="sr-only">Rate Host</span>
        </TableHeadCell>
        <TableHeadCell>
          <span class="sr-only">Rate Property</span>
        </TableHeadCell>
      {:else}
        <TableHeadCell>Cancellations</TableHeadCell>
        <TableHeadCell>
          <span class="sr-only">Confirm</span>
        </TableHeadCell>
        <TableHeadCell>
          <span class="sr-only">Reject</span>
        </TableHeadCell>
      {/if}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each reservations as reservation}
        <TableBodyRow>
          <TableBodyCell
            ><button
              on:click={() => handleOpenProperty(reservation.propertyId)}
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >{reservation.propertyName}</button
            ></TableBodyCell
          >
          <TableBodyCell>{formatToDateDisplay(reservation.startDate)}</TableBodyCell>
          <TableBodyCell>{formatToDateDisplay(reservation.endDate)}</TableBodyCell>
          <TableBodyCell>{reservation.guests}</TableBodyCell>
          <TableBodyCell>{reservationStatusMessages[reservation.status]}</TableBodyCell>
          {#if $userStore?.isGuest}
            <TableBodyCell tdClass="!text-red-700">
              <button
                on:click={() => removeReservation(reservation)}
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >{reservation.status === ReservationStatus.Pending
                  ? 'Delete'
                  : reservation.status === ReservationStatus.Confirmed && new Date(reservation.startDate) > new Date()
                  ? 'Cancel'
                  : ''}</button
              >
            </TableBodyCell>
            <TableBodyCell>
              {#if reservation.status === ReservationStatus.Confirmed && new Date() > new Date(reservation.endDate) && !reservation.hasHostReview}
                <button
                  on:click={() => {
                    selectedReservation = reservation;
                    reviewType = ReviewType.Host;
                    isReviewModalOpen = true;
                  }}
                  class="font-medium text-primary-600 underline">Rate host</button
                >
              {/if}
            </TableBodyCell>
            <TableBodyCell>
              {#if reservation.status === ReservationStatus.Confirmed && new Date() > new Date(reservation.endDate) && !reservation.hasPropertyReview}
                <button
                  on:click={() => {
                    selectedReservation = reservation;
                    reviewType = ReviewType.Property;
                    isReviewModalOpen = true;
                  }}
                  class="font-medium text-primary-600 underline">Rate property</button
                >
              {/if}
            </TableBodyCell>
          {:else}
            <TableBodyCell>{reservation.cancellationsCount}</TableBodyCell>

            <TableBodyCell tdClass="!text-green-700">
              {#if reservation.status === ReservationStatus.Pending}
                <button
                  on:click={() => handleConfirmReservation(reservation)}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Confirm</button
                >
              {/if}
            </TableBodyCell>
            <TableBodyCell tdClass="!text-red-700">
              {#if reservation.status === ReservationStatus.Pending}
                <button
                  on:click={() => handleRejectReservation(reservation)}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Reject</button
                >
              {/if}
            </TableBodyCell>
          {/if}
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <LeaveReviewModal
    bind:open={isReviewModalOpen}
    on:submitReview={handleSubmitReview}
    bind:rating
    bind:comment
    title={reviewType === ReviewType.Host ? 'Leave a Review for Host' : 'Leave a Review for Property'}
  />
</div>
