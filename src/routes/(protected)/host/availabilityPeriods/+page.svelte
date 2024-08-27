<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import api from '$lib/auth/http';
  import PropertyCard from '$lib/components/property/PropertyCard.svelte';
  import {
    mapAvailabilityPeriodResponseToAvailabilityPeriod,
    mapAvailabilityPeriodToRequest,
  } from '$lib/mappers/availabilityPeriod';
  import { mapPropertyResponseToProperty } from '$lib/mappers/property';
  import type { AvailabilityPeriod } from '$lib/types/availabilityPeriod';
  import type { Property } from '$lib/types/property';
  import { getCurrentDateFormatted } from '$lib/utils/date';
  import { Input, Label, Spinner } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import { PlusSolid, XmarkSolid } from 'svelte-awesome-icons';
  import toast from 'svelte-french-toast';

  let propertyId: string | null = $page.url?.searchParams.get('propertyId') ?? null;
  let property: Property | null = null;
  let availabilityPeriods: AvailabilityPeriod[] = [];
  let availabilityPeriod: AvailabilityPeriod | null = null;
  let loading = true;
  let editAddDialogRender = false;

  onMount(async () => {
    if (!propertyId) {
      await goto('/host');
    }

    await getData();
  });

  const getData = async () => {
    loading = true;
    if (propertyId) {
      const propertyResponse = await api.accommodationService.property.getProperty(propertyId);
      property = await mapPropertyResponseToProperty(propertyResponse.data);

      await getAvailabilityPeriods();
    }
    loading = false;
  };

  const getAvailabilityPeriods = async () => {
    if (propertyId) {
      const response = await api.accommodationService.availabilityperiod.getAvailabilityPeriodsByPropertyId(propertyId);
      availabilityPeriods = response.data.map(mapAvailabilityPeriodResponseToAvailabilityPeriod);
    }
  };

  const handleAddNewPeriod = () => {
    availabilityPeriod = {
      startDate: getCurrentDateFormatted(),
      endDate: getCurrentDateFormatted(),
      pricePerDay: 100,
      propertyId: propertyId ?? '',
      id: '',
    };
    editAddDialogRender = true;
  };

  const handleClose = () => {
    availabilityPeriod = null;
    editAddDialogRender = false;
  };

  const handleAvailabilityPeriodSubmit = async () => {
    if (availabilityPeriod) {
      const request = mapAvailabilityPeriodToRequest(availabilityPeriod);
      if (availabilityPeriod.id !== '') {
        await toast.promise(api.accommodationService.availabilityperiod.updateAvailabilityPeriod(request), {
          loading: 'Updating availability period...',
          success: 'Successfully updated availability period',
          error: 'Period is overlapping, please change the dates',
        });
      } else {
        await toast.promise(api.accommodationService.availabilityperiod.createAvailabilityPeriod(request), {
          loading: 'Creating availability period...',
          success: 'Successfully created availability period',
          error: 'Period is overlapping, please change the dates',
        });
      }
      await getAvailabilityPeriods();
      handleClose();
    }
  };

  const handleDelete = async (period: AvailabilityPeriod) => {
    await toast.promise(api.accommodationService.availabilityperiod.deleteAvailabilityPeriod(period.id), {
      loading: 'Deleting availability period...',
      success: 'Successfully deleted availability period',
      error: 'Failed to delete availability period',
    });

    await getAvailabilityPeriods();
  };

  const handleEditPeriod = (period: AvailabilityPeriod) => {
    availabilityPeriod = period;
    editAddDialogRender = true;
  };
</script>

{#if editAddDialogRender && availabilityPeriod}
  <div class="blur-sm absolute w-full h-full z-[1]" />

  <dialog open={true} class=" top-10 bg-grayscale-800 border-gray-500 border rounded-xl text-white z-[99]">
    <div class="flex flex-col gap-y-10 p-10 relative">
      <button class="absolute top-4 right-4" on:click={handleClose}>
        <XmarkSolid size="20" class="focus:outline-none" />
      </button>
      <h2 class="text-xl font-semibold">
        {availabilityPeriod.id !== '' ? 'Update' : 'Add'} availability period for property:
      </h2>
      <div class="flex flex-col gap-y-1">
        <Label for="pricePerDay" class="text-sm font-semibold">Price per day</Label>
        <Input type="number" class="!bg-grayscale-800" bind:value={availabilityPeriod.pricePerDay} min={0} />
        {#if availabilityPeriod.pricePerDay <= 0}
          <div class="text-red-500 text-sm font-light">Price per day must be greater than 0</div>
        {/if}
      </div>
      <div class="flex flex-col gap-y-1">
        <div class="flex w-full gap-x-2">
          <div class="flex flex-col gap-y-1 w-full">
            <Label for="startDate" class="text-sm font-semibold">Available from</Label>
            <Input type="date" class="!bg-grayscale-800" bind:value={availabilityPeriod.startDate} min={'2024-08-26'} />
          </div>
          <div class="flex flex-col gap-y-1 w-full">
            <Label for="endDate" class="text-sm font-semibold">Available until</Label>
            <Input
              type="date"
              class="!bg-grayscale-800"
              bind:value={availabilityPeriod.endDate}
              min={availabilityPeriod.startDate}
            />
          </div>
        </div>
        {#if availabilityPeriod.startDate > availabilityPeriod.endDate}
          <div class="text-red-500 text-sm font-light">Available until must be greater than available from</div>
        {/if}
      </div>
      <button
        disabled={availabilityPeriod.pricePerDay <= 0 || availabilityPeriod.startDate > availabilityPeriod.endDate}
        class="border-white border rounded-full px-4 py-2 disabled:opacity-50"
        on:click={handleAvailabilityPeriodSubmit}
      >
        {availabilityPeriod.id !== '' ? 'Update' : 'Add'}
      </button>
    </div>
  </dialog>
{/if}
{#if !loading && property}
  <div class="w-full flex flex-wrap gap-4 p-10 items-end {editAddDialogRender && availabilityPeriod ? 'blur-sm ' : ''}">
    <div class="flex flex-col justify-between h-[450px] w-[390px]">
      <h2 class="text-xl font-semibold">Defining availability periods for property:</h2>
      <PropertyCard showPrice={false} editable={false} {property} />
    </div>

    {#each availabilityPeriods as period, index (period.id)}
      <div
        class="flex flex-col gap-y-8 h-[410px] rounded-xl p-10 items-start text-xl font-medium w-[390px] bg-grayscale-800"
      >
        <div class="text-sm font-normal">
          Period order: {index + 1}
        </div>
        <div>
          Price per day: {period.pricePerDay}
        </div>
        <div class="flex flex-col gap-y-5">
          <div>
            Availabile from: {period.startDate}
          </div>
          <div>
            Availabile until: {period.endDate}
          </div>
        </div>

        <div class="flex w-full items-center mt-auto gap-x-4 text-[16px] font-normal">
          <button class="bg-orange-600 border w-full p-2 rounded-full" on:click={() => handleEditPeriod(period)}
            >Edit</button
          >
          <button class="border w-full p-2 rounded-full" on:click={() => handleDelete(period)}>Delete</button>
        </div>
      </div>
    {/each}

    <button class="bg-grayscale-800 rounded-full my-auto ml-10 p-6" on:click={handleAddNewPeriod}>
      <PlusSolid size="30" class="outline-none" color="white" />
    </button>
  </div>
{:else}
  <Spinner size="20" color="white" class="m-auto" />
{/if}
