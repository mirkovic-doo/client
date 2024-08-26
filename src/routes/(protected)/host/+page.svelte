<script lang="ts">
  import { goto } from '$app/navigation';
  import api from '$lib/auth/http';
  import PropertiesDisplay from '$lib/components/property/PropertiesDisplay.svelte';
  import { mapPropertyResponseToProperty } from '$lib/mappers/property';
  import type { Property } from '$lib/types/property';
  import { onMount } from 'svelte';
  import { PlusSolid } from 'svelte-awesome-icons';

  let properties: Property[] = [];

  onMount(() => {
    getMyProperties();
  });

  const getMyProperties = async () => {
    const response = await api.accommodationService.property.getMyProperties();

    properties = response.data
      ? await Promise.all(response.data.map(async (property) => mapPropertyResponseToProperty(property)))
      : [];
  };
</script>

<svelte:head>
  <title>Host Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-y-4 w-full h-full items-center justify-start relative">
  <div class="mt-8 text-2xl font-bold">Manage your properties and take your business to the next level</div>

  <PropertiesDisplay
    {properties}
    noResultsMessage="You do not have any properties added"
    showPrice={false}
    editable={true}
    on:editProperty={(e) => goto(`/host/property?id=${e.detail.id}`)}
  />

  <button class="fixed bottom-10 right-10 bg-amber-700 p-5 rounded-full" on:click={() => goto('/host/property')}>
    <PlusSolid size="26" class="outline-none" />
  </button>
</div>
