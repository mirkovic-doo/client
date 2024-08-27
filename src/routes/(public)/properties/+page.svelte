<script lang="ts">
  import api from '$lib/auth/http';
  import PropertiesDisplay from '$lib/components/property/PropertiesDisplay.svelte';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import { mapPropertyResponseToSearchProperty } from '$lib/mappers/property';
  import type { SearchProperty } from '$lib/types/property';

  let properties: SearchProperty[] = [];
  export let searching = false;

  const fectchProperties = async (
    location: string,
    arrivalDate: string,
    departureDate: string,
    guestsNumber: number
  ) => {
    searching = true;
    const response = await api.accommodationService.property.searchProperties({
      startDate: '2024-09-05',
      endDate: '2024-09-10',
      location: 'Los Angeles',
      guests: 5,
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

  const createReservation = async (propertyId: string) => {
    const response = await api.accommodationService.reservation.createReservation({
      startDate: '2024-09-05',
      endDate: '2024-09-10',
      guests: 5,
      propertyId: propertyId,
    });

    console.log(response.data);
  };
</script>

<svelte:head>
  <title>Properties</title>
</svelte:head>

<div class="h-full w-full p-4">
  <SearchBar on:searchProperties={handleSearchProperties} {searching} />

  <PropertiesDisplay {properties} />
</div>
