<script lang="ts">
  import { PricingOption } from '$lib/api/apiAccommodation';
  import DefaultHouse from '$lib/assets/default-house.png';
  import authStore from '$lib/stores/authStore';
  import type { Property, SearchProperty } from '$lib/types/property';
  import { Card } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  import { CalendarDaySolid, EyeSolid, PenSolid, PeopleGroupSolid, SackDollarSolid } from 'svelte-awesome-icons';
  import Button from '../common/Button.svelte';
  import ConfirmationModal from './ConfirmationModal.svelte';

  export let property: Property | SearchProperty;
  export let editable: boolean = false;
  export let showPrice = true;
  export let explorable = false;

  let isConfirmModalOpen = false;

  const dispatch = createEventDispatcher();

  const handleReservation = () => {
    dispatch('createReservation', property.id);
  };
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
  {#if explorable}
    <button
      class="absolute top-1 right-1 rounded-full text-white p-3 bg-grayscale-800"
      on:click={() => dispatch('open', property)}
    >
      <EyeSolid size="18" class="focus:outline-none" />
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
          <div>Auto Confirm:</div>
          <div class="ml-2">
            {property.autoConfirmReservation ? 'Auto' : 'Manual'}
          </div>
        </div>
      </div>
    {/if}
  </div>
  {#if showPrice}
    <div class="flex justify-between mt-1">
      <a href={`/properties/profile?id=${property.id}`} class="text-purple-200 hover:underline">View Details </a>
      {#if 'totalPrice' in property}
        <div class="flex gap-2"><SackDollarSolid size="20" /> Total for stay: ${property.totalPrice}</div>
      {/if}
    </div>
    {#if $authStore.isLoggedIn}
      <div class="flex mt-4">
        <Button text="Reserve" on:click={() => (isConfirmModalOpen = true)} extendClass="ml-auto" />
      </div>
    {/if}
  {/if}

  <ConfirmationModal
    bind:open={isConfirmModalOpen}
    title="Confirm Reservation"
    content="Are you sure you want to reserve this property?"
    confirmText="Confirm"
    onConfirm={handleReservation}
  />
</Card>
