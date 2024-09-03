<script lang="ts">
  import { ReservationStatus, type ReservationResponse } from '$lib/api/apiAccommodation';
  import api from '$lib/auth/http';
  import { mapReservationResponseToReservation } from '$lib/mappers/reservation';
  import userStore from '$lib/stores/userStore';
  import type { Reservation } from '$lib/types/reservation';
  import { reservationStatusMessages } from '$lib/utils/constants';
  import { formatToDateDisplay } from '$lib/utils/date';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let reservations: Reservation[] = [];

  onMount(async () => {
    if ($userStore?.isGuest) {
      await fetchGuestReservations();
    } else {
      await fetchHostReservations();
    }
  });

  const fetchGuestReservations = async () => {
    const response = await api.accommodationService.reservation.getGuestReservations($userStore?.id ?? '');
    reservations = response.data
      .map((reservation) => mapReservationResponseToReservation(reservation))
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
    console.log(updatedReservations);
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

  const fecthCountOfPreviousCancellations = async (guestId: string) => {
    const response = await api.accommodationService.reservation.getNumberOfCancelledReservations(guestId);
    return response.data.canceledNum;
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
          <TableBodyCell>{reservation.propertyName}</TableBodyCell>
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
</div>
