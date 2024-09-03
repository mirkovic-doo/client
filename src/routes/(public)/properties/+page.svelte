<script lang="ts">
  import { goto } from '$app/navigation';
  import api from '$lib/auth/http';
  import PropertiesDisplay from '$lib/components/property/PropertiesDisplay.svelte';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import { mapPropertyResponseToSearchProperty } from '$lib/mappers/property';
  import type { SearchProperty } from '$lib/types/property';
  import toast from 'svelte-french-toast';

  export let searching = false;

  let properties: SearchProperty[] = [];
  let selectedLocation: string = '';
  let selectedArrivalDate: string = '';
  let selectedDepartureDate: string = '';
  let selectedGuestsNumber: number = 0;

  const fectchProperties = async (
    location: string,
    arrivalDate: string,
    departureDate: string,
    guestsNumber: number
  ) => {
    searching = true;
    selectedLocation = location;
    selectedArrivalDate = arrivalDate;
    selectedDepartureDate = departureDate;
    selectedGuestsNumber = guestsNumber;
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
      startDate: selectedArrivalDate,
      endDate: selectedDepartureDate,
      guests: selectedGuestsNumber,
      propertyId: propertyId,
    });
  };
</script>

<svelte:head>
  <title>Properties</title>
</svelte:head>

<div class="h-full w-full p-4">
  <SearchBar on:searchProperties={handleSearchProperties} {searching} />

  <PropertiesDisplay {properties} on:createReservation={handleCreateReservation} />
</div>
