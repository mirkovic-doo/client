<script lang="ts">
  import { ReservationStatus, type ReservationResponse } from '$lib/api/apiAccommodation';
  import api from '$lib/auth/http';
  import userStore from '$lib/stores/userStore';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let reservations: ReservationResponse[] = [];

  onMount(async () => {
    await fetchReservations();
  });

  const fetchReservations = async () => {
    if ($userStore) {
      const response = await api.accommodationService.reservation.getGuestReservations($userStore.id);
      console.log(response.data);
      reservations = response.data;
    }
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
          reservations = reservations.filter((r) => r.id !== reservation.id);
        });
    }
  };

  const cancelReservation = async (reservationId: string) => {
    await api.accommodationService.reservation.cancelReservationGuest(reservationId);
  };

  const deleteReservation = async (reservationId: string) => {
    await api.accommodationService.reservation.deleteReservation(reservationId);
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
      {:else}
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
          <TableBodyCell>Property name</TableBodyCell>
          <TableBodyCell>{reservation.startDate}</TableBodyCell>
          <TableBodyCell>{reservation.endDate}</TableBodyCell>
          <TableBodyCell>{reservation.guests}</TableBodyCell>
          <TableBodyCell>{reservation.status}</TableBodyCell>
          {#if $userStore?.isGuest}
            <TableBodyCell tdClass="!text-red-700">
              <button
                on:click={() => removeReservation(reservation)}
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >{reservation.status === ReservationStatus.Pending ? 'Delete' : 'Cancel'}</button
              >
            </TableBodyCell>
          {:else}
            <TableBodyCell tdClass="!text-green-700">
              <a href="/reservations/edit" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Confirm</a
              >
            </TableBodyCell>
            <TableBodyCell tdClass="!text-red-700">
              <a href="/reservations/edit" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Reject</a
              >
            </TableBodyCell>
          {/if}
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
