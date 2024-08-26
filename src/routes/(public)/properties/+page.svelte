<script lang="ts">
  import api from '$lib/auth/http';
  import PropertiesDisplay from '$lib/components/property/PropertiesDisplay.svelte';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import { mapPropertyResponseToSearchProperty } from '$lib/mappers/property';
  import type { SearchProperty } from '$lib/types/property';

  let properties: SearchProperty[] = [];

  const fectchProperties = async (
    location: string,
    arrivalDate: string,
    departureDate: string,
    guestsNumber: number
  ) => {
    const response = await api.accommodationService.property.searchProperties({
      startDate: arrivalDate,
      endDate: departureDate,
      location: location,
      guests: guestsNumber,
    });
    properties = await Promise.all(
      response.data.map(async (property) => mapPropertyResponseToSearchProperty(property))
    );
  };

  const handleSearchProperties = async (event: CustomEvent) => {
    await fectchProperties(
      event.detail.location,
      event.detail.arrivalDate,
      event.detail.departureDate,
      event.detail.guestsNumber
    );
  };
</script>

<svelte:head>
  <title>Properties</title>
</svelte:head>

<div class="h-full w-full p-4">
  <SearchBar on:searchProperties={handleSearchProperties} />

  <PropertiesDisplay {properties} />
</div>
