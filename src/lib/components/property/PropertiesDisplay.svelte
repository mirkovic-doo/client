<script lang="ts">
  import type { Property, SearchProperty } from '$lib/types/property';
  import { MagnifyingGlassSolid } from 'svelte-awesome-icons';
  import PropertyCard from './PropertyCard.svelte';

  export let properties: (SearchProperty | Property)[] = [];
  export let noResultsMessage: string = 'No results';
  export let showPrice: boolean = true;
  export let editable: boolean = false;
</script>

<div class="grid gap-4 p-10 sm:grid-cols-2 md:grid-cols-4">
  {#if properties.length === 0}
    <div class="col-span-full text-xl text-gray-500 flex gap-4 justify-center items-center">
      <MagnifyingGlassSolid />
      {noResultsMessage}
    </div>
  {:else}
    {#each properties as property}
      <PropertyCard {property} {showPrice} {editable} on:changeAvailabilityPeriod on:editProperty />
    {/each}
  {/if}
</div>

<style>
  :global(.property-card img) {
    height: 240px;
    width: 400px;
  }
</style>
