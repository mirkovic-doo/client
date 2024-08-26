<script lang="ts">
  import { PricingOption } from '$lib/api/apiAccommodation';
  import DefaultHouse from '$lib/assets/default-house.png';
  import type { Property, SearchProperty } from '$lib/types/property';
  import { Card } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  import { CalendarDaySolid, PenSolid, PeopleGroupSolid, SackDollarSolid } from 'svelte-awesome-icons';

  export let property: Property | SearchProperty;
  export let editable: boolean = false;
  export let showPrice = true;

  const dispatch = createEventDispatcher();
</script>

<Card
  img={property.photos.length > 0 ? property.photos[0] : DefaultHouse}
  class="dark:bg-grayscale-800 relative hover:outline hover:outline-grayscale-700 property-card {$$restProps.class}"
>
  {#if editable}
    <button
      class="absolute top-1 right-1 rounded-full text-white p-3 bg-grayscale-800"
      on:click={() => dispatch('editProperty', property)}
    >
      <PenSolid size="18" class="focus:outline-none" />
    </button>
    <button
      class="absolute top-14 right-1 text-white rounded-full p-3 bg-grayscale-800"
      on:click={() => dispatch('changeAvailabilityPeriod', property)}
    >
      <CalendarDaySolid size="18" class="focus:outline-none" />
    </button>
  {/if}
  <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {property.name}
  </h5>

  <div class="flex justify-between mt-4">
    <div class="flex gap-2"><PeopleGroupSolid />{property.minGuests}-{property.maxGuests}</div>

    {#if showPrice}
      <div class="flex flex-col">
        <div class="flex">
          <SackDollarSolid size="20" />/night{property.pricingOption === PricingOption.PerGuest ? ' per guest' : ''}: ${'unitPrice' in
          property
            ? property.unitPrice
            : ''}
        </div>
      </div>
    {:else}
      <div class="flex flex-col gap-y-2 items-end">
        <div class="flex items-center">
          <div>Pricing option:</div>
          <div class="ml-2">
            {property.pricingOption === PricingOption.PerGuest ? 'Per guest' : 'Per unit'}
          </div>
        </div>
        <div class="flex items-center">
          <div>Reservation confirmation:</div>
          <div class="ml-2">
            {property.autoConfirmReservation ? 'Auto' : 'Manual'}
          </div>
        </div>
      </div>
    {/if}
  </div>
  {#if showPrice}
    <div class="flex justify-between mt-1">
      <a href={`/properties/${property.id}`} class="text-purple-200 hover:underline">View Details </a>
      {#if 'totalPrice' in property}
        <div class="flex gap-2"><SackDollarSolid size="20" /> Total for stay: ${property.totalPrice}</div>
      {/if}
    </div>
  {/if}
</Card>
