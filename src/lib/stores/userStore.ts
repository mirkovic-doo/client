import { writable } from 'svelte/store';

import { User } from '$lib/types/user';

const authStore = writable<{
  isLoggedIn: boolean;
  user: User | null;
}>({
  isLoggedIn: false,
  user: null,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};
