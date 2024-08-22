import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

const authStore = writable<{
  isLoggedIn: boolean;
  user?: User | null;
}>({
  isLoggedIn: false,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};
