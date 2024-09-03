<script>
  import { Select } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';
  import { MagnifyingGlassSolid } from 'svelte-awesome-icons';
  import toast from 'svelte-french-toast';

  export let searching = false;

  let location = '';
  let arrivalDate = '';
  let departureDate = '';
  let guestsNumber = 1;
  let guestsNumberOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const dispatch = createEventDispatcher();

  const search = () => {
    if (!location || !arrivalDate || !departureDate) {
      toast.error('Please complete all search fields to proceed.');
      return;
    }
    dispatch('searchProperties', { location, arrivalDate, departureDate, guestsNumber });
  };
</script>

<div class="flex items-center bg-grayscale-800 py-2 px-4 rounded-2xl shadow w-[80%] mx-auto">
  <div class="flex flex-grow items-center justify-between px-4">
    <div class="flex flex-col">
      <label for="location" class="text-sm font-semibold">Where</label>
      <input
        id="location"
        type="text"
        bind:value={location}
        class="border-none focus:text-gray-200 focus:ring-0 text-gray-200 placeholder-gray-200 px-0 bg-transparent"
        placeholder="Enter destination"
      />
    </div>

    <div class="h-8 w-px bg-gray-200" />

    <div class="flex flex-col">
      <label for="arrivalDate" class="text-sm font-semibold">Arrival Date</label>
      <input
        id="arrivalDate"
        type="date"
        min={new Date().toISOString().split('T')[0]}
        max={departureDate}
        bind:value={arrivalDate}
        class="border-none focus:ring-0 text-gray-200 placeholder-gray-200 px-0 bg-transparent"
      />
    </div>

    <div class="h-8 w-px bg-gray-200" />

    <div class="flex flex-col">
      <label for="departureDate" class="text-sm font-semibold">Departure Date</label>
      <input
        id="departureDate"
        type="date"
        min={arrivalDate || new Date().toISOString().split('T')[0]}
        bind:value={departureDate}
        class="border-none focus:ring-0 text-gray-200 placeholder-gray-200 px-0 bg-transparent"
      />
    </div>

    <div class="h-8 w-px bg-gray-200" />

    <div class="flex flex-col">
      <label for="guests" class="text-sm font-semibold">Guests</label>
      <Select class="mt-2 bg-transparent dark:bg-transparent border-none focus:ring-0" bind:value={guestsNumber}>
        {#each guestsNumberOptions as option}
          <option value={option} class="bg-grayscale-800 text-white">{option}</option>
        {/each}
      </Select>
    </div>
  </div>

  <button
    class="flex items-center justify-center bg-purple-600 text-white rounded-full p-4 hover:bg-purple-800 disabled:opacity-50 {searching
      ? 'animate-spin'
      : ''}"
    disabled={searching}
    on:click={search}
  >
    <MagnifyingGlassSolid size="16" class="focus:outline-none" />
  </button>
</div>

<style>
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(87%) sepia(0%) saturate(0%) hue-rotate(255deg) brightness(93%) contrast(87%);
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #353537 inset !important;
    -webkit-text-fill-color: #ffffff !important;
  }
</style>
