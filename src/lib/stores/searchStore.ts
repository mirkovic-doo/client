import { writable } from 'svelte/store';

const searchStore = writable<{
  location: string;
  arrivalDate: string;
  departureDate: string;
  guestsNumber: number;
}>({
  location: '',
  arrivalDate: '',
  departureDate: '',
  guestsNumber: 1,
});

export default {
  subscribe: searchStore.subscribe,
  set: searchStore.set,
};
