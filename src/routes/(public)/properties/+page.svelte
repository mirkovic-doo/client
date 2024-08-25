<script lang="ts">
  import { PricingOption } from '$lib/api/apiAccommodation';
  import api from '$lib/auth/http';
  import SearchBar from '$lib/components/search/SearchBar.svelte';
  import { mapPropertyResponseToSearchProperty } from '$lib/mappers/property';
  import type { SearchProperty } from '$lib/types/property';
  import { Card } from 'flowbite-svelte';
  import { MagnifyingGlassSolid, PeopleGroupSolid, SackDollarSolid } from 'svelte-awesome-icons';

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

<SearchBar on:searchProperties={handleSearchProperties} />

<div class="grid gap-4 p-10 sm:grid-cols-2 md:grid-cols-4">
  {#if properties.length === 0}
    <div class="col-span-full text-xl text-gray-500 flex gap-4 justify-center items-center">
      <MagnifyingGlassSolid />No results
    </div>
  {:else}
    {#each properties as property}
      <Card img={property.photos[0]} class="dark:bg-grayscale-800">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {property.name}
        </h5>

        <div class="flex justify-between mt-4">
          <div class="flex gap-2"><PeopleGroupSolid />{property.minGuests}-{property.maxGuests}</div>

          <div class="flex flex-col">
            <div class="flex">
              <SackDollarSolid size="20" />/night{property.pricingOption === PricingOption.PerGuest
                ? ' per guest'
                : ''}: ${property.unitPrice}
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-1">
          <a href={`/properties/${property.id}`} class="text-purple-200 hover:underline">View Details </a>
          <div class="flex gap-2"><SackDollarSolid size="20" /> Total for stay: ${property.totalPrice}</div>
        </div>
      </Card>
    {/each}
  {/if}
</div>
