<script lang="ts">
  import { goto } from '$app/navigation';
  import api from '$lib/auth/http';
  import PropertiesDisplay from '$lib/components/property/PropertiesDisplay.svelte';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import { mapPropertyResponseToSearchProperty } from '$lib/mappers/property';
  import authStore from '$lib/stores/authStore';
  import searchStore from '$lib/stores/searchStore';
  import type { SearchProperty } from '$lib/types/property';
  import { Button } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  export let searching = false;

  let properties: SearchProperty[] = [];

  onMount(async () => {
    if ($searchStore.location && $searchStore.arrivalDate && $searchStore.departureDate) {
      await fectchProperties(
        $searchStore.location,
        $searchStore.arrivalDate,
        $searchStore.departureDate,
        $searchStore.guestsNumber
      );
    }
  });

  const fectchProperties = async (
    location: string,
    arrivalDate: string,
    departureDate: string,
    guestsNumber: number
  ) => {
    searching = true;
    const response = await api.accommodationService.property.searchProperties({
      startDate: arrivalDate,
      endDate: departureDate,
      location: location,
      guests: guestsNumber,
    });
    properties = await Promise.all(
      response.data.map(async (property) => mapPropertyResponseToSearchProperty(property))
    );
    searching = false;
  };

  const handleSearchProperties = async (event: CustomEvent) => {
    $searchStore = {
      location: event.detail.location,
      arrivalDate: event.detail.arrivalDate,
      departureDate: event.detail.departureDate,
      guestsNumber: event.detail.guestsNumber,
    };
    await fectchProperties(
      event.detail.location,
      event.detail.arrivalDate,
      event.detail.departureDate,
      event.detail.guestsNumber
    );
  };

  const handleCreateReservation = async (event: CustomEvent) => {
    toast
      .promise(createReservation(event.detail), {
        loading: 'Creating reservation...',
        success: 'Successfully created reservation',
        error: (e) => e.message,
      })
      .then(() => {
        goto('/reservations');
      });
  };

  const createReservation = async (propertyId: string) => {
    await api.accommodationService.reservation.createReservation({
      startDate: $searchStore.arrivalDate,
      endDate: $searchStore.departureDate,
      guests: $searchStore.guestsNumber,
      propertyId: propertyId,
    });
  };

  const handleOpenProperty = (openEvent: CustomEvent) => {
    const property = openEvent.detail;
    goto(`/properties/profile?id=${property.id}`);
  };
</script>

<svelte:head>
  <title>Properties</title>
</svelte:head>

<div class="h-full w-full p-4 flex flex-col">
  {#if !$authStore.isLoggedIn}
    <Button class="rounded-xl mb-4 py-2 px-6 text-white bg-grayscale-800 w-fit ml-auto" on:click={() => goto('/login')}>
      Create an account
    </Button>
  {/if}
  <SearchBar on:searchProperties={handleSearchProperties} {searching} />

  <PropertiesDisplay
    {properties}
    explorable={true}
    on:open={handleOpenProperty}
    on:createReservation={handleCreateReservation}
  />
</div>
